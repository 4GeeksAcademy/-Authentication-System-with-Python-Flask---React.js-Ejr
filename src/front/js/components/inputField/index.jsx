import React, { useState } from "react";
import styles from "./inputField.module.css";

const InputField = ({
  icon,
  type,
  placeholder,
  name,
  defaultValue,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${styles._inputContainer}`}>
      {icon && <i className={icon}></i>}
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {type === "password" && (
        <i
          className={`${
            showPassword ? "fas fa-eye-slash" : "fas fa-eye"
          } ${styles._passwordToggle}`}
          onClick={togglePasswordVisibility}
        ></i>
      )}
      {errors[name] && (
        <small className={styles._fail}>
          <i className="fas fa-exclamation-circle"></i> {errors[name].message}
        </small>
      )}
    </div>
  );
};

export default InputField;
