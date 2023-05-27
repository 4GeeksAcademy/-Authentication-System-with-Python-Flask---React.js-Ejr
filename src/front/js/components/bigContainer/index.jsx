import React from "react";
import "./styles.css";

const BigContainer = ({ children }) => {
  return (
    <section className="big-container _boxShadow">
      <span className="bg-color" />
      {children}
    </section>
  );
};

export default BigContainer;
