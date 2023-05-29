import React from "react";
import styles from "./button.module.css";

const Button = ({ title, type, onClick }) => {
  return (
    <button
      type={type}
      className={`${styles._btn} _boxShadow`}
      onClick={onClick}
    >
      {title ?? `Click Me!`}
    </button>
  );
};

export default Button;
