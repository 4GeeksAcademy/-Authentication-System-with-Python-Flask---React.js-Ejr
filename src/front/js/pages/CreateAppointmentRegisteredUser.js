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
          },
        });
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error getting services:", error);
      }
    };

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
    const now = moment();
    const selectedDate = date.clone().startOf('day'); // Clona la fecha seleccionada y la ajusta al inicio del día

    const disabledHours = () => {
      const disabledHours = [];
      const currentHour = now.hour(); // Obtiene la hora actual

      for (let i = 0; i < 24; i++) {
        // Si es el día actual, deshabilita las horas pasadas
        if (selectedDate.isSame(now, 'day') && i < currentHour) {
          disabledHours.push(i);
        }

        // Deshabilita horas fuera del rango de 8:00 a 18:00
        if (i < 8 || i >= 18) {
          disabledHours.push(i);
        }
      }

      return disabledHours;
    };

    const disabledMinutes = (selectedHour) => {
      const currentMinutes = now.minutes();
      
      // Si es la hora actual, deshabilita los minutos pasados
      if (selectedHour === now.hour()) {
        return Array.from({ length: 60 }, (_, i) => i).filter(min => min < currentMinutes || min !== 0 && min !== 30);
      }

      // Habilitar solo los minutos 0 y 30
      return Array.from({ length: 60 }, (_, i) => i).filter(min => min !== 0 && min !== 30);
    };

    return {
      disabledHours,
      disabledMinutes,
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

    // const token = localStorage.getItem("token");
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

      console.log("Date", dateFormat);
      console.log("User id", myuserId);
      console.log("Car ID", carId);
      console.log("Serv. ID", parseInt(serviceChosen, 10));
      console.log("service being chosen", serviceChosen);
      console.log("comments", comment);

      const submitAppointment = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
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
      console.log("Appointment details:", appointmentData);

      const userInfo = await actions.GetUser();
      if (userInfo && userInfo.email && userInfo.name) {
        MailSender(userInfo);
      } else {
        console.error("User Info is missing email or name.");
      }

      navigate("/appointmentconfirmed");
    } catch (error) {
      console.error("Error while booking appointment:", error);
      console.log("Error while booking appointment:", error);
      setError(
        "An error occurred while booking the appointment. Please try again."
      );
    }
  };

  // const confirmAppointment = async () => {
  //   e.preventDefault();

  //   try {
  //     const signUpNewUser = await fetch(`${apiUrl}/signupuser`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //         phone_number: phoneNumber,
  //       }),
  //     });

  //     if (!signUpNewUser.ok) {
  //       const errorData = await signUpNewUser.json();
  //       setError(errorData.error || "Failed to create account");
  //       return;
  //     }

  //     const userData = await signUpNewUser.json();
  //     setUserId(userData.id);

  //     const loginResponse = await fetch(`${apiUrl}/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });

  //     if (!loginResponse.ok) {
  //       const errorData = await loginResponse.json();
  //       setError(errorData.error || "Failed to log in");
  //       return;
  //     }

  //     const loginData = await loginResponse.json();
  //     localStorage.setItem("token", loginData.access_token);
  //     localStorage.setItem("role_id", loginData.role_id);
  //     localStorage.setItem("user_id", loginData.user_id);

  //     const addNewCarNewUser = await fetch(`${apiUrl}/cars`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${loginData.access_token}`,
  //       },
  //       body: JSON.stringify({
  //         car_model: carModel,
  //         license_plate: carLicensePlate,
  //         user_id: userData.id,
  //       }),
  //     });

  //     if (!addNewCarNewUser.ok) {
  //       const errorData = await addNewCarNewUser.json();
  //       setError(errorData.error || "Failed to register car details");
  //       return;
  //     }
  //     const carData = await addNewCarNewUser.json();

  //     const dateFormat = appointmentDate.format("YYYY-MM-DD HH:mm:ss");

  //     const submitAppointment = await fetch(`${apiUrl}/appointments`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${loginData.access_token}`,
  //       },
  //       body: JSON.stringify({
  //         date: dateFormat,
  //         user_id: userData.id,
  //         car_id: carData.id,
  //         service_id: parseInt(serviceChosen, 10),
  //       }),
  //     });

  //     if (!submitAppointment.ok) {
  //       const errorData = await submitAppointment.json();
  //       setError(errorData.error || "Failed to book the appointment. Please try again.");
  //       return;
  //     }

  //     const appointmentData = await submitAppointment.json();
  //     console.log("Appointment details:", appointmentData);

  //     navigate("/accountandappointmentcreated");
  //   } catch (error) {
  //     setError("Failed to create account or register car details");
  //   }
  //   //------------------------------------------------------------------------------------

  //   try {
  //     const userInfo = await actions.GetUser();
  //     if (userInfo && userInfo.email && userInfo.name) {
  //       MailSender(userInfo);
  //     } else {
  //       console.error("User Info is missing email or name.");
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch user info:", error);
  //   }

  //   //------------------------------------------------------------------------------------
  //   navigate("/appointmentconfirmed");
  // };
  // //------------------------------------------------------------------------------------
  // const MailSender = (userInfo) => {
  //   const data = {
  //     sender: {
  //       name: "AutoAgenda",
  //       email: "autoagenda3@gmail.com",
  //     },
  //     to: [
  //       {
  //         email: userInfo.email,
  //         name: userInfo.name,
  //       },
  //     ],
  //     subject: "Appointment created successfully",
  //     htmlContent: `<html><head></head><body><p>Hello,${userInfo.name}</p>This is my first transactional email sent from Brevo.</p></body></html>`,
  //   };

  //   console.log("Data ready to send:", data);
  //   actions.SendMail(data);
  // };

  //------------------------------------------------------------------------------------

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
          <div className="step-content">
            <h3>Select or Add a Car</h3>
            {error && <p className="error-message text-danger">{error}</p>}
            <label htmlFor="userCars">Select a Car</label>
            <select
              id="userCars"
              className="form-select"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
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
          <div className="step-content">
            <h3>Select a Service</h3>
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
          <div className="step-content datetimepicker-component">
            <h3>Select Appointment Date, Time, and Add a Comment</h3>
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

            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
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
          <div className="step-content">
            <h3>Appointment Summary</h3>
            <p>
              <strong>Car:</strong> {displayedCarLicensePlate} -{" "}
              {displayedCarModel}
            </p>
            <p>
              <strong>Service:</strong> {serviceChosen}
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="card-content py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Appointment Booking</div>
            <div className="card-body">{displayCurrentStep()}</div>
            <div
              className={`button-container d-flex ${
                currentStep === 1
                  ? "justify-content-end"
                  : "justify-content-between"
              }`}
            >
              {currentStep > 1 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </button>
              )}
              {currentStep < 4 && (
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              )}
              {currentStep === 4 && (
                <div className="d-flex justify-content-between w-100">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back to Start
                  </button>
                  <button
                    className="btn btn-primary ml-auto"
                    onClick={confirmAppointment}
                  >
                    Confirm Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentRegisteredUser;
