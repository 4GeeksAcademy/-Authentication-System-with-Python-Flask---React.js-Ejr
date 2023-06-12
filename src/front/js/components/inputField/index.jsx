import React from "react";
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
  const hasRequiredError = errors[name] !== undefined;

  return (
    <div
      className={`${styles._inputContainer} ${
        hasRequiredError ? styles._inputContainerError : ""
      }`}
    >
      {icon && <i className={icon}></i>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {errors[name] && (
        <small className={styles._fail}>
          {" "}
          <i class="fa-solid fa-circle-exclamation"></i> {errors[name].message}
        </small>
      )}
    </div>
  );
};

export default InputField;
