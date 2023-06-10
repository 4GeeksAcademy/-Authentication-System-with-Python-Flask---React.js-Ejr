import React from "react";
import styles from "./btnService.module.css";

const BtnService = ({ name, setIsOpen }) => {
  return (
    <div className={styles._serviceCardContainer}>
      <p className={`${styles._serviceName} _boxShadow`} onClick={setIsOpen}>
        {name}
      </p>
    </div>
  );
};

export default BtnService;
