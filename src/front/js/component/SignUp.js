import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { db, User } from "py-loader!../../../api/models.py";

//src/api/models.py
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    // Create a new User object
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      is_active: true, // or false, depending on your application logic
    });

    // Save the new User object to the database
    await db.session.add(newUser);
    await db.session.commit();

    console.log("User saved to database:", newUser);
  } catch (error) {
    console.error(error);
  }
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /*const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make HTTP request to save user data
      const response = await axios.post('https://3000-yonatancres-steamkiller-n2csm11huke.ws-us90.gitpod.io/signup', {
        name: name,
        email: email,
        password: password,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <Card style={{ width: "20rem", margin: "auto", marginTop: "50px" }}>
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
