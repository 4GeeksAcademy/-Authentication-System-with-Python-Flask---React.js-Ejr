import React from 'react';
import GooglePay from './GooglePay';
import PaypalCheckoutButton from './PayPalCheckoutButton';

const PaymentOptions = () => {
  const product = {
    description: "Learn how to build a website with React JS",
    price: 29,
  };
  return (
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
  );
};

export default PaymentOptions;