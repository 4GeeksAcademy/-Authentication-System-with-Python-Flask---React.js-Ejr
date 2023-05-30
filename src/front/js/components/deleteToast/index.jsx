import React from "react";
import styles from "./deleteToast.module.css";
import Button from "../button/index.jsx";

const DeleteToast = ({ msg, action }) => {
  return (
    <div className={styles._toastContainer}>
      <p>{msg}</p>
      <div className={styles._btnWrapper}>
        <Button title="Delete" onClick={action} />
      </div>
    </div>
  );
};

export default DeleteToast;
