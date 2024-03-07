import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/navbar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => {
  let navigate = useNavigate();

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#DFDCD3' }} className="align-items-center">
      <Container fluid>
        <Navbar.Brand href="#home"><Logo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex align-items-center">
          <Nav className="me-auto my-2 my-lg-0" style={{ '--bs-scroll-height': '100px' }}>
            <Nav.Link as={Link} to="/recomendaciones">Recomendaciones</Nav.Link>
            <Nav.Link as={Link} to="/autores">Autores</Nav.Link>
            <Nav.Link as={Link} to="/generos">Géneros</Nav.Link>
            <Nav.Link as={Link} to="/best-seller">Best Seller</Nav.Link>
            <Nav.Link as={Link} to="/mas-buscados">Más Buscados</Nav.Link>
          </Nav>
          <SearchBar />
          <div className="ms-auto">
            <button onClick={() => navigate('/signup')} className="btn btn-primary login-signup-btn me-2">
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className="btn btn-secondary login-signup-btn">
              Log In
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
