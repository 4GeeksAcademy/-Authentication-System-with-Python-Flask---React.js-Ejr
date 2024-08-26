import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "../../styles/checkout.css";

export const Payment = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(process.env.BACKEND_URL + '/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Math.round(amount * 100), currency: 'usd' })
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret)); 
    }, [amount]);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setLoading(true);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      setLoading(false);

      if (error) {
        console.log('[error]', error);
        setMessage('Hubo un error en el pago. Inténtalo de nuevo.');
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        setMessage(`¡Pago completado con éxito de $${amount}!`);
      } else {
        console.log('some error');
        setMessage('El pago no se procesó. Inténtalo de nuevo.');
      }
    };

    return (
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <CardElement className="card-element" />
          <button type="submit" disabled={!stripe || loading} className="pay-button">
            {loading ? "Processing..." : `Pagar $${amount}`}
          </button>
        </form>
        {message && <p className="payment-message">{message}</p>}
      </div>
    );
};
