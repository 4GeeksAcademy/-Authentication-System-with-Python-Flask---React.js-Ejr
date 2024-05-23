import React, { useState, useEffect, useContext } from 'react';
import { Offcanvas, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

import EditProfile from './EditProfile.jsx';
import UserDataDetail from '../pages/UserDataDetail.jsx';
import UserBooking from '../pages/UserBooking.jsx';
import MembershipPurchase from './MembershipPurchase.jsx';
import styles from './Navbar.module.css';  // Asegúrate de que el path es correcto

const NavigationBar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await actions.validateToken(token);
            }
        };
        checkAuthStatus();
    }, []);

    const handleCloseSession = async () => {
        await actions.closeSession();
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className={styles.navbar}>
                <Navbar.Brand href="#home">No Name</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/plans">Plans</Nav.Link>
                        <Nav.Link href="/Benefits">About</Nav.Link>
                        <Nav.Link href="/BookingView">Calendar</Nav.Link>
                    </Nav>
                    {store.isAuthenticated && (
                        <>
                            <Button onClick={handleCloseSession} className={styles.logoutButton}>Cerrar sesión</Button>
                            <Link to="/PrivatePageUser">
                                <Button className={styles.ProfileButton}>Ir al perfil</Button>
                            </Link>
                            {store.dataRole === 'master' && (
                                <Link to="/ModulePage">
                                    <Button className={styles.logoutButton}>Modulos</Button>
                                </Link>
                            )}
                            <Button onClick={handleShow} className={styles.ProfileButton}><i className="fa-regular fa-user"></i></Button>
                        </>
                    )}
                    {!store.isAuthenticated && (
                        <Link to="/Login">
                            <Button className={styles.loginButton}>Login</Button>
                        </Link>
                    )}
                </Navbar.Collapse>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton className={styles.offcanvasHeader}>
                    <Offcanvas.Title>Bienvenido: {store.uploadedUserData.name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditProfile />
                    <MembershipPurchase />
                    <UserDataDetail />
                    <UserBooking />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default NavigationBar;
