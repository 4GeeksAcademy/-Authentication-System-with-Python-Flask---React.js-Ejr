import React from "react";
import "./styles.css";

const BigContainer = ({ children }) => {
  return (
    <div className="big-container boxShadow">
      <span className="bg-color" />
      {children}
    </div>
  );
};

export default BigContainer;
