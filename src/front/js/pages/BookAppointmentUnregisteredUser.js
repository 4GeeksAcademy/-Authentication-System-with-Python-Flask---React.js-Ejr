import React, { useState, useEffect, useRef } from "react";
import { DatePicker } from "antd";
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
    if (currentStep === 1 && (!carLicensePlate || !carModel)) {
      setError("Car license plate and model are required.");
      return;
    }
    if (currentStep === 2 && !serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }
    if (currentStep === 3) {
      if (!appointmentDate) {
        setError(
          "Appointment date is required. Please select a date from the calendar."
        );
        return;
      }
    }
    if (currentStep === 4) {
      if (!name || !email || !password) {
        setError("All fields are required to confirm your appointment.");
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
            <div>
              <label htmlFor="carLicensePlate">Car License Plate</label>
              <input
                type="text"
                id="carLicensePlate"
                value={carLicensePlate}
                onChange={(e) => setCarLicensePlate(e.target.value)}
                placeholder="Enter car license plate"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="carModel">Car Model</label>
              <input
                type="text"
                id="carModel"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="Enter car model"
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
                format="DD/MM/YYYY hh:mm A"
                onChange={(date) => setAppointmentDate(date)}
                showTime={{ use12Hours: true }}
                className="form-control"
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
              an account by providing your full name, email address, and a
              password.
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
              <label htmlFor="email">Email</label>
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
                onChange={(e) => setPhoneNumber(e.target.value)}
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
          <div>
            <h3>Appointment Summary</h3>
            <p>
              <strong>Car License Plate:</strong> {carLicensePlate}
            </p>
            <p>
              <strong>Car Model:</strong> {carModel}
            </p>
            <p>
              <strong>Service:</strong> {serviceChosen}
            </p>
            <p>
              <strong>Appointment Date:</strong>{" "}
              {appointmentDate ? appointmentDate.format("DD/MM/YYYY") : ""}
            </p>
            <p>
              <strong>Appointment Time:</strong>{" "}
              {appointmentDate ? appointmentDate.format("hh:mm A") : ""}
            </p>
            <p>
              <strong>Comments:</strong> {comment}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Phone Number:</strong> {phoneNumber}
            </p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentStep(1)}
              >
                Back to Start
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={submitAppointment}
              >
                Create Account and Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="content" className="padding">
      <div className="card shadow-sm">
        <div className="card-header text-center">Appointment Booking</div>
        <form onSubmit={submitAppointment}>
          {displayCurrentStep()}
        </form>
        <div className="card-footer d-flex justify-content-between"> 
  {currentStep > 1 && (
    <button className="btn btn-secondary previous-button" onClick={() => setCurrentStep(currentStep - 1)}>Previous</button>
  )}
  {currentStep < 5 && <button className="btn btn-primary next-button" onClick={nextStep}>Next</button>}
</div>

      </div>
    </div>
  );
};

export default BookAppointmentUnregisteredUser;
