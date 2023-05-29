import React from "react";
import styles from "./bigContainer.module.css";

const BigContainer = ({ children }) => {
  return (
    <section className={`${styles._bigContainer} _boxShadow`}>
      <span className={`${styles._bgColor} _gradient1`} />
      {children}
    </section>
  );
};
export default BigContainer;
