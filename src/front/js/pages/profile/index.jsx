import React, { useState, useContext } from "react";
import { updateUserProfile } from "../../service/user.js";
import styles from "./profile.module.css";

import ProfileForm from "../../components/profileForm/index.jsx";
import Header from "../../components/header/index.jsx";
import ImgProfile from "../../components/imgProfile/index.jsx";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";

const Profile = () => {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false)

  const { store, actions } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    if (target.files) {
      setFile(target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(target.files[0]);
    } else {
      actions.saveUserProfileData({
        ...userStoredInContext,
        [target.name]: target.value,
      });
    }
  };

  const handleDashboard = () =>{
    const localStorageData = JSON.parse(
      localStorage.getItem("token/role/company_id"));

    if (localStorageData.role === "admin") navigate(`/admin-dashboard/${localStorageData.company_id}`);
    if (localStorageData.role === "client") navigate("/user-dashboard");
    if (localStorageData.role === "worker") navigate(`/worker-dashboard/${localStorageData.company_id}`);

  }

  const handleClick = async () => {
    setLoading(true);
    const form = new FormData();

    form.append("avatar", file);
    form.append("email", userStoredInContext?.email);
    form.append("username", userStoredInContext?.username);
    form.append("firstname", userStoredInContext?.firstname);
    form.append("lastname", userStoredInContext?.lastname);

    await updateUserProfile(form);
    
    handleDashboard()
    setLoading(false);

  };

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      
      <ImgProfile
        img={fileUrl === "" ? userStoredInContext?.avatar : fileUrl}
        handleChange={handleChange}
      />
      
      <main className={styles._mainContainerProfile}>
        <div className={styles._subContainer}>
          <h2 className={styles._title}>Profile update</h2>
          <ProfileForm
            handleChange={handleChange}
            handleClick={handleClick}
            user={userStoredInContext}
            loading={loading}
          />
        </div>
      </main>
    </>
  );
};
export default Profile;
