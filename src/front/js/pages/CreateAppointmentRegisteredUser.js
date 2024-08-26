import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/createappointmentregistereduser.css";

const CreateAppointmentRegisteredUser = () => {
  const { store, actions } = useContext(Context);
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [carId, setCarId] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [services, setServices] = useState([]);
  const [serviceChosen, setServiceChosen] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [userCars, setUserCars] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const [takenSlots, setTakenSlots] = useState([]);
  const [maxAppointmentsPerHour, setMaxAppointmentsPerHour] = useState(null);
  
  const apiUrl = process.env.BACKEND_URL + "/api";
  const myuserId = localStorage.getItem("user_id");
  const myToken = localStorage.getItem("token");

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
        const response = await fetch(`${apiUrl}/services`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
            ...store.corsEnabled, // Deshabilitar una vez en producción
          },
        });
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        setServices(data);
      } catch (error) {}
    };

    const selectedService = services.find(
      (service) => service.id === parseInt(serviceChosen, 10)
    );

    const serviceName = selectedService ? selectedService.name : "Not selected";

    const getUserCars = async () => {
      try {
        const response = await fetch(`${apiUrl}/cars/user/${myuserId}`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        });
        if (!response.ok) throw new Error("Network response failed");
        const { result, msg } = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          setUserCars(result); 
        } else {
          console.error("No valid car data received or user has no cars", msg, result);
        }
      } catch (error) {
        console.error("Error getting user cars:", error);
      }
    };

    getServices();
    getUserCars();
  }, [apiUrl, myuserId, myToken, store.corsEnabled]);

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
      setTakenSlots(slots);
    } catch (error) {
      console.error("Error fetching taken slots:", error);
    }
  };

  const manageDateChange = (date) => {
    setAppointmentDate(date);
    if (date) {
      fetchTakenSlots(); 
    }
  };

  const nextStep = async () => {
    if (currentStep === 1 && !carId && (!carLicensePlate || !carModel)) {
      setError("Please select a car or add a new one.");
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
          "Appointment date is required. Please select one from the calendar."
        );
        return;
      }
    }
    setError("");
    setCurrentStep(currentStep + 1);
  };

  const confirmAppointment = async (e) => {
    e.preventDefault();

    const role_id = localStorage.getItem("role_id");
    const user_id = localStorage.getItem("user_id");
    const carSelectedId = carId;

    if (!carSelectedId) {
      try {
        const addNewCarResponse = await fetch(`${apiUrl}/cars`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
          body: JSON.stringify({
            car_model: carModel,
            license_plate: carLicensePlate,
            user_id: user_id,
          }),
        });

        if (!addNewCarResponse.ok) {
          const errorData = await addNewCarResponse.json();
          setError(errorData.error || "Failed to register car details");
          return;
        }

        const carData = await addNewCarResponse.json();
        await bookAppointment(carData.id);
      } catch (error) {
        console.error("Error while registering car:", error);
        setError(
          "An error occurred while registering the car. Please try again."
        );
      }
    } else {
      await bookAppointment(carSelectedId);
    }
  };

  const bookAppointment = async (carId) => {
    try {
      const dateFormat = appointmentDate.format("YYYY-MM-DD HH:mm:ss");

      const submitAppointment = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
          ...store.corsEnabled, // Deshabilitar una vez en producción
        },
        body: JSON.stringify({
          date: dateFormat,
          user_id: myuserId,
          car_id: carId,
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

      const Sender = (userInfo) => {
        const data = {
          sender: {
            name: "AutoAgenda",
            email: "autoagenda@devstack.top",
          },
          to: [
            {
              email: userInfo.email,
              name: userInfo.name,
            },
          ],
          subject: "Appointment created successfully",
          htmlContent: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Appointment Scheduled</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #E3DDDB; margin: 0; padding: 0; text-align: center; color: #333333;">
    <div style="max-width: 600px; width: 100%; margin: 20px auto; padding: 20px; background-color: #F8F4F3;">
        <div style="text-align: center; padding: 20px 0;">
            <img src="https://img.mailinblue.com/7996011/images/content_library/original/66bcf74479b71d7506636d4a.png" alt="Logo" style="width: 120px; height: auto;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 20px 0 10px; color: #333333;">Appointment scheduled successfully</h1>
        </div>
        <div style="text-align: left; padding: 0 20px; margin-top: 20px;">
            <p style="font-size: 16px; line-height: 1.5; margin: 10px 0; color: #333333;">Dear <strong>${
              userInfo.name
            }</strong>,</p>
            <p style="font-size: 16px; line-height: 1.5; margin: 10px 0; color: #333333;">We are pleased to confirm that your appointment for <strong>${
              dateFormat.split(" ")[0]
            }</strong> at <strong>${
            dateFormat.split(" ")[1]
          }</strong> has been successfully created.</p>
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

</html>

`,
        };
        const SMSInfo = {
          type: "transactional",
          unicodeEnabled: true,
          sender: "AutoAgenda",
          recipient: `+34${userInfo.phoneNumber}`,
          content: `hello ${userInfo.name}, Your appointment on the day ${dateFormat} has been created successfully.`,
          tag: "t1",
          organisationPrefix: "AutoAgenda info:",
        };
        actions.SMSSender(SMSInfo);
        actions.SendMail(data);
      };
      const userInfo = await actions.GetUser();
      if (userInfo && userInfo.email && userInfo.name && userInfo.phoneNumber) {
        Sender(userInfo);
      } else {
        console.error("User Info is missing email or name.");
      }

      navigate("/appointmentconfirmed");
    } catch (error) {
      setError(
        "An error occurred while booking the appointment. Please try again."
      );
    }
  };
  const requireLicensePlate = (e) => {
    const value = e.target.value.toUpperCase();
    const regex = /^[0-9]{0,4}[A-Z]{0,3}$/;

    if (regex.test(value)) {
      setCarLicensePlate(value);
    }
  };

  const displayCurrentStep = () => {
    const selectedService = services.find(
      (service) => service.id === parseInt(serviceChosen, 10)
    );
    const serviceName = selectedService ? selectedService.name : "Not selected";

    switch (currentStep) {
      case 1:
        return (
          <div className="card-body">
            <h3>Please Select or Add a Car</h3>
            {error && <p className="error-message text-danger">{error}</p>}
            <label htmlFor="userCars">Select a Car</label>
            <select
              id="userCars"
              className="form-select"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  nextStep();
                }
              }}
            >
              <option value="">Select one of your cars</option>
              {userCars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.license_plate} - {car.car_model}
                </option>
              ))}
            </select>

            {!carId && (
              <>
                <p>Or add a new car:</p>
                <label htmlFor="carLicensePlate">Car License Plate</label>
                <input
                  type="text"
                  id="carLicensePlate"
                  className="form-control"
                  value={carLicensePlate}
                  onChange={requireLicensePlate}
                  placeholder="Enter car license plate"
                />
                <label htmlFor="carModel">Car Make & Model</label>
                <input
                  type="text"
                  id="carModel"
                  className="form-control"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="Enter car make & model"
                />
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="card-body">
            <h3>Please Select a Service</h3>
            {error && <p className="error-message text-danger">{error}</p>}
            <label htmlFor="service">Service</label>
            <select
              id="service"
              className="form-select"
              value={serviceChosen}
              onChange={handleServiceChange}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        );

      case 3:
        return (
          <div className="card-body datetimepicker-component">
            <h3>Please Select Appointment Date, Time, and Add a Comment</h3>
            {error && <p className="error-message text-danger">{error}</p>}
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
            />

            <label htmlFor="comment">Comments</label>
            <textarea
              id="comment"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
          </div>
        );

      case 4:
        const selectedCar = userCars.find((car) => car.id === parseInt(carId));

        const displayedCarLicensePlate = selectedCar
          ? selectedCar.license_plate
          : carLicensePlate;
        const displayedCarModel = selectedCar
          ? selectedCar.car_model
          : carModel;

        return (
          <div className="appointment-summary-container mx-3">
            <div className="card-body">
              <h3>Appointment Summary</h3>
              <p>
                <strong>Car:</strong> {displayedCarLicensePlate} -{" "}
                {displayedCarModel}
              </p>
              <p>
                <strong>Service:</strong> {serviceName}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {appointmentDate ? appointmentDate.format("DD/MM/YYYY") : ""}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {appointmentDate ? appointmentDate.format("hh:mm A") : ""}
              </p>
              <p>
                <strong>Comment:</strong> {comment}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="content" className="padding">
      <div className="card shadow-sm">
        <div className="card-header text-center">Appointment Booking</div>
        <form
          onSubmit={
            currentStep === 4 ? confirmAppointment : (e) => e.preventDefault()
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

        <div className="card-footer d-flex justify-content-between">
          {currentStep > 1 && (
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button className="btn btn-primary ms-auto" onClick={nextStep}>
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              className="btn btn-primary ml-auto"
              onClick={confirmAppointment}
            >
              Confirm Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentRegisteredUser;
