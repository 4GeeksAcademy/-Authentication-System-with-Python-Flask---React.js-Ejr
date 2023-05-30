import React from "react";
<<<<<<< HEAD
import "./styles.css";

const BigContainer = ({ children }) => {
  return (
    <div className="big-container boxShadow">
      <span className="bg-color" />
      {children}
    </div>
  );
};

=======
import styles from "./bigContainer.module.css";

const BigContainer = ({ children }) => {
  return (
    <section className={`${styles._bigContainer} _boxShadow`}>
      <span className={`${styles._bgColor} _gradient1`} />
      {children}
    </section>
  );
};
>>>>>>> dev
export default BigContainer;
