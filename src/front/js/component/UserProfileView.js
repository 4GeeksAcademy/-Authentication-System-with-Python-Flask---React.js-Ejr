import React from "react";

const UserProfileView = ({ user, onClose }) => {
  if (!user) {
    return null;
  }

  const latestAppointments = user.appointments
    ? user.appointments.slice(-2)
    : [];
  const latestComments = user.comments ? user.comments.slice(-4) : [];
  const cars = user.cars ? user.cars : [];

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
                  <li key={index}>
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
                  <li key={index}>
                    {appointment.date || "Unknown Date"} -{" "}
                    {appointment.service?.name || "Unknown Service"} (
                    {appointment.status || "Unknown Status"})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent appointments.</p>
            )}
            <p>
              <strong>Latest Comments:</strong>
            </p>
            {latestComments.length > 0 ? (
              <ul>
                {latestComments.map((comment, index) => (
                  <li key={index}>
                    <strong>
                      {comment.is_mechanic === true ? "Mechanic" : "Client"}:
                    </strong>{" "}
                    {comment.content || "No content"}{" "}
                    <p>
                      <small>({comment.timestamp || "Unknown time"})</small>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent comments.</p>
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
