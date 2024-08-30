import React, { useContext } from 'react'
import CardSection from './CardSection'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Context } from "../store/appContext";
const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { actions } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {

      return;

    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log(['error'], error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      actions.paymentCompany(paymentMethod)
    }

  }

  return (
    <div className="col-lg-12">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <CardSection />
        </div>
        <button className="btn btn-primary">Pagar Suscripción</button>
      </form>
    </div>
  )
}
export default Checkout