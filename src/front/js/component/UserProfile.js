import React, { useState } from 'react';
import UserProfileModal from './UserProfileModal';

function UserProfile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com',
    password: '********'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSave = (updatedUser) => {
    if (!updatedUser.name.trim() || !updatedUser.phoneNumber.trim() || !updatedUser.email.trim() || !updatedUser.password.trim()) {
      setError('All fields are required');
      return;
    }

    setUser(updatedUser);
    setIsModalOpen(false);
    setError('');
  };

  return (
    <div className="user-profile bg-secondary rounded p-1">
    <div className="col bg-secondary-subtle rounded py-4">
    <h2 className="fw-bolder text-dark"> Welcome back! {user.name}</h2>
    <div>
      <p>Name: {user.name}</p>
      <p>Phone Number: {user.phoneNumber}</p>
      <p>Email: {user.email}</p>
    </div>
    {isModalOpen && <UserProfileModal user={user} onSave={handleSave} onClose={handleModalClose} error={error} />}
    <button className="btn btn-primary mb-3" onClick={handleModalOpen}>Edit Profile</button>
    </div>
  </div>
  );
}

export default UserProfile;


