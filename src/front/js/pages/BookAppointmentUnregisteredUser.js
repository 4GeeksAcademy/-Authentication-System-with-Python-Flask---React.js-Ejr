import React, { useState, useEffect, useRef } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "../../styles/bookappointmentunregistereduser.css";
import { useNavigate } from "react-router-dom";

const BookAppointmentUnregisteredUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [services, setServices] = useState([]);
  const [serviceChosen, setServiceChosen] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);

  const apiUrl = process.env.BACKEND_URL + "/api";

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await fetch(`${apiUrl}/services`);
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        setServices(data);
      } catch (error) {}
    };
    getServices();
  }, [apiUrl]);

  useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current.focus();
    }
  }, [currentStep]);

  const handleServiceChange = (e) => {
    const selectServiceId = e.target.value;
    setServiceChosen(selectServiceId);
  };

  useEffect(() => {
    if (serviceChosen) {
      const selectedServiceId = parseInt(serviceChosen, 10);
      const selectedService = services.find(
        (service) => service.id === selectedServiceId
      );
      if (selectedService) {
      }
    }
  }, [serviceChosen, services]);

  const selectedService = services.find(
    (service) => service.id === parseInt(serviceChosen, 10)
  );
  
  const serviceName = selectedService ? selectedService.name : "Not selected";

  //------------------------------------------------------------------------------------ manejo horario laboral
  const disabledDate = (current) => {
    // Deshabilitar todos los días que no sean de lunes a viernes
    return (
      current &&
      (current < moment().startOf("day") ||
        current.day() === 0 ||
        current.day() === 6)
    );
  };

  // Función para deshabilitar horas fuera del horario laboral
  const disabledTime = (date) => {
    const now = new Date(); // Hora actual

    const hours = {
      disabledHours: () => {
        const disabledHours = [];
        const selectedDate = new Date(date); // Fecha seleccionada

        // Si la fecha seleccionada es hoy, deshabilitar horas pasadas
        if (
          selectedDate.getFullYear() === now.getFullYear() &&
          selectedDate.getMonth() === now.getMonth() &&
          selectedDate.getDate() === now.getDate()
        ) {
          for (let i = 0; i < 24; i++) {
            if (i < now.getHours() || i < 9 || i >= 18) {
              disabledHours.push(i);
            }
          }
        } else {
          // Si no es hoy, deshabilitar fuera del rango de 9:00 a 17:00
          for (let i = 0; i < 24; i++) {
            if (i < 8 || i >= 18) {
              disabledHours.push(i);
            }
          }
        }
        return disabledHours;
      },
      disabledMinutes: () => {
        // Habilitar solo los minutos 0 y 30
        return Array.from({ length: 60 }, (_, i) => i).filter(
          (min) => min !== 0 && min !== 30
        );
      },
    };

    return hours;
  };
  //------------------------------------------------------------------------------------
  const checkSlotAvailability = async (dateTime) => {
    try {
      const response = await fetch(`${apiUrl}/slots-taken`);
      if (!response.ok) throw new Error("Failed to fetch taken slots");

      const takenSlots = await response.json();

      const selectedDate = dateTime.format("YYYY-MM-DD");
      const selectedTime = dateTime.format("HH:mm:ss");

      const slotIsAvailable = !takenSlots.some((slot) => {
        return (
          slot.date === selectedDate &&
          selectedTime >= slot.start_time &&
          selectedTime < slot.end_time
        );
      });

      setIsAvailable(slotIsAvailable);

      if (!slotIsAvailable) {
        setError(
          "Appointment unavailable for the selected date & time, please choose a different one."
        );
      } else {
        setError("");
      }
    } catch (error) {
      setError("Failed to check slot availability.");
    }
  };

  const manageDateChange = (date) => {
    setAppointmentDate(date);
    if (date) {
      checkSlotAvailability(date);
    }
  };

  const nextStep = async () => {
    if (currentStep === 1 && (!carLicensePlate || !carModel)) {
      setError("Car license plate, make & model are required.");
      return;
    }
    if (currentStep === 2 && !serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }
    if (currentStep === 3) {
      if (!appointmentDate) {
        setError(
          "Appointment date & time are required. Please select a date & time from the calendar."
        );
        return;
      }
      await checkSlotAvailability(appointmentDate);
      const dateFormat = appointmentDate.format("YYYY-MM-DD HH:mm:ss");
      if (!isAvailable) {
        return;
      }
    }
    if (currentStep === 4) {
      if (!name || !email || !password) {
        setError("All fields are required to confirm your appointment.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError(
          "Please enter a valid email address that includes the '@' sign."
        );
        return;
      }
    }

    setError("");
    setCurrentStep(currentStep + 1);
  };

  const requireLicensePlate = (e) => {
    const value = e.target.value.toUpperCase();
    const regex = /^[0-9]{0,4}[A-Z]{0,3}$/;

    if (regex.test(value)) {
      setCarLicensePlate(value);
    }
  };

  const requirePhoneNumber = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");

    if (numericInput.length <= 9) {
      setPhoneNumber(numericInput);
    }
  };

  const confirmAccountAndAppointment = async (e) => {
    e.preventDefault();

    try {
      const signUpNewUser = await fetch(`${apiUrl}/signupuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ...store.corsEnabled // Deshabilitar una vez en producción
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number: phoneNumber,
        }),
      });

      if (!signUpNewUser.ok) {
        const errorData = await signUpNewUser.json();
        setError(errorData.error || "Failed to create account");
        return;
      }

      const userData = await signUpNewUser.json();
      setUserId(userData.id);

      const loginResponse = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ...store.corsEnabled // Deshabilitar una vez en producción
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        setError(errorData.error || "Failed to log in");
        return;
      }

      const loginData = await loginResponse.json();
      localStorage.setItem("token", loginData.access_token);
      localStorage.setItem("role_id", loginData.role_id);
      localStorage.setItem("user_id", loginData.user_id);

      const addNewCarNewUser = await fetch(`${apiUrl}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData.access_token}`,
          // ...store.corsEnabled // Deshabilitar una vez en producción
        },
        body: JSON.stringify({
          car_model: carModel,
          license_plate: carLicensePlate,
          user_id: userData.id,
        }),
      });

      if (!addNewCarNewUser.ok) {
        const errorData = await addNewCarNewUser.json();
        setError(errorData.error || "Failed to register car details");
        return;
      }
      const carData = await addNewCarNewUser.json();

      const dateFormat = appointmentDate.format("YYYY-MM-DD HH:mm:ss");

      const submitAppointment = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData.access_token}`,
          // ...store.corsEnabled // Deshabilitar una vez en producción
        },
        body: JSON.stringify({
          date: dateFormat,
          user_id: userData.id,
          car_id: carData.id,
          service_id: parseInt(serviceChosen, 10),
          comment: comment,
        }),
      });

      if (!submitAppointment.ok) {
        const errorData = await submitAppointment.json();
        setError(
          errorData.error || "Failed to book the appointment. Please try again."
        );
        return;
      }

      const appointmentData = await submitAppointment.json();

      navigate("/accountandappointmentcreated");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const displayCurrentStep = () => {
    return (
      <div className="card-body container-fluid px-1">
        {error && <p className="error-message">{error}</p>}
        {currentStep === 1 && (
          <div>
            <h3>Please Enter your Car Details</h3>
            <div>
              <label htmlFor="carLicensePlate">Car License Plate</label>
              <input
                type="text"
                id="carLicensePlate"
                value={carLicensePlate}
                onChange={requireLicensePlate}
                placeholder="Enter car license plate"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="carModel">Car Make & Model</label>
              <input
                type="text"
                id="carModel"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="Enter car make & model"
                className="form-control"
              />
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3>Please Select a Service</h3>
            <div>
              <label htmlFor="service">Service</label>
              <select
                id="service"
                value={serviceChosen}
                onChange={handleServiceChange}
                className="form-control"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    nextStep();
                  }
                }}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h3>Please Select Appointment Date, Time, and Add a Comment</h3>
            <div>
              <label htmlFor="date">Appointment Date</label>
              <DatePicker
                ref={datePickerRef}
                format="DD/MM/YYYY HH:mm"
                onChange={manageDateChange}
                showTime={{
                  use12Hours: false,
                  format: "HH:mm",
                  hideDisabledOptions: true,
                }}
                className="form-control"
                disabledDate={disabledDate}
                disabledTime={disabledTime}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    nextStep();
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder="Add a comment"
                className="form-control"
              />
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h3>Sign Up</h3>
            <div className="appointment-description">
              To confirm your appointment with us, we kindly ask that you create
              an account by providing your full name, email address, phone
              number and a password.
            </div>
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={requirePhoneNumber}
                placeholder="Enter your phone number"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="form-control"
              />
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div className="appointment-summary-container">
            <div>
              <h3>Appointment Summary</h3>
              <p>
                <strong>Car License Plate:</strong> {carLicensePlate}
              </p>
              <p>
                <strong>Car Make & Model:</strong> {carModel}
              </p>
              <p>
                <strong>Service:</strong> {serviceName}
              </p>
              <p>
                <strong>Appointment Date:</strong>{" "}
                {appointmentDate ? appointmentDate.format("DD/MM/YYYY") : ""}
              </p>
              <p>
                <strong>Appointment Time:</strong>{" "}
                {appointmentDate ? appointmentDate.format("HH:mm") : ""}
              </p>
              <p>
                <strong>Comments:</strong> {comment}
              </p>
              <p>
                <strong>Email Address:</strong> {email}
              </p>
              <p>
                <strong>Phone Number:</strong> {phoneNumber}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="content" className="padding-nonuser">
      <div className="card shadow-sm nonuser">
        <div className="card-header text-center nonuser">
          Appointment Booking
        </div>
        <form
          onSubmit={
            currentStep === 5
              ? confirmAccountAndAppointment
              : (e) => e.preventDefault()
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              nextStep();
            }
          }}
        >
          {displayCurrentStep()}
        </form>

        {currentStep < 5 && (
          <div className="card-footer d-flex justify-content-between">
            {currentStep > 1 && (
              <button
                className="btn btn-secondary previous-button"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </button>
            )}
            {currentStep < 5 && (
              <button
                className="btn btn-primary next-button"
                onClick={nextStep}
              >
                Next
              </button>
            )}
          </div>
        )}

        {currentStep === 5 && (
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary previous-button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-primary nonuser"
              type="submit"
              onClick={confirmAccountAndAppointment}
            >
              Create Account and Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentUnregisteredUser;
