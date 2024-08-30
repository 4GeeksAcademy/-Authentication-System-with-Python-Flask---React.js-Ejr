//CheckoutForm.jsx: Se carga la vista de pago con el formulario de Stripe. Al cargar, se solicita al backend que cree un PaymentIntent.
//El usuario ingresa los detalles de su tarjeta y el pago se procesa usando stripe.confirmCardPayment con el client_secret.

import React, {useState, useEffect, useContext} from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Context } from "../store/appContext";



export const CheckoutForm = () => {
    const{store, actions}=useContext(Context)
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(''); //clave para confirmar el pago
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        // Al cargar la página, se realiza una solicitud POST al backend para crear un PaymentIntent
        fetch(process.env.BACKEND_URL + '/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //la cantidad ha pagar esta puesta fija, pero puede recibir un objeto desde el contexto
          body: JSON.stringify({ amount: store.cursoSeleccionado.precio , currency: 'usd' }) // coger el precio del curso seleccionado.
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret)); //client_secret, que se almacena en el estado local (setClientSecret)
      }, []);


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
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
      }
      else{
        console.log('some error')
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || loading}>
          Pay
        </button>
      </form>
    );
  };
