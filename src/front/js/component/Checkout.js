import React, { useContext } from 'react'
import CardSection from './CardSection'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
  const { actions } = useContext(Context)
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
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
      navigate("/")

    }

  }

  return (
    <div className="col-lg-12">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <CardSection />
        </div>

        <button data-bs-dismiss="modal" className="btn btn-primary">Pagar Suscripción</button>

      </form>
    </div>
  )
}
export default Checkout