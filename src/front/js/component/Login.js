import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.login(email, password);
    navigate("/");
    // Handle login logic here
    console.log(`Logging in with email ${email} and password ${password}`);
  };

  return (
    <Container style={{ color: "white" }}>
      <Row className="justify-content-md-center">
        <Col md="4">
          <Form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
