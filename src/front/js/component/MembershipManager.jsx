import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import styles from "./MembershipManager.module.css";
import { Button, Form, Container, Row, Col, Modal, Table } from 'react-bootstrap';

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
    const [editingMembership, setEditingMembership] = useState(null);

    useEffect(() => {
        // Fetch memberships from the server and update the store
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = editingMembership
                ? await actions.editMembership(editingMembership.id, formData)
                : await actions.createMembership(formData);

            if (response.success) {
                setModalMessage(editingMembership ? "Membresía editada exitosamente" : "Membresía creada exitosamente");
            } else {
                setModalMessage(response.error || "Ocurrió un error desconocido");
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage(`Error al ${editingMembership ? 'editar' : 'crear'} la membresía: ${error.message}`);
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
        setEditingMembership(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalMessage("");
    };

    const handleEditMembership = (membership) => {
        setFormData({
            name: membership.name,
            description: membership.description,
            price: membership.price,
            duration_days: membership.duration_days,
            classes_per_month: membership.classes_per_month,
        });
        setEditingMembership(membership);
    };

    const handleDeleteMembership = async (membershipId) => {
        try {
            const response = await actions.deleteMembership(membershipId);
            if (response.success) {
                setModalMessage("Membresía eliminada exitosamente");
            } else {
                setModalMessage(response.error || "Ocurrió un error desconocido");
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage(`Error al eliminar la membresía: ${error.message}`);
            setShowModal(true);
        }
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
                    {editingMembership ? 'Editar Membresía' : 'Crear Membresía'}
                </Button>
            </Form>

            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Duración (días)</th>
                        <th>Clases/Mes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {store.memberships.map((membership) => (
                        <tr key={membership.id}>
                            <td>{membership.name}</td>
                            <td>{membership.description}</td>
                            <td>{membership.price}</td>
                            <td>{membership.duration_days}</td>
                            <td>{membership.classes_per_month}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditMembership(membership)}>
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteMembership(membership.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Membresia creada</Modal.Title>
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