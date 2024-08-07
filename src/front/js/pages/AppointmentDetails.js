import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/appointmentdetails.css";

const initialAppointments = [
  {
    id: 1,
    date: "2024-08-01",
    time: "10:00 AM",
    service: "Oil Change",
    vehicle: "Toyota Camry",
    client: "John Doe",
    status: "Pending",
    comments: [
      {
        author: "Client",
        content: "Please check the tire pressure as well.",
        timestamp: "2024-07-31 09:00 AM",
      },
      {
        author: "Client",
        content: "The car has been making a strange noise.",
        timestamp: "2024-07-31 12:00 PM",
      },
    ],
  },
  {
    id: 2,
    date: "2024-08-05",
    time: "02:00 PM",
    service: "Tire Rotation",
    vehicle: "Honda Accord",
    client: "Jane Smith",
    status: "In Progress",
    comments: [
      {
        author: "Client",
        content: "Rotate all four tires, please.",
        timestamp: "2024-08-04 03:00 PM",
      },
      {
        author: "Client",
        content: "Check the brake pads too.",
        timestamp: "2024-08-05 09:00 AM",
      },
    ],
  },
  {
    id: 3,
    date: "2024-08-10",
    time: "01:00 PM",
    service: "Brake Inspection",
    vehicle: "Ford Focus",
    client: "Alice Johnson",
    status: "Completed",
    comments: [
      {
        author: "Client",
        content: "I think the brake pads need to be replaced.",
        timestamp: "2024-08-09 10:00 AM",
      },
    ],
  },
];

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const appointment = initialAppointments.find(
    (app) => app.id === parseInt(appointmentId)
  );
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(appointment.comments);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [
        ...comments,
        {
          author: "Mechanic",
          content: newComment,
          timestamp: new Date().toLocaleString(),
        },
      ];
      setComments(updatedComments);
      setNewComment("");
      setError("");
    } else {
      setError("Comment cannot be blank");
    }
  };

  const handleBackClick = () => {
    navigate("/mechanicdashboard");
  };

  return (
    <>
      <div className="container pt-5">
        <h1 className="text-center">Appointment Details</h1>
        <div className="text-end">
          <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
            Back to Dashboard
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-5">
            <div className="appointment-details">
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Service:</strong> {appointment.service}
              </p>
              <p>
                <strong>Vehicle:</strong> {appointment.vehicle}
              </p>
              <p>
                <strong>Client:</strong> {appointment.client}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
            </div>
          </div>
          <div className="col-12">
            <p>
              <strong>Comments:</strong>
            </p>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="m-3">
                  <strong>{comment.author}:</strong> {comment.content}{" "}
                  <small>({comment.timestamp})</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="appoinmentAddComments">
          <div className="mb-3">
            <label className="form-label">Add Comment</label>
            <input
              type="text"
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button className="btn btn-primary mt-2" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails;
