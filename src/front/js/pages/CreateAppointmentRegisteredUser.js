import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/createappointmentregistereduser.css";

const CreateAppointmentRegisteredUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentId, setAppointmentId] = useState("");
  const [carId, setCarId] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [services, setServices] = useState([]);
  const [serviceChosen, setServiceChosen] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [userCars, setUserCars] = useState([]);
  const datePickerRef = useRef(null);
  const navigate = useNavigate();

  const apiUrl = process.env.BACKEND_URL + "/api";

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await fetch(`${apiUrl}/services`);
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error getting services:", error);
      }
    };

    const getUserCars = async () => {
      try {
        const response = await fetch(`${apiUrl}/cars/5`);
        if (!response.ok) throw new Error("Network response failed");

        const { result } = await response.json();

        if (result && result.id && result.license_plate && result.car_model) {
          setUserCars([result]);
        } else {
          console.error("Invalid car data received:", result);
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

  const submitAppointment = async (e) => {
    e.preventDefault();
    setError("");

    if (!serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }

    try {
      const commentResponse = await fetch(`${apiUrl}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          user_id: userId,
          appointment_id: appointmentId,
        }),
      });

      if (!commentResponse.ok) throw new Error("Error adding comment");

      const commentData = await commentResponse.json();
      console.log("Comment added:", commentData);

      const serviceResponse = await fetch(`${apiUrl}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: serviceChosen,
          description: "Service description",
          duration: 60,
          slots_required: 1,
          car_id: carId,
          appointment_date: appointmentDate.format("YYYY-MM-DD"),
          appointment_time: appointmentDate.format("HH:mm"),
        }),
      });

      if (!serviceResponse.ok) throw new Error("Error booking service");

      const serviceData = await serviceResponse.json();
      console.log("Service booked:", serviceData);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };
 
  const nextStep = () => {
    if (currentStep === 1 && !carId && (!carLicensePlate || !carModel)) {
      setError("Please select a car or add a new one.");
      return;
    }
    if (currentStep === 2 && !serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }
    if (currentStep === 3 && !appointmentDate) {
      setError(
        "Appointment date is required. Please select one from the calendar."
      );
      return;
    }
    setError("");
    setCurrentStep(currentStep + 1);
  };

  const confirmAppointment = () => {
    navigate("/appointmentconfirmed");
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
            <p>Or add a new car:</p>
            <label htmlFor="carLicensePlate">Car License Plate</label>
            <input
              type="text"
              id="carLicensePlate"
              className="form-control"
              value={carLicensePlate}
              onChange={(e) => setCarLicensePlate(e.target.value)}
              placeholder="Enter car license plate"
            />
            <label htmlFor="carModel">Car Model</label>
            <input
              type="text"
              id="carModel"
              className="form-control"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              placeholder="Enter car model"
            />
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
                <option key={service.id} value={service.name}>
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
              format="DD/MM/YYYY hh:mm A"
              onChange={(date) => setAppointmentDate(date)}
              showTime={{ use12Hours: true }}
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
