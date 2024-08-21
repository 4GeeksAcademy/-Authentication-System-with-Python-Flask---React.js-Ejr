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

  const apiUrl = process.env.BACKEND_URL + "/api";
  const myuserId = localStorage.getItem("user_id");
  const myToken = localStorage.getItem("token");

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
        // Actualiza la URL para que apunte a la ruta correcta usando owner_id
        const response = await fetch(`${apiUrl}/cars/user/${myuserId}`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        });
        if (!response.ok) throw new Error("Network response failed");

        // Desestructura el resultado de la respuesta
        const { result, msg } = await response.json();

        // Verifica si result es un array y tiene contenido
        if (Array.isArray(result) && result.length > 0) {
          setUserCars(result); // Guarda todos los coches en el estado
        } else {
          console.error(
            "No valid car data received or user has no cars",
            msg,
            result
          );
        }
      } catch (error) {
        console.error("Error getting user cars:", error);
      }
    };
    getServices();
    getUserCars();
  }, [apiUrl, userId]);

  useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current.focus();
    }
  }, [currentStep]);

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

      const isAvailable = !takenSlots.some((slot) => {
        return (
          slot.date === selectedDate &&
          selectedTime >= slot.start_time &&
          selectedTime < slot.end_time
        );
      });

      setIsAvailable(isAvailable);

      if (!isAvailable) {
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
    if (currentStep === 1 && !carId && (!carLicensePlate || !carModel)) {
      setError("Please select a car or add a new one.");
      return;
    }
    if (currentStep === 2 && !serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }
    if (currentStep === 3) {
      if (!appointmentDate) {
        setError(
          "Appointment date is required. Please select one from the calendar."
        );
        return;
      }
      await checkSlotAvailability(appointmentDate);
      if (!isAvailable) {
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

      const MailSender = (userInfo) => {
        const data = {
          sender: {
            name: "AutoAgenda",
            email: "autoagenda3@gmail.com",
          },
          to: [
            {
              email: userInfo.email,
              name: userInfo.name,
            },
          ],
          subject: "Appointment created successfully",
          htmlContent: `<html><head></head><body><p font-size: 16px;>Hello,${userInfo.name}</p>  <img src="https://img.mailinblue.com/7996011/images/content_library/original/66bcf74479b71d7506636d4a.png" width="390" border="0">
          <h1 class="default-heading1" style="margin: 0; color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word;">Appointment scheduled successfully</h1>
          Your appointment on the day ${dateFormat} has been created successfully.</p>
          <p>This email is for informational purposes only and you do not have to respond.</p></body></html>`,
        };

        actions.SendMail(data);
      };

      const userInfo = await actions.GetUser();
      if (userInfo && userInfo.email && userInfo.name) {
        MailSender(userInfo);
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
              onChange={(e) => setServiceChosen(e.target.value)}
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
