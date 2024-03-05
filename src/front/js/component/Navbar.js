import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import '../../styles/navbar.css';
import { Navbar, Container } from 'react-bootstrap';

export const NavBar = () => {
    return (
        <Navbar expand="lg" style={{ backgroundColor: '#DFDCD3' }}>
            <Container fluid>
                <Navbar.Brand href="#home"><Logo /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <NavLinks />
                    <SearchBar />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

