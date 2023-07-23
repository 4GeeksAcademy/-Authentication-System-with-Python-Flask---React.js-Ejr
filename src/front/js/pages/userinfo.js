import React, { useState } from 'react';

const UserInfo = ({ userName, email, address, phone }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion" id="userInfoAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button"
            type="button"
            onClick={toggleAccordion}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls="panelsStayOpen-collapseOne"
          >
            Información del vendedor
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body d-flex flex-column">
            <strong>Usuario:</strong> {userName}
            <strong>Correo electrónico:</strong> {email}
            <strong>Dirección:</strong> {address}
            <strong>Nº de teléfono:</strong> {phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;