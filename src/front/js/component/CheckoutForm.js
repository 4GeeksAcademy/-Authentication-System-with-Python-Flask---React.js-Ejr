import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import "../../styles/CheckoutForm.css";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setFormSubmitted(true);
  };

  return (
    <div className="checkout-page">
      <Container>
        <h2 className="mb-4 white-text">Checkout:</h2>
        {formSubmitted && (
          <Alert variant="danger" className="mb-4">
            CANNOT TAKE PAYMENT AT THIS TIME
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label className="white-text">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label className="white-text">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* ... */}
          {/* Address, city, state, and zip fields */}
          {/* ... */}

          <h4 className="white-text mt-4">Credit Card Information</h4>

          <Form.Group controlId="cardNumber">
            <Form.Label className="white-text">Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="expMonth">
                <Form.Label className="white-text">Expiration Month</Form.Label>
                <Form.Control
                  type="text"
                  name="expMonth"
                  value={formData.expMonth}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="expYear">
                <Form.Label className="white-text">Expiration Year</Form.Label>
                <Form.Control
                  type="text"
                  name="expYear"
                  value={formData.expYear}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cvv">
                <Form.Label className="white-text">CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CheckoutForm;
