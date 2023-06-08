import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import styles from "./imgProfile.module.css";
import Avatar from "../avatar/index.jsx";

const ImgProfile = ({ img, handleChange }) => {
  const { store } = useContext(Context);
  const userData = store.userProfileData.userData;

  return (
    
    <main className={styles._mainContainerimg}>
      <div className={styles._parent}>
        <div className={styles._child}>
          <Avatar url={img} />

          <h5 className={styles._nametitle}>{userData?.username}</h5>
          <p className={styles._nametitle2}>{userData?.email}</p>
          <div className={styles._fileSelect} id="src-file1">

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
