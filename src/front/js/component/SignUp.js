import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Navbar } from "./navbar";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle signup logic here
    console.log(`Signing up with name ${name}, email ${email}, and password ${password}`);
  };

  return (
    <Card style={{ width: '20rem', margin: 'auto', marginTop: '50px' }}>
      <Card.Body>
        <Card.Title className="text-center">Sign Up</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUp;
