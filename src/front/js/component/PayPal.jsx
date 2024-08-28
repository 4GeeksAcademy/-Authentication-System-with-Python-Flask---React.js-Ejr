import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card, Button } from "react-bootstrap";

const PayPalComponent = () => {
  const initialOptions = {
    "client-id": "AS_4pYzi6kvnqtWxtnAWKvwMGnHmfJ0xMKAmAOqiaBCfyy55myzW7CDiFzsjKCX3oJR0a39ZGZ0XYsmJ", // client ID Sandbox
    currency: "UYU",
    intent: "capture",
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log("Transaction completed by " + details.payer.name.given_name);
      // Aquí puedes enviar la información del pago al backend para procesarlo
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Card className="paypal-card text-center">
        <Card.Body>
          <Card.Title className="paypal-title">Compra tu sesión de terapia</Card.Title>
          <Card.Text className="paypal-text">
            Adquiere un vale de 30 minutos por <strong>$800 UYU</strong>.
          </Card.Text>
          <div className="paypal-button-container">
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: "800", // El valor debe ser un string
                    },
                  }],
                });
              }}
              onApprove={handleApprove}
              onError={(err) => console.error(err)}
            />
          </div>
          <Button variant="primary" className="paypal-support-button mt-3">
            Contactar Soporte
          </Button>
        </Card.Body>
      </Card>
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;