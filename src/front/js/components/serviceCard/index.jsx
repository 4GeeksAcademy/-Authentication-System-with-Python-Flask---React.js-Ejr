import React from "react";
import styles from "./serviceCard.module.css";
import Button from "../button/index.jsx";

const ServiceCard = ({ name, navigate, setIsOpen, handleDelete }) => {
  return (
    <div className={styles._serviceCardContainer}>
      <p className={`${styles._serviceName} _boxShadow`} onClick={setIsOpen}>
        {name}
      </p>
      <div className={styles._btnWrapper}>
        <Button title="Edit" onClick={navigate} />
        <Button title="Delete" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default ServiceCard;
