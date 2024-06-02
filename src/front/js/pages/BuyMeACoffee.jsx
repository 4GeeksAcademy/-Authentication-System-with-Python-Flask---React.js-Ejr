import React, { useState } from 'react';
import PayPalButton from '../component/PayPalButton.jsx';
import '../../styles/BuyMeACoffee.css'; // Asegúrate de crear este archivo

export const BuyMeACoffee = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const handleSuccess = (details) => {
        setSuccessMessage(`Transaction completed by ${details.payer.name.given_name}`);
    };

    return (
        <div className="coffee-container">
            <h1>Buy Us a Coffee</h1>
            <div className="message-container">
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
            <div className="paypal-button-container">
                <PayPalButton amount="5.00" onSuccess={handleSuccess} />
            </div>
        </div>
    );
};
