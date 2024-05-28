import React, { useState, useEffect, useContext } from 'react';
import { Offcanvas, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import styles from './Navbar.module.css';  // Asegúrate de que el path es correcto


import EditProfile from './EditProfile.jsx';
import UserDataDetail from '../pages/UserDataDetail.jsx';
import UserBooking from '../pages/UserBooking.jsx';
import MembershipPurchase from './MembershipPurchase.jsx';
import ProfileImageUpload from './ProfileImageUpload.jsx';

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
        navigate('/');
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className={styles.navbar}>
                <Navbar.Brand className={styles.logonavbar}>MOMENTUM360</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className={styles.logonavbar}>Home</Nav.Link>
                        <Nav.Link href="/plans" className={styles.logonavbar}>Plans</Nav.Link>
                        <Nav.Link href="/Benefits" className={styles.logonavbar}>About</Nav.Link>
                        <Nav.Link href="/Calendar" className={styles.logonavbar}>Calendar</Nav.Link>
                    </Nav>
                    {store.isAuthenticated && (
                        <>
                            <Button onClick={handleCloseSession} className={styles.logoutButton}>
                                Sign off</Button>
                            <Link to="/">
                                <Button className={styles.ProfileButton}>Go to profile</Button>
                            </Link>
                            {store.uploadedUserData.role === 'master' && (
                                <Link to="/ModulePage">
                                    <Button className={styles.logoutButton}>
                                        Modules</Button>
                                </Link>
                            )}
                            <Button onClick={handleShow} className={styles.ProfileButton}>
                                {store.uploadedUserData.profile_image_url ? (
                                    <img
                                        src={store.uploadedUserData.profile_image_url}
                                        alt="Profile"
                                        className={styles.profileImageButton}
                                    />
                                ) : (
                                    <i className="fa-regular fa-user"></i>
                                )}
                            </Button>
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
                    <Offcanvas.Title>
                        Bienvenido: {store.uploadedUserData.name}
                        {store.uploadedUserData.profile_image_url && (
                            <img
                                src={store.uploadedUserData.profile_image_url}
                                alt="Profile"
                                className={styles.profileImage}
                            />
                        )}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ProfileImageUpload />
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
