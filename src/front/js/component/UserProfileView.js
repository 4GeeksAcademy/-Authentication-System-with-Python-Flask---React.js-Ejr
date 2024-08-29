import React, { useState } from "react";

const UserProfileView = ({ user, onClose }) => {
  if (!user) {
    return null;
  }

  const [commentsToShow, setCommentsToShow] = useState(4); 
  const latestAppointments = user.appointments ? user.appointments.slice(-2) : [];
  const comments = user.comments || [];
  const cars = user.cars || [];

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const handleLoadMoreComments = () => {
    setCommentsToShow(prevCount => prevCount + 4); 
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>ID:</strong> {user.id || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {user.name || "N/A"}
            </p>
            <p>
              <strong>Vehicles:</strong>
            </p>
            {cars.length > 0 ? (
              <ul>
                {cars.map((car, index) => (
                  <li key={car.id || index}>
                    {car.car_model || "Unknown Model"} (
                    {car.license_plate || "Unknown License Plate"})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No vehicles found.</p>
            )}
            <p>
              <strong>Latest Appointments:</strong>
            </p>
            {latestAppointments.length > 0 ? (
              <ul>
                {latestAppointments.map((appointment, index) => (
                  <li key={appointment.id || index}>
                    {new Date(appointment.date).toLocaleString(undefined, options) || "Unknown Date"} -{" "}
                    {appointment.service?.name || "Unknown Service"} (
                    {appointment.status || "Unknown Status"})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent appointments.</p>
            )}
            <p>
              <strong>Comments:</strong>
            </p>
            {comments.length > 0 ? (
              <>
                <ul>
                  {comments.slice(0, commentsToShow).map((comment, index) => (
                    <li key={comment.id || index}>
                      <strong>
                        {comment.is_mechanic === true ? "Mechanic" : "Client"}:
                      </strong>{" "}
                      {comment.content || "No content"}{" "}
                      <p>
                        <small>{comment.timestamp ? new Date(comment.timestamp).toLocaleString(undefined, options) : "Unknown time"}</small>
                      </p>
                    </li>
                  ))}
                </ul>
                {commentsToShow < comments.length && (
                  <button className="btn btn-light btn-link" onClick={handleLoadMoreComments}>
                    Load More
                  </button>
                )}
              </>
            ) : (
              <p>No comments found.</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
