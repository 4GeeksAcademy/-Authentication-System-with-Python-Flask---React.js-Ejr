import React, { useState, useEffect, useRef } from "react";
import { DatePicker } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/bookappointmentunregistereduser.css";

const BookAppointmentUnregisteredUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [carId, setCarId] = useState("");
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

  const apiUrl = "https://jubilant-lamp-r47rv4r66qrw3xxxg-3001.app.github.dev";

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
    getServices();
  }, [apiUrl]);

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
    if (currentStep === 1 && (!carLicensePlate || !carModel)) {
      setError("Car license plate and model are required.");
      return;
    }
    if (currentStep === 2 && !serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }
    if (currentStep === 3) {
      if (!appointmentDate || !comment) {
        setError(
          "Both appointment date and comment are required. Please choose a date from the calendar and add a brief comment about the service you require."
        );
        return;
      }
    }
    if (currentStep === 4) {
      if (!name || !email || !password) {
        setError("Full name, email, and password are required in order to confirm your appointment.");
        return;
      }
    }
    setError("");
    setCurrentStep(currentStep + 1);
  };

  const displayCurrentStep = () => {
    return (
      <div className="card-body">
        {error && <p className="error-message">{error}</p>}
        {currentStep === 1 && (
          <div>
            <h3>Please Enter your Car Details</h3>
            <label htmlFor="carLicensePlate">Car License Plate</label>
            <input
              type="text"
              id="carLicensePlate"
              value={carLicensePlate}
              onChange={(e) => setCarLicensePlate(e.target.value)}
              placeholder="Enter car license plate"
              className="form-control"
            />
            <label htmlFor="carModel">Car Model</label>
            <input
              type="text"
              id="carModel"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              placeholder="Enter car model"
              className="form-control"
            />
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3>Please Select a Service</h3>
            <label htmlFor="service">Service</label>
            <select
              id="service"
              value={serviceChosen}
              onChange={(e) => setServiceChosen(e.target.value)}
              className="form-control"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h3>Please Select Appointment Date, Time, and Add a Comment</h3>
            <label htmlFor="date">Appointment Date</label>
            <DatePicker
              ref={datePickerRef}
              format="DD/MM/YYYY hh:mm A"
              onChange={(date) => setAppointmentDate(date)}
              showTime={{ use12Hours: true }}
              className="form-control"
            />
            <label htmlFor="comment">Comments</label>
            <textarea
              id="comment"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            />
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h3>Sign Up</h3>
            <span>
              To confirm your appointment with us, we kindly ask that you create
              an account by providing your full name, email address, and a
              password.
            </span>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="form-control"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-control"
            />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="form-control"
            />
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="form-control"
            />
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div>
            <h3>Appointment Summary</h3>
            <p>Car License Plate: {carLicensePlate}</p>
            <p>Car Model: {carModel}</p>
            <p>Service: {serviceChosen}</p>
            <p>Appointment Date: {appointmentDate && appointmentDate.format("DD/MM/YYYY hh:mm A")}</p>
            <p>Comment: {comment}</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone Number: {phoneNumber}</p>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={submitAppointment}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="content" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4">
        <h2 className="card-header text-center">Appointment Booking</h2>
        <form onSubmit={submitAppointment}>
          {displayCurrentStep()}
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentUnregisteredUser;
