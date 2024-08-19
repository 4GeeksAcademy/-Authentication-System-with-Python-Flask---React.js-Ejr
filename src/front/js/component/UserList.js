import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import UserProfileView from './UserProfileView';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const apiUrl = process.env.BACKEND_URL + "/api";
  const [usersData, setUsersData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'lastAppointmentDate', direction: 'ascending' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const { store } = useContext(Context);

  useEffect(() => {
    const loadAppointments = async () => {
      const token = localStorage.getItem('token');
      if (!token) { 
        return false;
      }

      try {
        const response = await fetch(`${apiUrl}/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          ...store.corsEnabled // Deshabilitar una vez en producción
          },
        });

        if (!response.ok) { 
          return false;
        }

        const appointmentsData = await response.json();

        const groupedUsers = appointmentsData.reduce((acc, appointment) => {
          const userId = appointment.user.id;
          if (!acc[userId]) {
            acc[userId] = {
              ...appointment.user,
              cars: [],
              appointments: [],
              comments: [],
              lastAppointmentStatus: '',
              lastAppointmentDate: null,
            };
          }
          acc[userId].cars.push({car_model: appointment.car.car_model,license_plate: appointment.car.license_plate});
          acc[userId].appointments.push(appointment);
          acc[userId].comments.push(...appointment.comments);

          acc[userId].lastAppointmentStatus = appointment.status;

          acc[userId].lastAppointmentDate = new Date(appointment.date);

          return acc;
        }, {});

        const usersArray = Object.values(groupedUsers).map(user => ({
          ...user,
          cars: Array.from(user.cars),  
        }));
        setUsersData(usersArray);
      } catch (error) {  
        return `Error loading appointments: ${error.message}`;
      }
    };
    loadAppointments();
  }, [store.token]);

  const sortedUsers = [...usersData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDeleteClick = user => {
    if (!user) {  
      console.error('User not found');
      return;
    }
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) { 
      return false;
    }
  
    try {
      const response = await fetch(`${apiUrl}/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...store.corsEnabled // Deshabilitar una vez en producción
        },
      });
  
      if (!response.ok) {  
        const errorData = await response.json();
        console.error('Failed to delete user:', errorData.error);
        return false;
      }
  
      setUsersData(usersData.filter(user => user.id !== userToDelete.id));
      setShowConfirmModal(false);
      return true;
    } catch (error) {  
      return `Error deleting user: ${error.message}`;
    }
  };

  const handleViewProfile = user => {
    if (!user) { 
      console.error('User not found');
      return;
    }
    setSelectedUser(user);
  };

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>
                <button type="button" onClick={() => requestSort('lastAppointmentDate')} className="btn-light btn-link p-0">
                  Date {sortConfig.key === 'lastAppointmentDate' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </button>
              </th>
              <th>
                <button type="button" onClick={() => requestSort('lastAppointmentStatus')} className="btn-light btn-link p-0">
                  Status {sortConfig.key === 'lastAppointmentStatus' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </button>
              </th>
              <th>
                <button type="button" onClick={() => requestSort('name')} className="btn-light btn-link p-0">
                  Client Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </button>
              </th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Number of Vehicles</th>
              <th>Number of Appointments</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{user.lastAppointmentDate ? user.lastAppointmentDate.toUTCString() : 'No Date'}</td>
                <td>{user.lastAppointmentStatus || 'No Status'}</td>
                <td>{user.name}</td>
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td>{user.cars.length}</td>
                <td>{user.appointments.length}</td>
                <td>{user.comments.length}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleViewProfile(user)}>View Profile</button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDeleteClick(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {selectedUser && <UserProfileView user={selectedUser} onClose={handleCloseProfile} />}
  
      {showConfirmModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {userToDelete?.name}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
