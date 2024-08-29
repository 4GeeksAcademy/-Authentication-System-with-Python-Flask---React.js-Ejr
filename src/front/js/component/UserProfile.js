import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import UserProfileModal from "./UserProfileModal";



const UserProfile = () => {
  const { store, actions } = useContext(Context);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "********",
  });
  const apiUrl = process.env.BACKEND_URL + "/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("role_id");
    const userId = localStorage.getItem("user_id");

    setHasAccess(!!token && roleId === "2");

    if (token || (roleId === "3" && userId)) {
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
              phoneNumber: data.result.phone_number,
              password: "********",
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
  },  []);

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
  };


  const saveProfile = async (updatedProfile) => {
    try {
      const result = await actions.saveProfile(updatedProfile);
      if (result.success) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          email: updatedProfile.email,
          name: updatedProfile.name,
          phoneNumber: updatedProfile.phoneNumber,
        }));
        setStatusMessage("Profile updated successfully");
        setIsProfileModalOpen(false);
        return Promise.resolve();
        
      } else {
        return Promise.reject(result.error);
      }
    } catch (error) {
      console.error("An error occurred: " + error.message);
      return Promise.reject(error); 
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
