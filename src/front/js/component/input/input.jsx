import React from "react";
import "./styles.css";

const Input = ({ type, placeholder, icon, name }) => {
  return (
    <div className="inputContainer">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="boxShadow"
      />
    </div>
  );
};

export default Input;
