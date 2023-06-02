import React from "react";
import styles from "./subHeader.modules.css";
import Button from "../button/index.jsx";
import { useNavigate } from "react-router-dom";

const SubHeader = () => {
  const navigate = useNavigate();
  return (
    <div className={styles._subHeaderContainer}>
      <div className={styles._contentContainer}>
        <div className={styles._btnWrapper}>
          <Button title="New Booking" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
