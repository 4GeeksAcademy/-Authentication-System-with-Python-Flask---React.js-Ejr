import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import GameCard from "./GameCard.jsx";
import CartDropdown from "./CartDropdown.jsx";

const MyNavbar = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Game Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/games">
              Games
            </Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/news">
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/support">
              Support
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
            <CartDropdown cartItems={cartItems} clearCart={clearCart} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { MyNavbar as Navbar };
