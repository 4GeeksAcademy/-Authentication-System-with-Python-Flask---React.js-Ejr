//FormularioPago:


/* Usa Stripe para procesar el pago.
-Simulación: Si isSimulating es true, simula un pago exitoso mostrando un modal y redirigiendo después de 2 segundos.
-Pago Real: Si isSimulating es false, realiza un pago real con Stripe y maneja la confirmación del pago.
-Modal: Muestra un modal de éxito y redirige a /completoDisWeb después de 2 segundos. */


import React, {useState, useEffect, useContext} from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Context } from "../store/appContext";



export const CheckoutForm = () => {
    const{store, actions}=useContext(Context)
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads 
        fetch(process.env.BACKEND_URL + '/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //la cantidad ha pagar esta puesta fija, pero puede recibir un objeto desde el contexto
          body: JSON.stringify({ amount: store.cursoSeleccionado.precio , currency: 'usd' }) // coger el precio del curso seleccionado.
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret)); 
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
