import React from "react";
import styles from "./input.module.css";

const Input = ({ type, placeholder, icon, name, defaultValue, disabled }) => {
  return (
    <div className={styles._inputContainer}>
      {icon}
      <input
        className="_boxShadow"
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
