import React, { useState } from "react";
import UserList from "../component/UserList";
import UserProfileModal from "../component/UserProfileModal"; 
import SettingModal from "../component/SettingModal";
import iconUser from "../../img/icons/icon-user.png";
import iconComments from "../../img/icons/icon-comments.png";
import iconConnect from "../../img/icons/icon-connect.png";
import iconFavorites from "../../img/icons/icon-favorites.png";
import iconBriefcase from "../../img/icons/icon-briefcase.png";
import "../../styles/admindashboard.css";

const AdminDashboard = () => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [maxAppointmentsPerHour, setMaxAppointmentsPerHour] = useState(4);
  const [statusMessage, setStatusMessage] = useState("");
  const [profile, setProfile] = useState({
    name: 'Admin',
    email: 'admin@example.com',
    password: '********',
  });

  const handleSettingModalOpen = () => {
    setIsSettingModalOpen(true);
  };

  const handleSettingModalClose = (updatedValue) => {
    if (updatedValue && updatedValue > 0) {
      setMaxAppointmentsPerHour(updatedValue);
      setStatusMessage("Settings updated successfully");
    }
    setIsSettingModalOpen(false);
  };

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
      <div className="d-flex flex-column dashboard">
        <h1>Admin Dashboard</h1>
        <div className="stats row">
          <div className="stat1 col mx-2">
            <img src={iconUser} alt="Total Clients" />
            <h3>Total Clients</h3>
            <p>10</p>
          </div>
          <div className="stat2 col mx-2">
            <img src={iconComments} alt="Total Appointments" />
            <h3>Total Appointments</h3>
            <p>20</p>
          </div>
          <div className="stat3 col mx-2">
            <img src={iconBriefcase} alt="Total Services" />
            <h3>Total Services</h3>
            <p>5</p>
          </div>
          <div className="stat4 col mx-2">
            <img src={iconFavorites} alt="Total Cars" />
            <h3>Total Cars</h3>
            <p>15</p>
          </div>
          <div className="stat5 col mx-2">
            <img src={iconConnect} alt="Settings" />
            <h3>Settings</h3>
            <p>Max Appointments per Hour: {maxAppointmentsPerHour}</p>
            <button
              className="btn btn-secondary btnSetting"
              onClick={handleSettingModalOpen}
            >
              Edit
            </button>
          </div>
          <div className="stat5 col mx-2">
            <img src={iconConnect} alt="Profile" />
            <h3>Profile</h3>
            <div>
              <p>Email: {profile.email}</p>
            </div>
            <button
              className="btn btn-secondary btnSetting"
              onClick={handleProfileModalOpen}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <UserList />
      {isSettingModalOpen && (
        <SettingModal
          onClose={handleSettingModalClose}
          currentValue={maxAppointmentsPerHour}
        />
      )}
      {isProfileModalOpen && (
        <UserProfileModal
          user={profile}
          onSave={saveProfile}
          onClose={() => setIsProfileModalOpen(false)}
          error={statusMessage}
          isAdmin={true}
        />
      )}
      {statusMessage && (
        <div className="alert alert-success mt-3">{statusMessage}</div>
      )}
    </div>
  );
};

export default AdminDashboard;
