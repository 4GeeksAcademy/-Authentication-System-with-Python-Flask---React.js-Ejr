import React from 'react';
import styles from './PaymentResponses.module.css';

const CancelPayment = () => (
    <div className={styles.container}>
        <div className={styles.error}>
            <h2>Payment Cancelled</h2>
            <p>Your payment has been cancelled.</p>
            <button onClick={() => window.location.href = '/'}>Go to Home</button>
        </div>
    </div>
);

export default CancelPayment;
