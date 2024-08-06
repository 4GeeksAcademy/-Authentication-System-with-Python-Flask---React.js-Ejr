import React, { useState } from 'react';
import UserProfileView from './UserProfileView';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const initialUsers = [
    { 
      id: 1, name: 'John', phoneNumber: '123-456-7890', email: 'john@example.com', 
      cars: [{ model: 'Toyota Camry', licensePlate: 'ABC123' }, { model: 'Honda Civic', licensePlate: 'XYZ789' }], 
      appointments: [
        { date: '2024-08-01', service: 'Oil Change', status: 'Completed' }, 
        { date: '2024-08-05', service: 'Tire Rotation', status: 'Pending' },
        { date: '2024-08-10', service: 'Brake Inspection', status: 'Completed' }
      ], 
      comments: [
        { content: 'Great service!', timestamp: '2024-08-01 10:30 AM' }, 
        { content: 'Very satisfied', timestamp: '2024-08-05 02:00 PM' },
        { content: 'Brake pads need replacement', timestamp: '2024-08-10 01:30 PM' },
        { content: 'Quick and efficient', timestamp: '2024-08-10 01:50 PM' }
      ]
    },
    { 
      id: 2, name: 'Jane', phoneNumber: '234-567-8901', email: 'jane@example.com', 
      cars: [{ model: 'Nissan Altima', licensePlate: 'LMN456' }], 
      appointments: [
        { date: '2024-08-03', service: 'Engine Check', status: 'Completed' },
        { date: '2024-08-07', service: 'Battery Replacement', status: 'Pending' }
      ], 
      comments: [
        { content: 'Excellent work!', timestamp: '2024-08-03 11:00 AM' }, 
        { content: 'Very professional', timestamp: '2024-08-07 03:00 PM' }
      ]
    },
    { 
      id: 3, name: 'Alice', phoneNumber: '345-678-9012', email: 'alice@example.com', 
      cars: [{ model: 'Ford Focus', licensePlate: 'OPQ678' }], 
      appointments: [
        { date: '2024-08-04', service: 'Tire Replacement', status: 'Completed' }
      ], 
      comments: [
        { content: 'Friendly staff', timestamp: '2024-08-04 02:00 PM' }
      ]
    },
    { 
      id: 4, name: 'Bob', phoneNumber: '456-789-0123', email: 'bob@example.com', 
      cars: [{ model: 'Chevrolet Malibu', licensePlate: 'RST901' }, { model: 'Jeep Wrangler', licensePlate: 'UVW234' }], 
      appointments: [
        { date: '2024-08-06', service: 'Oil Change', status: 'Completed' }, 
        { date: '2024-08-09', service: 'Brake Inspection', status: 'Pending' }
      ], 
      comments: [
        { content: 'Quick service', timestamp: '2024-08-06 01:00 PM' }, 
        { content: 'Brake inspection was thorough', timestamp: '2024-08-09 04:00 PM' }
      ]
    },
    { 
      id: 5, name: 'Charlie', phoneNumber: '567-890-1234', email: 'charlie@example.com', 
      cars: [{ model: 'Hyundai Sonata', licensePlate: 'XYZ678' }], 
      appointments: [
        { date: '2024-08-02', service: 'Oil Change', status: 'Completed' }, 
        { date: '2024-08-08', service: 'Tire Rotation', status: 'Pending' }
      ], 
      comments: [
        { content: 'Great experience', timestamp: '2024-08-02 10:00 AM' }, 
        { content: 'Very satisfied with the tire rotation', timestamp: '2024-08-08 02:00 PM' }
      ]
    },
    { 
      id: 6, name: 'Dave', phoneNumber: '678-901-2345', email: 'dave@example.com', 
      cars: [{ model: 'BMW X5', licensePlate: 'ABC567' }], 
      appointments: [
        { date: '2024-08-11', service: 'Engine Check', status: 'Completed' }
      ], 
      comments: [
        { content: 'Engine check was thorough', timestamp: '2024-08-11 11:00 AM' }
      ]
    },
    { 
      id: 7, name: 'Eve', phoneNumber: '789-012-3456', email: 'eve@example.com', 
      cars: [{ model: 'Mercedes Benz C300', licensePlate: 'XYZ234' }], 
      appointments: [
        { date: '2024-08-12', service: 'Oil Change', status: 'Completed' },
        { date: '2024-08-15', service: 'Battery Replacement', status: 'Pending' }
      ], 
      comments: [
        { content: 'Excellent service', timestamp: '2024-08-12 09:00 AM' }, 
        { content: 'Battery replacement was quick', timestamp: '2024-08-15 11:00 AM' }
      ]
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const sortedUsers = [...users].sort((a, b) => {
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
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setShowConfirmModal(false);
  };

  const handleViewProfile = user => {
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
                <button type="button" onClick={() => requestSort('id')} className="btn btn-link p-0">
                  ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </button>
              </th>
              <th>
                <button type="button" onClick={() => requestSort('name')} className="btn btn-link p-0">
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
            {sortedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
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
                <p>Are you sure you want to delete {userToDelete.name}?</p>
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
