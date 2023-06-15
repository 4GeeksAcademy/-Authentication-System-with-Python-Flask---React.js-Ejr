import React from "react";
import styles from "./input.module.css";

const Input = ({
  icon,
  type,
  placeholder,
  name,
  defaultValue,
  date,
  register,
  }) => {

  return (
    <div className={styles._inputContainer}
      >
      {icon}
      <input
        className="_boxShadow"
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        date={date}
        {...register(name)}
      />
    </div>
  );
}; 

export default Input;
