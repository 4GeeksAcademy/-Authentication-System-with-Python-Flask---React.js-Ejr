import React, { useState } from "react";
import { updateUserProfile } from "../../service/user.js";
import "./styles.css";

import ProfileForm from "../../components/profileForm/index.jsx";
import Header from "../../components/header/index.jsx";
import ImgProfile from "../../components/imgProfile/index.jsx";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
};

const Profile = () => {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [user, setUser] = useState(initialState);

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
    form.append("email", user.email);
    form.append("username", user.username);
    form.append("firstname", user.firstname);
    form.append("lastname", user.lastname);
    console.log(form);
    updateUserProfile(form);
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
      <Header />
      <ImgProfile img={fileUrl} handleChange={handleChange} />
      <main className="mainContainerProfile">
        <div className="background">
          <h2 className="title">Profile update</h2>
          <ProfileForm
            handleChange={handleChange}
            handleClick={handleClick}
            user={user}
          />
        </div>
      </main>
    </main>
  );
};
export default Profile;
