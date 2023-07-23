import React, { useState } from 'react';

const UserInfo = ({ userName, email, address, phone }) => {
  const [isOpen, setIsOpen] = useState(false); // Cambio a false para que aparezca cerrado inicialmente

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion m-auto w-100" id="userInfoAccordion">
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
          <div className="accordion-body d-flex flex-column my-1 justify-content-start text-start">
            <strong className='my-2' >Usuario:</strong> {userName}
            <strong className='my-2'>Correo electrónico:</strong> {email}
            <strong  className='my-2'>Dirección:</strong> {address}
            <strong  className='my-2'>Nº de teléfono:</strong> {phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
