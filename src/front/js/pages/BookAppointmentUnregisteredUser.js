// BookAppointmentUnregisteredUser.js
import React, { useState, useEffect } from "react";
import ReactCalendar from "../component/ReactCalendar";

const BookAppointmentUnregisteredUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
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
    getServices();
  }, [apiUrl]);

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
    if (currentStep === 1 && (!carLicensePlate || !carModel)) {
      setError("Car license plate and model are required.");
      return;
    }
    if (currentStep === 2 && !serviceChosen) {
      setError("Service required. Please select one from the list.");
      return;
    }
    setError("");
    setCurrentStep(currentStep + 1);
  };

  const displayCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Enter Car Details</h2>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="carLicensePlate">Car License Plate</label>
            <input
              type="text"
              id="carLicensePlate"
              value={carLicensePlate}
              onChange={(e) => setCarLicensePlate(e.target.value)}
              placeholder="Enter car license plate"
            />
            <label htmlFor="carModel">Car Model</label>
            <input
              type="text"
              id="carModel"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              placeholder="Enter car model"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Select Service</h2>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="service">Service</label>
            <select
              id="service"
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
          <div>
            <h2>Select Date and Add Comments</h2>
            <label htmlFor="date">Appointment Date</label>
            <ReactCalendar
              onDateChange={setAppointmentDate}
              initialDate={appointmentDate}
            />
            <label htmlFor="comment">Comments</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              cols="50"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Sign Up</h2>
            <label htmlFor="name">Full Name</label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
        );
      case 5:
        return (
          <div>
            <h2>Confirm Appointment</h2>
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
              <strong>Appointment Date:</strong> {appointmentDate.toLocaleDateString()}
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
            <div>
              <button onClick={() => setCurrentStep(1)}>
                Back to Start
              </button>
              <button onClick={submitAppointment}>Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <div onClick={() => setCurrentStep(1)}>Car Details</div>
        <div onClick={() => setCurrentStep(2)}>Service</div>
        <div onClick={() => setCurrentStep(3)}>Date & Comments</div>
        <div onClick={() => setCurrentStep(4)}>Sign Up</div>
        <div onClick={() => setCurrentStep(5)}>Summary</div>
      </div>
      {displayCurrentStep()}
      <div>
        {currentStep > 1 && (
          <button onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
          </button>
        )}
        {currentStep < 5 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default BookAppointmentUnregisteredUser;
