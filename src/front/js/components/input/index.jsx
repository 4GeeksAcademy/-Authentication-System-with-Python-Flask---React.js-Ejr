import React from "react";
import "./styles.css";

const Input = ({ type, placeholder, icon, name, value }) => {
  return (
    <div className="inputContainer">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        className="boxShadow"
      />
    </div>
  );
};

export default Input;
