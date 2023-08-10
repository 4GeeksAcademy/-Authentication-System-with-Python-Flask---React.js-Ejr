import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
  const { product } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  }

  if (paidFor) {
    alert("Disfruta del viaje!");
  }

  if (error) {
    alert(error);
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "AUhavhSMBFBY08HaRDVYAVtP0_opyZj2sMf3E8iVWlf5lvPQSex2_n4YyP_-1kD6LonYzrY0crPXzjXP" }}>
      <div className='btn-paypal'>
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          }}
          onClick={(data, actions) => {
            const hasAlreadyBoughtCourse = false;
            if (hasAlreadyBoughtCourse) {
              setError("You Already bough this course");
              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.description,
                  amount: {
                    value: product.price,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, action) => {
            const order = await action.order.capture();
            console.log("order", order);
            handleApprove(data.orderID);
          }}
          onCancel={() => { }}
          onError={(err) => {
            setError(err);
            console.log("PayPal Checkout onError", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  )
}

export default PaypalCheckoutButton