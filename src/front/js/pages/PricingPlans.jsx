import React from 'react';
import styles from './PricingPlans.module.css';

const PricingContainer = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <span className={styles.choose}>CHOOSE</span>{" "}
                <span className={styles.yourPlan}>YOUR PLAN</span>
            </h2>
            <div className={styles.pricingContainer}>
                {/* Plan Básico */}
                <div className={`${styles.pricingCard} ${styles.pricingCardBasic}`}>
                    <h4 className={styles.pricingCardTitle}>Plan Básico</h4>
                    <div className={styles.pricingCardPrice}>$9.99</div>
                    <div className={styles.pricingCardDetails}>
                        <ul>
                            <li>Gestión de miembros básica.</li>
                            <li>Registro de asistencia.</li>
                            <li>Programación de clases.</li>
                        </ul>
                    </div>
                    <a className={styles.enroll} href="#">Elegir Plan Básico</a>
                </div>

                {/* Plan Estándar */}
                <div className={`${styles.pricingCard} ${styles.pricingCardStandard}`}>
                    <h4 className={styles.pricingCardTitle}>Plan Estándar</h4>
                    <div className={styles.pricingCardPrice}>$19.99</div>
                    <div className={styles.pricingCardDetails}>
                        <ul>
                            <li>Todas las características del Plan Básico.</li>
                            <li>Seguimiento del progreso del entrenamiento.</li>
                            <li>Acceso a informes y análisis de datos.</li>
                            <li>Integración con dispositivos de seguimiento de fitness.</li>
                        </ul>
                    </div>
                    <a className={styles.enroll} href="#">Elegir Plan Estándar</a>
                </div>

                {/* Plan Premium */}
                <div className={`${styles.pricingCard} ${styles.pricingCardPremium}`}>
                    <h4 className={styles.pricingCardTitle}>Plan Premium</h4>
                    <div className={styles.pricingCardPrice}>$29.99</div>
                    <div className={styles.pricingCardDetails}>
                        <ul>
                            <li>Todas las características del Plan Estándar.</li>
                            <li>Soporte prioritario 24/7.</li>
                            <li>Personalización avanzada.</li>
                            <li>Acceso exclusivo a nuevas funciones.</li>
                        </ul>
                    </div>
                    <a className={styles.enroll} href="#">Elegir Plan Premium</a>
                </div>
            </div>
        </div>
    );
};

export default PricingContainer;
