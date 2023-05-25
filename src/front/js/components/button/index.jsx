import React from "react";
import "./styles.css";

const Button = ({ title, type, ...rest }) => {
  return (
    <button type={type} className="btn boxShadow" {...rest}>
      {title}
    </button>
  );
};

export default Button;
