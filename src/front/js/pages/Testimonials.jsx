import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Testimonials.module.css"; // Importación de estilos CSS


const Testimonials = () => {
  return (
    <div className={styles.testimonials}>
      <h3 className={styles.title}>What Our Members Say</h3>
      <p>"This gym has changed my life! The community is amazing." - Jane Doe</p>
      <p>"The coaches are very knowledgeable and supportive." - John Smith</p>
    </div>
  );
};

export default Testimonials;


