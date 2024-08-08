import React, { useState } from 'react';
import MechanicAppointmentList from '../component/MechanicAppointmentList';
import UserProfileModal from '../component/UserProfileModal'; // Importa el modal de perfil
import '../../styles/mechanicdashboard.css';

const MechanicDashboard = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [profile, setProfile] = useState({
    name: 'Mechanic',
    email: 'mechanic@example.com',
    password: '********',
  });

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalClose = (updatedProfile) => {
    if (updatedProfile) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        email: updatedProfile.email
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
    <div className="container py-5">
      <h1 className="text-center">Mechanic Dashboard</h1>
      <div className="text-end">
        <button
          className="btn btn-secondary mb-3"
          onClick={handleProfileModalOpen}
        >
          Edit Profile
        </button>
      </div>
      <MechanicAppointmentList />
      {isProfileModalOpen && (
        <UserProfileModal
          user={profile}
          onSave={saveProfile}
          onClose={() => setIsProfileModalOpen(false)}
          error={statusMessage}
          isAdmin={true} // Indica que es un perfil de mecánico/administrador
        />
      )}
      {statusMessage && (
        <div className="alert alert-success mt-3">{statusMessage}</div>
      )}
    </div>
  );
};

export default MechanicDashboard;
