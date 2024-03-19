import React, { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import '../../styles/navbar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';

const NavBar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const isLoggedIn = !!store.token;

  const handleLogout = () => {
    actions.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="body-tertiary" expand="lg" className="align-items-center mb-5 p-0" style={{ backgroundColor: '#DFDCD3' }}>
      <div className="container-fluid">
        <Navbar.Brand as={NavLink} to="/"><Logo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="navbarScrollingDropdown" className="custom-dropdown-toggle">
              <NavDropdown.Item as={NavLink} to="/recomendaciones">Recommendations</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/autores">Authors</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/generos">Genres</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/best-seller">Best Seller</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/mas-buscados">Most Wanted</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/random-books">Random Books</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="mx-auto">
            <SearchBar />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            {isLoggedIn ? (
              <>
                <Button onClick={handleLogout} variant="secondary" className="login-signup-btn me-2">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/signup')} variant="primary" className="login-signup-btn me-2">
                  Sign Up
                </Button>
                <Button onClick={() => navigate('/login')} variant="secondary" className="login-signup-btn">
                  Log In
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
