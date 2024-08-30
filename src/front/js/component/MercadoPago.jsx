import React, { useState } from "react";
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { Card, Button } from "react-bootstrap";
import "../../styles/MercadoPago.css";
import logo from "../../img/logo.png";



const MercadoPagoComponent = () => {
  /* const [preferenceId, setPreferenceId]= useState(null)
  initMercadoPago('APP_USR-31e7645f-5e69-4f82-ab31-f8f5feb16be2', { locale: "es-UY" }); */

 /*  const handleBuy = async (e) => {
    e.preventDefault();
    const id = await createPreference();
    if(id) {
      setPreferenceId(id);
    }
  }; */


  return (
    <Card className="mercadopago-card text-center">
      <Card.Body>
        <img className="logo" src={logo} alt="Logo" />
        <Card.Title className="mercadopago-title">Compra tu sesión de terapia</Card.Title>
        <Card.Text className="mercadopago-text">
          Adquiere un vale de 30 minutos por <strong>$800 UYU</strong>.
        </Card.Text>

        <div className="mercadopago-logo">
          <Button variant="primary" /* onClick={handleBuy} */ type="submit" className="mercadopago-submit-button mt-3">
            Comprar
          </Button>

          <img src="https://logotipoz.com/wp-content/uploads/2021/10/version-horizontal-large-logo-mercado-pago.webp" alt="Mercado Pago Logo" className="mercadopago-logo" />
        </div>
        <div className="security-icons">
          <img src="https://cdn.pixabay.com/photo/2023/02/10/01/41/safe-purchase-7779878_1280.png" alt="Security Icon" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MercadoPagoComponent;



