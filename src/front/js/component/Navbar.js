import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import '../../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

const NavBar = () => {
  let navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary align-items-center p-0 mb-5">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"><Logo /></NavLink>
        <Dropdown>
          <Dropdown.Toggle class="menu-bottom" variant="secondary" id="dropdown-basic">
            Look Here
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/recomendaciones">Recommendations</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/autores">Authors</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/generos">Genres</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/best-seller">Best Seller</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/mas-buscados">Most Wanted</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/libros aleatorios">Random Books</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <SearchBar />

        <div className="d-flex justify-content-end align-items-center">
          <button onClick={() => navigate('/signup')} className="btn btn-primary me-2">
            Registrarse
          </button>
          <button onClick={() => navigate('/login')} className="btn btn-secondary">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
