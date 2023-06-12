import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import styles from "./imgProfile.module.css";
import Avatar from "../avatar/index.jsx";

const ImgProfile = ({ img, handleChange }) => {
  const { store } = useContext(Context);
  const userData = store.userProfileData.userData;

  return (
<<<<<<< HEAD
    <main className="mainContainerimg">
      <div className="parent">
        <div className="child">
          <div className="profile-image-container ">
            <Avatar url={img} />
            {/* {img !== null && img !== "" ? (
              <img src={avatar} alt="User Profile" />
            ) : (
              <img src={img} alt="Default Profile" />
            )} */}
          </div>
          <h5 className="nametitle">{userData?.username}</h5>
          <p className="nametitle2">{userData?.email}</p>
          <div className="file-select" id="src-file1">
=======
    <main className={styles._mainContainerimg}>
      <div className={styles._parent}>
        <div className={styles._child}>
          <Avatar url={img} />
          <h5 className={styles._nametitle}>{userData?.username}</h5>
          <p className={styles._nametitle2}>{userData?.email}</p>
          <div className={styles._fileSelect} id="src-file1">
>>>>>>> fd04c9ca3a6f060bac21069fd9bcb8742e5cb777
            <input
              type="file"
              name="src-file1"
              aria-label="Archivo"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImgProfile;
