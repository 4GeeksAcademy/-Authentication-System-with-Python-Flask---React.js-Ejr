import React, { useState } from 'react';
import styles from './PricingPlans.module.css';

const Modal = ({ isOpen, onClose, onRegister }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>
                    &times;
                </span>
                <h2>Attention</h2>
                <p>To get a plan, you must log in first</p>
                <button className={styles.registerButton} onClick={onRegister}>
                    Log in 
                </button>
            </div>
        </div>
    );
};

const PricingContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePlanClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleRegister = () => {
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <span className={styles.choose}>CHOOSE</span>{' '}
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
                    <a className={styles.enroll} onClick={handlePlanClick}>
                        Choose Basic Plan
                    </a>
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
                    <a className={styles.enroll} onClick={handlePlanClick}>
                        Choose Standard Plan
                    </a>
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
                    <a className={styles.enroll} onClick={handlePlanClick}>
                        Choose Premium Plan
                    </a>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} onRegister={handleRegister} />
        </div>
    );
};

export default PricingContainer;