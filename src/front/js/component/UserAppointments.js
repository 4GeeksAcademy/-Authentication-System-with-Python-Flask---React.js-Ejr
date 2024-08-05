import React, { useState } from 'react';

function UserAppointments() {
  const initialAppointments = [
    {
      id: 1,
      date: '2024-08-01',
      time: '10:00 AM',
      service: 'Oil Change',
      car: 'Toyota Camry',
      status: 'Completed',
      comments: [
        { author: 'Mechanic', content: 'All good', timestamp: '2024-08-01 10:30 AM' },
        { author: 'Client', content: 'Great service!', timestamp: '2024-08-01 11:00 AM' },
        { author: 'Client', content: 'Very satisfied', timestamp: '2024-08-01 11:30 AM' }
      ]
    },
    {
      id: 2,
      date: '2024-08-05',
      time: '02:00 PM',
      service: 'Tire Rotation',
      car: 'Honda Accord',
      status: 'Pending',
      comments: []
    }
  ];

  const [appointments, setAppointments] = useState(initialAppointments);
  const [newComments, setNewComments] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  const handleAddComment = (appointmentId) => {
    if (!newComments[appointmentId] || newComments[appointmentId].trim() === '') {
      alert('Comment cannot be blank');
      return;
    }

    const currentDateTime = new Date().toLocaleString();
    const updatedAppointments = appointments.map(app => {
      if (app.id === appointmentId) {
        return {
          ...app,
          comments: [...app.comments, { author: 'Client', content: newComments[appointmentId], timestamp: currentDateTime }]
        };
      }
      return app;
    });

    setAppointments(updatedAppointments);
    setNewComments(prevState => ({ ...prevState, [appointmentId]: '' }));
  };

  const handleCommentChange = (appointmentId, value) => {
    setNewComments(prevState => ({ ...prevState, [appointmentId]: value }));
  };

  const handleCancelClick = appointmentId => {
    setAppointmentToCancel(appointmentId);
    setShowConfirmModal(true);
  };

  const confirmCancel = () => {
    setAppointments(appointments.filter(app => app.id !== appointmentToCancel));
    setShowConfirmModal(false);
  };

  return (
    <div className="user-appointments">
      <h2>My Appointments</h2>
      <button className="btn btn-primary mb-3">Create New Appointment</button>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Car</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Add Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id}>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>{app.service}</td>
                <td>{app.car}</td>
                <td>{app.status}</td>
                <td>
                  {app.comments.map((comment, index) => (
                    <p key={index}><strong>{comment.author}:</strong> {comment.content} <br /><small>{comment.timestamp}</small></p>
                  ))}
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={newComments[app.id] || ''}
                    onChange={(e) => handleCommentChange(app.id, e.target.value)}
                  />
                  <button
                    className="btn btn-secondary mt-2"
                    onClick={() => handleAddComment(app.id)}
                  >
                    Add Comment
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger ms-2" onClick={() => handleCancelClick(app.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancellation</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this appointment?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>No</button>
                <button type="button" className="btn btn-danger" onClick={confirmCancel}>Yes, Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAppointments;
