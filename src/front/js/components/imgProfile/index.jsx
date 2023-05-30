import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import "./styles.css";
import imgDefaul from "../../../../assets/imgDefault.png";

const ImgProfile = ({ img, handleChange }) => {
  const { store } = useContext(Context);
  const userData = store.userProfileData.userData;

  return (
    <main className="mainContainerimg">
      <div className="parent">
        <div className="child">
          <div className="profile-image-container ">
            {img !== null && img !== "" ? (
              <img src={img} alt="User Profile" />
            ) : (
              <img src={userData.avatar || imgDefaul} alt="Default Profile" />
            )}
          </div>
          <h5 className="nametitle">{userData.username}</h5>
          <p className="nametitle2">{userData.email}</p>
          <div className="file-select" id="src-file1">
            <input
              type="file"
              name="src-file1"
              aria-label="Archivo"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImgProfile;
