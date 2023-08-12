import React, { useContext, useEffect, useState } from 'react';
import PaypalCheckoutButton from './PayPalCheckoutButton';
import PaymentComponent from './PaymentComponent';
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom';

const PaymentOptions = () => {
  const { store, actions } = useContext(Context);


  const product = {
    description: "LATAM Trekking Tour",
    price: 2499.99,
  };
  return (
    <div className="content-offer-details">
      <div className="offer-payment">
        <h2>Un paso más <span>{store.user.username}</span> y este viaje es tuyo  🥳🥳🥳🥳</h2>


      </div>
      <div className='btn-payment-content'>
        <h2>Opciones de Pago:</h2>
        <div className="btn-payment">
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