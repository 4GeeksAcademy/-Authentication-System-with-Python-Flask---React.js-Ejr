
import React from 'react';
import styles from './MainSection.module.css';

const MainSection = ({ title, subtitle, buttonText, buttonLink }) => {
    return (
        <section className={styles.mainSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
                {buttonText && buttonLink && (
                    <a href={buttonLink} className={styles.button}>{buttonText}</a>
                )}
            </div>
        </section>
    );
};

export default MainSection;
