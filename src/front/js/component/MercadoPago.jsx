import React, { useState } from "react";
import { CardNumber, ExpirationDate, SecurityCode, initMercadoPago, createCardToken } from '@mercadopago/sdk-react';
import { Card, Button, Form } from "react-bootstrap";
import "../../styles/MercadoPago.css";

// Inicializa Mercado Pago con tu llave pública
initMercadoPago('YOUR_PUBLIC_KEY');

const MercadoPagoComponent = () => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    identificationType: '',
    identificationNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await createCardToken({
        cardNumber: document.getElementById('form-checkout__cardNumber').value,
        cardExpirationMonth: document.getElementById('form-checkout__cardExpirationMonth').value,
        cardExpirationYear: document.getElementById('form-checkout__cardExpirationYear').value,
        securityCode: document.getElementById('form-checkout__securityCode').value,
        cardholderName: formData.cardholderName,
        identificationType: formData.identificationType,
        identificationNumber: formData.identificationNumber,
      });

      console.log('Token generado:', token);
      // Envía el token al backend para procesar el pago
    } catch (error) {
      console.error('Error al generar el token:', error);
    }
  };

  return (
    <Card className="mercadopago-card text-center">
      <Card.Body>
        <Card.Title className="mercadopago-title">Compra tu sesión de terapia</Card.Title>
        <Card.Text className="mercadopago-text">
          Adquiere un vale de 30 minutos por <strong>$800 UYU</strong>.
        </Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="form-checkout__cardholderName">
            <Form.Label>Nombre del titular</Form.Label>
            <Form.Control
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="form-checkout__identificationType">
            <Form.Label>Tipo de documento</Form.Label>
            <Form.Control
              as="select"
              name="identificationType"
              value={formData.identificationType}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo de documento</option>
              <option value="CI">Cédula de Identidad</option>
              <option value="RUT">RUT</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="form-checkout__identificationNumber">
            <Form.Label>Número de documento</Form.Label>
            <Form.Control
              type="text"
              name="identificationNumber"
              value={formData.identificationNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="form-checkout__cardNumber">
            <Form.Label>Número de tarjeta</Form.Label>
            <Form.Control
              type="text"
              name="targetNumber"
              value={formData.targetNumber}
              onChange={handleChange}
              required
            />
           {/*  <CardNumber id="form-checkout__cardNumber" className="form-control" /> */}
          </Form.Group>
          <Form.Group controlId="form-checkout__cardExpirationDate">
            <Form.Label>Fecha de expiración</Form.Label>
            <Form.Control
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="form-checkout__securityCode">
            <Form.Label>Código de seguridad</Form.Label>
            <Form.Control
              type="text"
              name="securityCode"
              value={formData.securityCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mercadopago-submit-button mt-3">
            Pagar
          </Button>
        </Form>
        <div className="mercadopago-logo">
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



