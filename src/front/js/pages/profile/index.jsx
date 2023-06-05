import React, { useState, useContext } from "react";
import { updateUserProfile } from "../../service/user.js";
import "./styles.css";

import ProfileForm from "../../components/profileForm/index.jsx";
import Header from "../../components/header/index.jsx";
import ImgProfile from "../../components/imgProfile/index.jsx";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";

const Profile = () => {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [user, setUser] = useState(userStoredInContext);

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
      setUser({ ...user, [target.name]: target.value });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("avatar", file);
    form.append("email", userStoredInContext?.email);
    form.append("username", userStoredInContext?.username);
    form.append("firstname", userStoredInContext?.firstname);
    form.append("lastname", userStoredInContext?.lastname);

    updateUserProfile(form);
    actions.saveUserProfileData(user);
    navigate("/");
    // setUser({
    //   username: "",
    //   firstname: "",
    //   lastname: "",
    //   email: "",
    // });
  };
  return (
    <main className="">
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <ImgProfile
        img={fileUrl === "" ? userStoredInContext?.avatar : fileUrl}
        handleChange={handleChange}
      />
      <main className="mainContainerProfile">
        <div className="background">
          <h2 className="title">Profile update</h2>
          <ProfileForm
            handleChange={handleChange}
            handleClick={handleClick}
            user={userStoredInContext}
          />
        </div>
      </main>
    </main>
  );
};
export default Profile;
