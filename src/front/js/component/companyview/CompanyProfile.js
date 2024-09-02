import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { Context } from "../../store/appContext";
import ProfileImage from '../ProfileImage';
import { ButtonEdit } from './EditCompanyName';
import { EditCompanyDescription } from './EditCompanyDescription';
import { EditCompanyPhone } from './EditCompanyPhone';
import { EditCompanyMail } from './EditCompanyMail';
import ProfileProgress from '../ProfileProgress';
import CountrySelector from '../userview/Dropdown';
import CheckoutForm from "../../component/Checkout";
import Stars from '../stars';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const CompanyProfile = () => {

    const [companyData, setCompanyData] = useState({
        name: '',
        description: '',
        phone: '',
        email: '',
        country: '',
    });

    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    // Estado para los datos del modal
    const [modalData, setModalData] = useState({
        name: '',
        description: '',
        phone: '',
        email: '',
        country: '',
    });

    const apiUrl = "https://studious-garbanzo-g4xv5w4wq96whpg79-3001.app.github.dev";

    // Función para cargar los datos iniciales de la compañía
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`${apiUrl}/company/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCompanyData(data);
                    setModalData(data);
                } else {
                    console.error('Error al obtener los datos de la compañía');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchCompanyData();
    }, []);

    // Función para manejar cambios en los campos del modal
    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalData({
            ...modalData,
            [name]: value,
        });
    };

    // Función para manejar la apertura del modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    // Función para manejar el cierre del modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Función para enviar los datos actualizados al servidor
    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`${apiUrl}/company/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modalData),
            });

            if (response.ok) {
                console.log('Perfil actualizado exitosamente');
                setCompanyData(modalData);
                handleCloseModal();
            } else {
                console.error('Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const stripePromise = loadStripe("pk_test_51PsqIxG3cEcyZuNpill2BXWYLnqGWok6W48xAOpaOlq5BHME5440qc4FGMIzdoADAgiR77Q3VBP3tmrzLuVWmbOy00tZCSphPW");
    const { store } = useContext(Context);
    return (
        <div style={styles.pageContainer}>
            <div className="row" style={styles.row}>
                <div className="col-lg-9" style={styles.flexContainer}>
                    <div className="card mb-0" style={styles.profileCard}>
                        <div className="row no-gutters">
                            <div className="col-md-2" style={styles.profileColumn}>
                                <div style={styles.profileImageContainer}>
                                    <ProfileImage />
                                </div>
                            </div>

                            <div className="col-md-6" style={styles.centerColumn}>
                                <div style={styles.topLeftAligned}>
                                    <div style={styles.buttonEditContainer}>
                                        {/* Botón para abrir el modal */}
                                        <Button variant="primary" onClick={handleShowModal}>
                                            Editar Perfil
                                        </Button>
                                    </div>
                                    <div style={styles.companyDescriptionContainer}>
                                        <EditCompanyDescription description={companyData.description} />
                                    </div>
                                </div>
                                <div style={styles.contactContainer}>
                                    <EditCompanyPhone phone={companyData.phone} />
                                    <EditCompanyMail email={companyData.email} />
                                </div>

                            </div>

                            <div className="col-md-4" style={styles.rightColumn}>
                                <div style={styles.rightAlignedContainer}>
                                    <div style={styles.starsContainer}>
                                        <Stars />
                                    </div>
                                    <div style={styles.countrySelectorContainer}>
                                        <CountrySelector country={companyData.country} />
                                    </div>
                                    <div className="w-100 text-center">
                                        <h5>Suscripción actual:{!store.user?.profile_empleador.premium ? <button type="button" disabled className="p-1 mx-2 btn btn-outline-dark">Free</button> : <button type="button" disabled className="p-1 mx-2 btn btn-outline-success">Premium</button>}</h5>

                                        {!store.user?.profile_empleador.premium && (
                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Pasar la Suscripción a Premium
                                            </button>

                                        )}


                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Coste anual de la suscripción: 200€</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div >
                                                            <Elements stripe={stripePromise}>
                                                                {/* Load the checkout form */}
                                                                <CheckoutForm />
                                                            </Elements>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3" style={styles.flexContainer}>
                    <div className="card mb-0" style={styles.progressCard}>
                        <ProfileProgress />
                    </div>
                </div>
            </div>

            {/* Modal para editar datos de la compañía */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Datos de la Compañía</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Nombre de la Compañía</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={modalData.name}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompanyDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={modalData.description}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompanyPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={modalData.phone}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompanyEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={modalData.email}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCompanyCountry">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={modalData.country}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveProfile}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const styles = {
    pageContainer: {
        width: 'calc(100% - 10px)',
        height: '300px',
        margin: '5px',
        padding: '0',
        boxSizing: 'border-box',
    },
    row: {
        height: '100%',
        margin: '0',
        padding: '0',
        display: 'flex',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    profileColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0',
        padding: '0',
    },
    profileImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonEditContainer: {
        marginLeft: '30px',
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
    },
    topLeftAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '10px',
        marginBottom: '10px',
    },
    companyDescriptionContainer: {
        marginBottom: '10px',
        marginLeft: '30px',

    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '0',
    },
    rightAlignedContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    starsContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    countrySelectorContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    profileCard: {
        backgroundColor: '#bed5e2',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
    progressCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
};

export default CompanyProfile;
