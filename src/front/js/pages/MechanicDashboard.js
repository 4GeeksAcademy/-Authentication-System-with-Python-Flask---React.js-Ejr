import React, { useState, useContext, useEffect } from 'react';
import MechanicAppointmentList from '../component/MechanicAppointmentList';
import UserProfileModal from '../component/UserProfileModal';
import '../../styles/mechanicdashboard.css';
import { Context } from '../store/appContext';

const MechanicDashboard = () => {
  const { store, actions } = useContext(Context);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '********',
  });

  const apiUrl = process.env.BACKEND_URL + "/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("role_id");
    const userId = localStorage.getItem("user_id");

    setHasAccess(!!token && roleId === "2");

    if (token && roleId === "2" && userId) {

      const loadProfile = async () => {
        try {
          const response = await fetch(`${apiUrl}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              ...store.corsEnabled // Deshabilitar una vez en producción
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfile({
              name: data.result.name,
              email: data.result.email,
              password: '********', 
            });
          } else {
            console.error("Failed to fetch profile");
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };

      loadProfile();
    }
  }, [store.token]);

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalClose = (updatedProfile) => {
    if (updatedProfile) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        email: updatedProfile.email,
        name: updatedProfile.name,
      }));
      setStatusMessage("Profile updated successfully");
    }
    setIsProfileModalOpen(false);
  };

  const saveProfile = async (updatedProfile) => {
    try {
      const result = await actions.saveProfile(updatedProfile);
      if (result.success) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          email: updatedProfile.email,
          name: updatedProfile.name,
        }));
        setStatusMessage("Profile updated successfully");
        setIsProfileModalOpen(false);
      } else {
        alert('Error updating profile: ' + result.error.message);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center">Mechanic Dashboard</h1>
      {!hasAccess ? (
        <div className="card p-5">
          <div className="card-body mx-auto">
            <h2 className="card-title">You do not have access to this section</h2>
            <p className="card-text mt-3">
              You must log in as a registered mechanic to view the content of this page.
            </p>
          </div>
        </div>
      ) : (
        <>
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
              isAdmin={true}
            />
          )}
          {statusMessage && (
            <div className="alert alert-success mt-3">{statusMessage}</div>
          )}
        </>
      )}
    </div>
  );
};

export default MechanicDashboard;
