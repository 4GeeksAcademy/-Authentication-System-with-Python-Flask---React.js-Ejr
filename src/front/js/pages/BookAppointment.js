import React, { useState, useEffect } from "react";

const AppointmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [carId, setCarId] = useState("");
  const [services, setServices] = useState([]);
  const [serviceChosen, setServiceChosen] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const apiUrl =
    "https://scaling-space-disco-q7v9g7944jgv29974-3001.app.github.dev";

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
    if (currentStep === 1 && !serviceChosen) {
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
            <h2>Select Service</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
      case 2:
        return (
          <div>
            <h2>Select Car and Date</h2>
            <label htmlFor="car">Car ID</label>
            <input
              type="text"
              id="car"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              placeholder="Enter car ID"
            />
            <label htmlFor="date">Appointment Date</label>
            <input
              type="date"
              id="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Add Comments</h2>
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
            <h2>Confirm Appointment</h2>
            <p>
              <strong>Service:</strong> {serviceChosen}
            </p>
            <p>
              <strong>Car ID:</strong> {carId}
            </p>
            <p>
              <strong>Appointment Date:</strong> {appointmentDate}
            </p>
            <p>
              <strong>Comments:</strong> {comment}
            </p>
            <div>
              <button onClick={() => setCurrentStep(currentStep - 1)}>
                Previous
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
        <div onClick={() => setCurrentStep(1)}>Service</div>
        <div onClick={() => setCurrentStep(2)}>Car & Date</div>
        <div onClick={() => setCurrentStep(3)}>Comments</div>
        <div onClick={() => setCurrentStep(4)}>Confirm</div>
      </div>
      {displayCurrentStep()}
      <div>
        {currentStep > 1 && (
          <button onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
          </button>
        )}
        {currentStep < 4 && (
          <button onClick={nextStep}>Next</button>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
