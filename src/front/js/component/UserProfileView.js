import React from 'react';

const UserProfileView = ({ user, onClose }) => {
  const latestAppointments = user.appointments.slice(-2);
  const latestComments = user.comments.slice(-4);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Profile</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Vehicles:</strong></p>
            <ul>
              {user.cars.map((car, index) => (
                <li key={index}>{car.model} ({car.licensePlate})</li>
              ))}
            </ul>
            <p><strong>Latest Appointments:</strong></p>
            <ul>
              {latestAppointments.map((appointment, index) => (
                <li key={index}>
                  {appointment.date} - {appointment.service} ({appointment.status})
                </li>
              ))}
            </ul>
            <p><strong>Latest Comments:</strong></p>
            <ul>
              {latestComments.map((comment, index) => (
                <li key={index}>{comment.content} <small>({comment.timestamp})</small></li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
