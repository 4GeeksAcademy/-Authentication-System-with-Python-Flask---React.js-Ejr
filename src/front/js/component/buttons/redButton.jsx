import React from "react";
import "../../../styles/redButton.css"

const RedButton = ({ buttonName, toggle, target, icon, onclick, type }) => {
  return (
    <button
      className="red-btn rounded-pill py-2 px-3 "
      data-bs-toggle={toggle}
      data-bs-target={target}
      onClick={onclick}
      type={type}
    >
      {icon} {buttonName}
    </button>
  );
};

export default RedButton;