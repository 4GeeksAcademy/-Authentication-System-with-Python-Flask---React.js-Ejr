import React, { useContext, useEffect } from 'react';
import GooglePay from './GooglePay';
import PaypalCheckoutButton from './PayPalCheckoutButton';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const PaymentOptions = () => {
  const { store, actions } = useContext(Context)
  const [offer, setOffer] = useParams({})

  useEffect(() => {
    const loadData = async () => {
      setOffer(await actions.getOfferById(params.offer_id))
    }
    loadData()
    console.log('Fetch data offer for paypal OK');
  }, [])

  const product = {
    description: "Learn how to build a website with React JS",
    price: 29,
  };
  return (
    <div className="content-offer-details">
      <div className="offer-payment">

      </div>
      <div className='btn-payment-content'>
        <h1>Opciones de Pago:</h1>
        <div className="btn-payment">
          <div className="btn-google">
            <h3>GooglePay:</h3>
            <GooglePay />
          </div>
          <hr />
          <div className="btn-paypal">
            <h3>PayPal:</h3>
            <PaypalCheckoutButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;