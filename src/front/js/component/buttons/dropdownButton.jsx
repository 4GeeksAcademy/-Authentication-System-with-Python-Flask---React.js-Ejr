import React from "react";

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
      <ul class="dropdown-menu dropdown-menu-light">
        <li>
          <a class="dropdown-item" href="#">
            Mi perfil
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownButton;
