import React from 'react';
import PayPalButton from '../component/PayPalButton.jsx'; 

export const BuyMeACoffee = () => {
    const handleSuccess = (details) => {
        console.log("Transaction completed by " + details.payer.name.given_name);
        // Aquí puedes manejar la respuesta de éxito y actualizar tu estado o backend si es necesario
    };

    return (
        <div>
            <h1>Buy Me a Coffee</h1>
            <PayPalButton amount="5.00" onSuccess={handleSuccess} />
        </div>
    );
};
