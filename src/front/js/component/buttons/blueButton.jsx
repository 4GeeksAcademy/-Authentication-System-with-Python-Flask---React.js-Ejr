import React from "react";
import "../../../styles/blueButton.css"

const BlueButton = ({ buttonName, toggle, target, icon, onclick, type }) => {
  return (
    <button
      className="custom-button rounded-pill py-2 px-3"
      data-bs-toggle={toggle}
      data-bs-target={target}
      onClick={onclick}
      type={type}
    >
      {icon} {buttonName}
    </button>
  );
};

export default BlueButton;