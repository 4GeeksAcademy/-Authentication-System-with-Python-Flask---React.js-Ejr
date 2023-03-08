
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const MyNavbar = () => {
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
            <Nav.Link as={Link} to="/games">
              Games
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as ={Link} to="/store">Store</Nav.Link>
            <Nav.Link as ={Link} to="/community">Community</Nav.Link>
            <Nav.Link as ={Link} to="/support">Support</Nav.Link>
            <Nav.Link as ={Link} to="/account">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { MyNavbar as Navbar };
