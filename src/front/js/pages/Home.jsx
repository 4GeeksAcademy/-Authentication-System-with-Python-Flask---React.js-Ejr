import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import styles from "./Home.module.css";

import Navbar from "./NavbarHome.jsx";
import Benefits from './Benefits.jsx';
import Plans from './Plans.jsx';
import PricingPlans from './PricingPlans.jsx'
import Footer from "../component/Footer.jsx";
import ImageSlider from "./ImageSlider.jsx"

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Welcome to Our CrossFit Website</h1>
      </header>
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
