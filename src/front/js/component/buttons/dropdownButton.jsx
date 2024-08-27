import React from "react";
import LogoutLink from "../logout.js";

const DropdownButton = ({ buttonName, icon }) => {
  return (
    <div className="dropdown">
      <button
        className="custom-button rounded-pill py-2 px-3 dropdown-toggle mx-2 my-2"
        data-bs-toggle="dropdown"
        type="button"
        aria-expanded="false"
      >
        {icon} {buttonName}
      </button>
      <ul className="dropdown-menu dropdown-menu-light">
        <li>
          <a className="dropdown-item" href="#">
            Mi perfil
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <LogoutLink />
        </li>
      </ul>
    </div>
  );
};

export default DropdownButton;
