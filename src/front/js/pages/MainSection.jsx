import React from 'react';
import styles from './MainSection.module.css';
import logo from "../../img/logow.png";
import logo2 from "../../img/white.png";

const MainSection = ({ title, subtitle, buttonText, buttonLink }) => {
    const handleButtonClick = (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

        const imageSliderElement = document.getElementById('ImageSlider');
        if (imageSliderElement) {
            imageSliderElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.mainSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <img src={logo} alt="logo" className={`${styles.logo} ${styles.fadeInScale}`} />
                <img src={logo2} alt="logo" className={`${styles.logo2} ${styles.fadeInScaleDelay}`} />
                <p className={styles.subtitle}>{subtitle}</p>
                {buttonText && (
                    <a href="#" onClick={handleButtonClick} className={styles.button}>
                        {buttonText}
                    </a>
                )}
            </div>
        </section>
    );
};

export default MainSection;