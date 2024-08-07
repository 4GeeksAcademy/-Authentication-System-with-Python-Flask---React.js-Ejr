import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/createappointmentregistereduser.css";

const CreateAppointmentRegisteredUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentId, setAppointmentId] = useState("");
  const [carId, setCarId] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [services, setServices] = useState([]);
  const [serviceChosen, setServiceChosen] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [userCars, setUserCars] = useState([]);

  const apiUrl = "https://scaling-space-disco-q7v9g7944jgv29974-3001.app.github.dev";

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/services`);
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error getting services:", error);
      }
    };

    const getUserCars = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/cars/${userId}`);
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        setUserCars(data);
      } catch (error) {
        console.error("Error getting user cars:", error);
      }
    };

    getServices();
    getUserCars();
  }, [apiUrl, userId]);

  const submitAppointment = async (e) => {
    e.preventDefault();
    setError("");

    if (!serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }

    try {
      const commentResponse = await fetch(`${apiUrl}/api/comments`, {
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

      const serviceResponse = await fetch(`${apiUrl}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: serviceChosen,
          description: "Service description",
          duration: 60,
          slots_required: 1,
          car_id: carId,
          appointment_date: appointmentDate,
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
    if (currentStep === 3 && (!appointmentDate || !comment)) {
      setError("Both appointment date and comment are required.");
      return;
    }
    setError("");
    setCurrentStep(currentStep + 1);
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
                  {car.license_plate} - {car.model}
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
          <div className="step-content react-calendar-container">
            <h3>Select Appointment Date and Add a Comment</h3>
            {error && <p className="error-message text-danger">{error}</p>}
            <label htmlFor="date">Appointment Date</label>
            <Calendar
              onChange={setAppointmentDate}
              value={appointmentDate}
              className="form-control"
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
        return (
          <div className="step-content">
            <h3>Confirm Appointment</h3>
            <p>Car: {carLicensePlate} - {carModel}</p>
            <p>Service: {serviceChosen}</p>
            <p>Date: {appointmentDate.toDateString()}</p>
            <p>Comment: {comment}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Appointment Booking</div>
            <div className="card-body">{displayCurrentStep()}</div>
            <div className="button-container d-flex justify-content-between">
              {currentStep > 1 && (
                <button className="btn btn-secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                  Previous
                </button>
              )}
              {currentStep < 4 && (
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              )}
              {currentStep === 4 && (
                <button className="btn btn-success" onClick={submitAppointment}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentRegisteredUser;
