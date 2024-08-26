import React, { useState } from "react";
import "../../styles/accordion.css";

const AccordionContainer = ({ title, children, id, del }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={id} className= {`mx-auto accordion ${isOpen ? "active" : ""}`}>
      <div
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <h5>{title}</h5>
        <div className="d-flex">
        {del}
        <i className={`fa-solid fa-chevron-down ${isOpen ? "active" : ""}`}></i>
        </div>
      </div>

      {isOpen && (
        <div className="accordion-content">
          <span>{children}</span>
        </div>
      )}
    </div>
  );
};

export default AccordionContainer;