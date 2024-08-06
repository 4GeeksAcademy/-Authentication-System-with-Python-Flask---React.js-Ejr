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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <button className="btn btn-primary mb-3" onClick={handleModalOpen}>Edit Profile</button>
      <div>
        <p>Name: {user.name}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <p>Email: {user.email}</p>
      </div>
      {isModalOpen && <UserProfileModal user={user} onSave={handleSave} onClose={handleModalClose} />}
    </div>
  );
}

export default UserProfile;
