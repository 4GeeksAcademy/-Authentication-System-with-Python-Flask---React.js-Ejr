import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import styles from "./MembershipManager.module.css";
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';

const MembershipManager = () => {
    const { actions, store } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration_days: "",
        classes_per_month: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.createMembership(formData);
            if (response.success) {
                setModalMessage("Membresía creada exitosamente");
            } else {
                setModalMessage(response.error || "Ocurrió un error desconocido");
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage(`Error al crear la membresía: ${error.message}`);
            setShowModal(true);
        }
        // Resetear el formulario después de enviar
        setFormData({
            name: "",
            description: "",
            price: "",
            duration_days: "",
            classes_per_month: "",
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalMessage("");
    };

    return (
        <Container className={styles.formContainer}>
            <h2>Administrar Membresías</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Nombre de la membresía</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" name="description" value={formData.description} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" placeholder="Precio" name="price" value={formData.price} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Duración en días</Form.Label>
                            <Form.Control type="number" placeholder="Duración en días" name="duration_days" value={formData.duration_days} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Clases por mes</Form.Label>
                            <Form.Control type="number" placeholder="Clases por mes" name="classes_per_month" value={formData.classes_per_month} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Crear Membresía
                </Button>
            </Form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Estado de la creación</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MembershipManager;