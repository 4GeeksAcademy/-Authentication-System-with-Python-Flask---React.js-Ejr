import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import styles from "./Home.module.css";

import Navbar from "./NavbarHome.jsx";
import Benefits from './Benefits.jsx';
import Plans from './Plans.jsx';
import PricingPlans from './PricingPlans.jsx';
import Footer from "../component/Footer.jsx";
import ImageSlider from "./ImageSlider.jsx";

// Importa el componente MainSection
import MainSection from "./MainSection.jsx";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      {/* Utiliza el componente MainSection aquí */}
      <MainSection
        title="Welcome to MOMENTUM 360"
        subtitle="The best choice for your gym"
        buttonText="Learn More"
        buttonLink="/about" // Aquí coloca el enlace correcto
      />
      <div className={styles.content}>
        <ImageSlider />
        <div className={styles.sectionSpacing}>
          <PricingPlans />
        </div>
        <div className={styles.sectionSpacing}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;