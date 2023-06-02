import React from "react";
import styles from "./successToast.module.css";
import Button from "../button/index.jsx";

const SuccessToast = ({ msg, action }) => {
  return (
    <div>
      <div className={styles._toastContainer}>
        <p>{msg}</p>
        <div className={styles._btnWrapper}>
          <Button title="Success" onClick={action} />
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;
