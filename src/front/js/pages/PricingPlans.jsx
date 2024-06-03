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
                {/* Basic Plan */}
                <div className={`${styles.pricingCard} ${styles.pricingCardBasic}`}>
                    <h4 className={styles.pricingCardTitle}>Basic Plan</h4>
                    <div className={styles.pricingCardPrice}>$9.99</div>
                    <div className={styles.pricingCardDetails}>
                        <ul>
                            <li>Basic member management.</li>
                            <li>Attendance tracking.</li>
                            <li>Class scheduling.</li>
                        </ul>
                    </div>
                    <a className={styles.enroll} href="#">Choose Basic Plan</a>
                </div>

                {/* Standard Plan */}
                <div className={`${styles.pricingCard} ${styles.pricingCardStandard}`}>
                    <h4 className={styles.pricingCardTitle}>Standard Plan</h4>
                    <div className={styles.pricingCardPrice}>$19.99</div>
                    <div className={styles.pricingCardDetails}>
                        <ul>
                            <li>All features of Basic Plan.</li>
                            <li>Training progress tracking.</li>
                            <li>Access to reports and data analysis.</li>
                            <li>Integration with fitness tracking devices.</li>
                        </ul>
                    </div>
                    <a className={styles.enroll} href="#">Choose Standard Plan</a>
                </div>

                {/* Premium Plan */}
                <div className={`${styles.pricingCard} ${styles.pricingCardPremium}`}>
                    <h4 className={styles.pricingCardTitle}>Premium Plan</h4>
                    <div className={styles.pricingCardPrice}>$29.99</div>
                    <div className={styles.pricingCardDetails}>
                        <ul>
                            <li>All features of Standard Plan.</li>
                            <li>24/7 priority support.</li>
                            <li>Advanced customization.</li>
                            <li>Exclusive access to new features.</li>
                        </ul>
                    </div>
                    <a className={styles.enroll} href="#">Choose Premium Plan</a>
                </div>
            </div>
        </div>
    );
};

export default PricingContainer;
