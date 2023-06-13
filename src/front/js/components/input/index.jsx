import React, { forwardRef }from "react";
import styles from "./input.module.css";

const Input = forwardRef(function Input({
  type,
  placeholder,
  icon,
  name,
  defaultValue,
  disabled,
  value,
  date,
  required,
  register, 
  label, 
}, ref) {
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
        required={required}
        register={register}
        label={label}
        ref={ref}
      />
    </div>
  );
}); 

export default Input;
