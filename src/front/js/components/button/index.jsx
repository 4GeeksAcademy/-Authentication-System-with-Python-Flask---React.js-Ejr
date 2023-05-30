import React from "react";
<<<<<<< HEAD
import "./styles.css";

const Button = ({ title, type, ...rest }) => {
  return (
    <button type={type} className="btn boxShadow" {...rest}>
      {title}
=======
import styles from "./button.module.css";

const Button = ({ title, type, onClick }) => {
  return (
    <button
      type={type}
      className={`${styles._btn} _boxShadow`}
      onClick={onClick}
    >
      {title ?? `Click Me!`}
>>>>>>> dev
    </button>
  );
};

export default Button;
