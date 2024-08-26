import React, { useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = ({ amount, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        setLoading(false);

        if (error) {
            console.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log("Payment successful!");
            setTimeout(() => {
                onClose(); // Cierra el modal después de 2 segundos
            }, 2000);
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
