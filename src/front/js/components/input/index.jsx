import React from "react";
import styles from "./input.module.css";

const Input = ({
  type,
  placeholder,
  icon,
  name,
  defaultValue,
  disabled,
  value,
  date,
}) => {
  return (
    <div className={styles._inputContainer}>
      {icon}
      <input
        className="_boxShadow"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        date={date}
      />
    </div>
  );
};

export default Input;
