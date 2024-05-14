import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Home.module.css"; // Importación de estilos CSS


import Benefitis from './Benefitis.jsx';
import Plans from './Plans.jsx';



const Home = () => {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Welcome to Our CrossFit Website</h1>
      </header>
      <div className={styles.content}>
        <Benefitis/>
        <Plans/>
      </div>
    </div>
  );
};

export default Home;

