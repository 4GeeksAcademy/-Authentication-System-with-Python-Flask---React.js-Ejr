import React from "react";
import "./styles.css";

const Dropdown = ({ icon, optionsList }) => {
  return (
    <div className="dropdownContainer">
      {icon}
      <select className="select boxShadow">
        {optionsList.map((op) => (
          <option key={op.id}>{op.user.username}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
