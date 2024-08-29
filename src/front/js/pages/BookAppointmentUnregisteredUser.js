import React, { useState, useEffect, useRef, useContext } from "react";
import { DatePicker } from "antd";
import { Context } from "../store/appContext";
import moment from "moment";
import "../../styles/bookappointmentunregistereduser.css";
import { useNavigate } from "react-router-dom";

const BookAppointmentUnregisteredUser = () => {
  const { store, actions } = useContext(Context);
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
  const [takenSlots, setTakenSlots] = useState([]);
  const [maxAppointmentsPerHour, setMaxAppointmentsPerHour] = useState(null);
  const apiUrl = process.env.BACKEND_URL + "/api";
   // Obtener el valor de maxAppointmentsPerHour solo una vez al montar el componente
   useEffect(() => {
    const fetchMaxAppointmentsPerHour = async () => {
      try {
        const maxHour = await actions.getMaxAppointmentsHour();
        setMaxAppointmentsPerHour(maxHour); // Almacena el valor en el estado
      } catch (error) {
        console.error("Error fetching max appointments per hour:", error);
      }
    };
  
    fetchMaxAppointmentsPerHour();
  }, [actions]);

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
    return (
      current &&
      (current < moment().startOf("day") ||
        current.day() === 0 ||
        current.day() === 6)
    );
  };

  // Función para deshabilitar horas fuera del horario laboral y las que tienen maximo de citas
  const disabledTime = (date) => {
    const now = new Date(); // Hora actual
    const selectedDate = date.format("YYYY-MM-DD"); // Fecha seleccionada

    const hours = {
      disabledHours: () => {
        const disabledHours = [];

        // Filtrar los slots tomados por la fecha seleccionada
        const slotsForSelectedDate = takenSlots.filter(
          (slot) => slot.date === selectedDate
        );

        // Contar las citas por hora
        const hourCounts = {};
        slotsForSelectedDate.forEach((slot) => {
          const slotHour = parseInt(slot.start_time.split(":")[0], 10);
          hourCounts[slotHour] = (hourCounts[slotHour] || 0) + 1;
        });

        // Deshabilitar las horas que tienen el máximo de citas permitidas
        Object.keys(hourCounts).forEach((hour) => {
          if (hourCounts[hour] >= maxAppointmentsPerHour) {
            // maxAppointmentsPerHour es el límite máximo
            disabledHours.push(parseInt(hour, 10));
          }
        });

        // También deshabilitar las horas fuera del horario laboral
        for (let i = 0; i < 24; i++) {
          if (
            i < 9 ||
            i >= 18 ||
            (selectedDate === now.toISOString().split("T")[0] &&
              i < now.getHours())
          ) {
            disabledHours.push(i);
          }
        }

        return disabledHours;
      },
      disabledMinutes: (hour) => {
        if (
          takenSlots.find(
            (slot) =>
              parseInt(slot.start_time.split(":")[0], 10) === hour &&
              slot.date === selectedDate
          )
        ) {
          const slotsForHour = takenSlots.filter(
            (slot) =>
              parseInt(slot.start_time.split(":")[0], 10) === hour &&
              slot.date === selectedDate
          );

          // Deshabilitar todos los minutos si la hora está llena
          if (slotsForHour.length >= maxAppointmentsPerHour) {
            return Array.from({ length: 60 }, (_, i) => i);
          }
        }

        // Deshabilitar solo los minutos 0 y 30
        return Array.from({ length: 60 }, (_, i) => i).filter(
          (min) => min !== 0
        );
      },
    };

    return hours;
  };

  // Función para obtener los slots tomados desde la API
  const fetchTakenSlots = async () => {
    try {
      const response = await fetch(`${apiUrl}/slots-taken`);
      if (!response.ok) throw new Error("Failed to fetch taken slots");

      const slots = await response.json();
      setTakenSlots(slots); // Guardamos las citas tomadas en el estado
    } catch (error) {
      console.error("Error fetching taken slots:", error);
    }
  };

  // Función para manejar cambios en la fecha seleccionada
  const manageDateChange = (date) => {
    setAppointmentDate(date);
    if (date) {
      fetchTakenSlots(); // Cargar los slots tomados cada vez que se selecciona una fecha nueva
    }
  };

  // Manejo del paso siguiente en el formulario
  const nextStep = async () => {
    if (currentStep === 1 && (!carLicensePlate || !carModel)) {
      setError("Car license plate, make & model are required.");
      return;
    }
    if (currentStep === 2 && !serviceChosen) {
      setError("Service required. Please select one from the list.");

      return;
    }
    await fetchTakenSlots();
    if (currentStep === 3) {
      if (!appointmentDate) {
        setError(
          "Appointment date & time are required. Please select a date & time from the calendar."
        );
        return;
      }
      // await fetchTakenSlots(); // Asegurarse de que los slots se carguen antes de avanzar
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
          ...store.corsEnabled, // Deshabilitar una vez en producción
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
      // console.log("Appointment details:", appointmentData);

      const Sender = () => {
        const data = {
          sender: {
            name: "AutoAgenda",
            email: "autoagenda@devstack.top",
          },
          to: [
            {
              email: userData.email,
              name: userData.name,
            },
          ],
          subject: "Account and Appointment created successfully",
          htmlContent: `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <title>Account and Appointment Created</title>
            </head>
            
            <body style="font-family: Arial, sans-serif; background-color: #E3DDDB; margin: 0; padding: 0; text-align: center; color: #333333;">
                <div style="max-width: 600px; width: 100%; margin: 20px auto; padding: 20px; background-color: #F8F4F3;">
                    <div style="text-align: center; padding: 20px 0;">
                        <img src="https://img.mailinblue.com/7996011/images/content_library/original/66bcf74479b71d7506636d4a.png" alt="Logo" style="width: 120px; height: auto;">
                        <h1 style="font-size: 28px; font-weight: bold; margin: 20px 0 10px; color: #333333;">Account and Appointment created successfully</h1>
                    </div>
                    <div style="text-align: left; padding: 0 20px; margin-top: 20px;">
                        <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Dear <strong>${
                          userData.name
                        },</strong></p>
                        <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">We are pleased to inform you that your account has been successfully created, and your appointment is confirmed for <strong>${
                          dateFormat.split(" ")[0]
                        }</strong> at <strong>${
            dateFormat.split(" ")[1]
          }</strong>.</p>
                        <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Service: <strong>${serviceName}</strong></p>
                        <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Car: <strong>${carModel}</strong></p>
                        <p style="font-size: 16px; line-height: 1.5; margin: 10px 0; color: #333333;">Please note, this email is for informational purposes only, and no response is required.</p>
                    </div>
                    <div style="margin-top: 30px; padding: 20px; font-size: 14px; color: #888888; text-align: center; background-color: #E3DDDB;">
                        <p style="margin: 5px 0;"><strong>AutoAgenda | Drive Your Time</strong></p>
                        <p style="margin: 5px 0;">&copy; 2024 All rights reserved</p>
                        <div style="margin-top: 10px;">
                            <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #333333;">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #333333;">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a href="#" style="text-decoration: none; margin: 0 5px; color: #333333;">
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #333333;">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
        };
        const SMSInfo = {
          type: "transactional",
          unicodeEnabled: true,
          sender: "AutoAgenda",
          recipient: `+34${phoneNumber}`,
          content: `hello ${userData.name}, Your appointment on the day ${dateFormat} has been created successfully.`,
          tag: "t1",
          organisationPrefix: "AutoAgenda info:",
        };
        actions.SMSSender(SMSInfo);
        actions.SendMail(data);
      };

      if (userData && userData.email && userData.name && phoneNumber) {
        Sender();
      } else {
        console.error("User Info is missing email or name.");
      }
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
