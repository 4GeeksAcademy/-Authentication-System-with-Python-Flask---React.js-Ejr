import React, { useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Message({ content }) {
  return <p>{content}</p>;
}

export function PaypalPayment() {
  const initialOptions = {
    "client-id": "AevJ33XfD8OFiLiW8oNbuK33BjtIiZL3rNyccBkAwZArxDC8xmBcc4Th_ESuXEGqKBkBV83QXNl8I_ND", // Cambia "test" por tu verdadero client-id en producción
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const { store, actions } = useContext(Context);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0; // Obtenemos el precio total de la ubicación

  const datos = {
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: totalPrice.toFixed(2),
        },
      },
    ],
  };

  async function createOrder(data, actions) {
    try {
      const orderID = await actions.order.create(datos);
      return orderID;
    } catch (error) {
      console.error("Error en order.create:", error);
      throw error;
    }
  }

  async function onApprove(data, actions) {
    try {
      const details = await actions.order.capture();
      setMessage(`Transacción completada por ${details.payer.name.given_name}!`);
    } catch (error) {
      console.error('Error al capturar la transacción:', error);
      setMessage('Ocurrió un error al procesar la transacción.');
    }
  }

  async function onError(err) {
    console.error('Error durante la transacción:', err);
    setMessage(`Ocurrió un error durante la transacción: ${err.message}`);
  }

  return (
    <div className="App">
      <h1>Total: ${totalPrice.toFixed(2)}</h1>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          forceReRender={[totalPrice]}
          style={{
            shape: "pill",
            layout: "vertical",
            color: "silver",
            label: "paypal",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

