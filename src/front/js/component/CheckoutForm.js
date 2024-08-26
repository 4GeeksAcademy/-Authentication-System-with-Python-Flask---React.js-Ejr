import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Mueve esta línea arriba
    
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
    
        setLoading(false); // Mueve esta línea abajo
    
        if (error) {
            console.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log("Payment successful!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : `Pay $${amount}`}
            </button>
        </form>
    );
};
