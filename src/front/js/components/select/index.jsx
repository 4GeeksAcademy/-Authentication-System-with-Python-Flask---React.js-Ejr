import React from "react";
import styles from "./select.module.css";

const Select = ({ name, onChange }) => {
  return (
    <div className={styles._selectContainer}>
      <select className="_boxShadow">
        name={name}
        onChange={onChange}
      </select>
    </div>
  );
};

export default Select;
