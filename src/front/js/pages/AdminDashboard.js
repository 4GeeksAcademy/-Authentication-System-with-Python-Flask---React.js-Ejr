import React, { useState, useContext, useEffect } from "react";
import UserList from "../component/UserList";
import UserProfileModal from "../component/UserProfileModal"; 
import SettingModal from "../component/SettingModal";
import iconUser from "../../img/icons/icon-user.png";
import iconComments from "../../img/icons/icon-comments.png";
import iconConnect from "../../img/icons/icon-connect.png";
import iconFavorites from "../../img/icons/icon-favorites.png";
import iconBriefcase from "../../img/icons/icon-briefcase.png";
import "../../styles/admindashboard.css";
import { Context } from "../store/appContext";

const AdminDashboard = () => {
  const { store, actions } = useContext(Context);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [maxAppointmentsPerHour, setMaxAppointmentsPerHour] = useState(null); // 4 a null
  const [statusMessage, setStatusMessage] = useState(""); // Nuevo
  const [hasAccess, setHasAccess] = useState(false);  // Nuevo
  const apiUrl = process.env.BACKEND_URL + "/api";
  const [profile, setProfile] = useState({
    email: '',
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

  useEffect(() => {   
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("role_id");
    const userId = localStorage.getItem("user_id");

    setHasAccess(!!token && roleId === "1");

    if (token && roleId === "1" && userId) {
      const loadProfile = async () => {
        try {
          const response = await fetch(`${apiUrl}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.error("Failed to fetch profile");
          } else {
            const data = await response.json();
            setProfile({
              name: data.result.name,
              email: data.result.email,
              password: '********',
            });
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };
      loadProfile();

      ///  Nuevo LoadSetting
      const loadSetting = async () => {
        try {
          const response = await fetch(`${apiUrl}/settings`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            console.error("Failed to get setting");
          } else {
            const data = await response.json();
            setMaxAppointmentsPerHour(data.max_appointments_per_hour);
          }
        } catch (error) {
          console.error("Error loading setting:", error);
        }
      };
      loadSetting();

    }
  }, [store.token, store.setting]);

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalClose = (updatedProfile) => {
    if (updatedProfile) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        email: updatedProfile.email,
        // name: updatedProfile.name,
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
          // name: updatedProfile.name,
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
      <div className="d-flex flex-column dashboard">
        <h1>Admin Dashboard</h1>
        {!hasAccess ? (
          <div className="card p-5">
            <div className="card-body mx-auto">
              <h2 className="card-title">You do not have access to this section</h2>
              <p className="card-text mt-3">
                You must log in as a registered Admin to view the content of this page.
              </p>
            </div>
          </div>
        ) : (
          <>
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
          <UserList />
          </>
        )}
        {isSettingModalOpen && (
          <SettingModal
          onClose={handleSettingModalClose}
          onSave={(value) => {
            setMaxAppointmentsPerHour(value);
            setStatusMessage("Settings updated successfully");
          }}
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
    </div>
  );
};

export default AdminDashboard;
