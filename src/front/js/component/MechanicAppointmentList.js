import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialAppointments = [
  {
    id: 1,
    date: '2024-08-01',
    time: '10:00 AM',
    service: 'Oil Change',
    vehicle: 'Toyota Camry',
    client: 'John Doe',
    status: 'Pending',
    comments: [
      { author: 'Client', content: 'Please check the tire pressure as well.', timestamp: '2024-07-31 09:00 AM' },
      { author: 'Client', content: 'The car has been making a strange noise.', timestamp: '2024-07-31 12:00 PM' }
    ]
  },
  {
    id: 2,
    date: '2024-08-05',
    time: '02:00 PM',
    service: 'Tire Rotation',
    vehicle: 'Honda Accord',
    client: 'Jane Smith',
    status: 'In Progress',
    comments: [
      { author: 'Client', content: 'Rotate all four tires, please.', timestamp: '2024-08-04 03:00 PM' },
      { author: 'Client', content: 'Check the brake pads too.', timestamp: '2024-08-05 09:00 AM' }
    ]
  },
  {
    id: 3,
    date: '2024-08-10',
    time: '01:00 PM',
    service: 'Brake Inspection',
    vehicle: 'Ford Focus',
    client: 'Alice Johnson',
    status: 'Completed',
    comments: [
      { author: 'Client', content: 'I think the brake pads need to be replaced.', timestamp: '2024-08-09 10:00 AM' }
    ]
  }
];

function MechanicAppointmentList() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const navigate = useNavigate();

  const handleStatusChange = (appointmentId, status) => {
    const updatedAppointments = appointments.map(app =>
      app.id === appointmentId ? { ...app, status } : app
    );
    setAppointments(updatedAppointments);
  };

  const handleViewDetails = appointmentId => {
    navigate(`/appointmentdetails/${appointmentId}`);
  };

  return (
    <div className="mechanic-appointments">
      <h2 className="fw-bolder text-dark py-3 text-center">My Appointments</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Vehicle</th>
              <th>Client</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id}>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>{app.service}</td>
                <td>{app.vehicle}</td>
                <td>{app.client}</td>
                <td>
                  <select 
                    value={app.status} 
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>{app.comments.length}</td>
                <td>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleViewDetails(app.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MechanicAppointmentList;
