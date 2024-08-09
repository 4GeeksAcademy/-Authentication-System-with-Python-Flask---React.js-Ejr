import React, { useState } from 'react';
import UserProfileModal from './UserProfileModal';

const UserProfile = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [profile, setProfile] = useState({
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com',
    password: '********'
  });

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalClose = (updatedProfile) => {
    if (updatedProfile) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: updatedProfile.name,
        phoneNumber: updatedProfile.phoneNumber,
        email: updatedProfile.email,
      }));
      setStatusMessage("Profile updated successfully");
    }
    setIsProfileModalOpen(false);
  };

  const saveProfile = async (updatedProfile) => {
    const response = await fetch('/api/update_profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedProfile)
    });

    if (response.ok) {
      handleProfileModalClose(updatedProfile);
    } else {
      alert('Error updating profile');
    }
  };

  return (
    <div className="user-profile">
      <h2>Profile</h2>
      <div>
        <p>Name: {profile.name}</p>
        <p>Phone Number: {profile.phoneNumber}</p>
        <p>Email: {profile.email}</p>
        <p>Password: {profile.password}</p>
      </div>
      <button
        className="btn btn-secondary btnSetting"
        onClick={handleProfileModalOpen}
      >
        Edit
      </button>
      {isProfileModalOpen && (
        <UserProfileModal
          user={profile}
          onSave={saveProfile}
          onClose={() => setIsProfileModalOpen(false)}
          error={statusMessage}
          isAdmin={false}
        />
      )}
      {statusMessage && (
        <div className="alert alert-success mt-3">{statusMessage}</div>
      )}
    </div>
  );
};

export default UserProfile;
