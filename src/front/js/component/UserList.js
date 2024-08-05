import React, { useState } from 'react';

function UserList() {
  const initialUsers = [
    { id: 1, name: 'John', cars: 2, appointments: 3, comments: 5 },
    { id: 2, name: 'Jane', cars: 1, appointments: 2, comments: 3 },
    { id: 3, name: 'Alice', cars: 3, appointments: 1, comments: 2 },
    { id: 4, name: 'Bob', cars: 2, appointments: 4, comments: 1 },
    { id: 5, name: 'Charlie', cars: 1, appointments: 5, comments: 3 },
    { id: 6, name: 'Dave', cars: 2, appointments: 3, comments: 4 },
    { id: 7, name: 'Eve', cars: 1, appointments: 2, comments: 2 },
    { id: 8, name: 'Frank', cars: 3, appointments: 3, comments: 5 },
    { id: 9, name: 'Grace', cars: 2, appointments: 1, comments: 1 },
    { id: 10, name: 'Heidi', cars: 1, appointments: 4, comments: 2 },
    { id: 11, name: 'Ivan', cars: 2, appointments: 2, comments: 3 },
    { id: 12, name: 'Judy', cars: 3, appointments: 3, comments: 4 },
    { id: 13, name: 'Mallory', cars: 1, appointments: 1, comments: 1 },
    { id: 14, name: 'Niaj', cars: 2, appointments: 2, comments: 2 },
    { id: 15, name: 'Olivia', cars: 1, appointments: 5, comments: 5 },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
                <td>{user.cars}</td>
                <td>{user.appointments}</td>
                <td>{user.comments}</td>
                <td>
                  <button className="btn btn-primary">View Profile</button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDeleteClick(user)}>Delete</button>
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
