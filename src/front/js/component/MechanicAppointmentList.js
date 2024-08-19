import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

function MechanicAppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const apiUrl = process.env.BACKEND_URL + "/api";

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await fetch(`${apiUrl}/appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            ...store.corsEnabled // Deshabilitar una vez en producción
          },
        });

        if (response.ok) {
          const appointmentsData = await response.json();
          const sortedAppointments = appointmentsData.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAppointments(sortedAppointments);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch appointments', errorData);
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    };

    loadAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      const response = await fetch(`${apiUrl}/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...store.corsEnabled // Deshabilitar una vez en producción
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setAppointments(prevAppointments =>
          prevAppointments.map(app =>
            app.id === appointmentId ? { ...app, status } : app
          )
        );
      } else {
        const errorData = await response.json(); 
        console.error('Failed to update appointment status', errorData);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
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
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>{new Date(app.date).toLocaleTimeString()}</td>
                <td>{app.service?.name || 'Unknown'}</td>
                <td>{app.car?.car_model || 'Unknown'}</td>
                <td>{app.user?.name || 'Unknown'}</td>
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
                <td>{app.comments?.length || 0}</td>
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
