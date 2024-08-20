import React, { useState } from "react";
import "../../styles/accordion.css";

const AccordionContainer = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className= {`mx-auto accordion ${isOpen ? "active" : ""}`}>
      <div
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <h5>{title}</h5>

        <i className={`fa-solid fa-chevron-down ${isOpen ? "active" : ""}`}></i>
      </div>

      {isOpen && (
        <div className="accordion-content">
          <p>{children}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionContainer;