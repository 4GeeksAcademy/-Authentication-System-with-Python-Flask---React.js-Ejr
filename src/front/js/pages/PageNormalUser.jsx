import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import styles from "./PageNormalUser.module.css"; // Asegúrate que el path de importación es correcto

import { Context } from "../store/appContext";
import PrivateCalendar from "../component/PrivateCalendar.jsx";
import CreateClasses from "../component/CreateClasses.jsx";
import MyCalendar from "../component/Calendar.jsx";
import UserBooking from "./UserBooking.jsx";
import PrivatePageUser from "./PrivatePageUser.jsx";
import Breadcrumbs from "../component/Breadcrumb.jsx";
import SingupMaster from "../component/SingupMaster.jsx";
import Singup from "../component/Singup.jsx";
import ConfirmarEmail from "../component/ConfirmEmail.jsx";
import Home from "./Home.jsx";
import Login from "../component/Login.jsx";
import Navbar from "../component/Navbar.jsx";
import BookingView from "../component/BookingView.jsx";
import MembershipPurchase from "../component/MembershipPurchase.jsx";
// import Oneuser from "./Oneuser.jsx";
import Users from "../component/Users.jsx";
// import Homeadmin from "./Homeadmin.jsx";
import UploadForm from "../component/UploadForm.jsx";
import ImageGallery from "../component/ImageGallery.jsx";
import TransactionsTable from "../component/TransactionsTable.jsx";
import UserCreator from "../component/UserCreator.jsx";
import PRRecord from "../component/PRRecord.jsx";

const PageNormalUser = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
        const dataRole = localStorage.getItem("dataRole");

        if (!isAuthenticated || (dataRole !== "athlete" && dataRole !== "master")) {
            navigate("/");
        }
    }, [navigate]);

    
    const handleOpenModal = (index) => {
        setCurrentSlide(index);
        setShow(true);
    };

    const handleCloseModal = () => setShow(false);

    const components = [
        // { component: <CreateClasses />, name: "Create Classes" },
        // { component: <MyCalendar />, name: "My Calendar" },
        { component: <PrivateCalendar showModal={!show} />, name: "Private Calendar" },
        // { component: <UserBooking />, name: "User Booking" },
        // { component: <BookingView />, name: "BookingView " },
        // { component: <PrivatePageUser />, name: "Private Page User" },
        // { component: <SingupMaster />, name: "Singup Master" },
        // { component: <UserCreator />, name: "UserCreator " },
        // { component: <MembershipPurchase />, name: "MembershipPurchase " },
        // { component: <Oneuser />, name: "Oneuser " }, eliminar
        // { component: <Homeadmin />, name: "Homeadmin " }, eliminar
        // { component: <UploadForm />, name: "UploadForm " },
        { component: <ImageGallery />, name: "ImageGallery " },
        // { component: <TransactionsTable />, name: "TransactionsTable " },
        // { component: <Users />, name: "Users " },
        { component: <PRRecord />, name: "PRRecord " },
    ];

    return (
        <>
            <h1>User Page</h1>
            <Breadcrumbs />
            <div className={styles.userDetailsContainer}>
                {components.map((entry, index) => (
                    <div key={index} className={styles.securityQuestions} onClick={() => handleOpenModal(index)}>
                        <h3>{entry.name}</h3>
                        <p>Click to view more...</p>
                    </div>
                ))}
            </div>

            <Modal show={show} onHide={handleCloseModal} centered size="lg" className={styles.modalCustom}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modalTitle}>{components[currentSlide].name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    {components[currentSlide].component}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PageNormalUser;
