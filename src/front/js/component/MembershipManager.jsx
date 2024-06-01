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
        actions.loadMemberships(); // Fetch memberships from the server and update the store
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
                setModalMessage(editingMembership ? "Membership edited successfully" : "Membership created successfully");
            } else {
                setModalMessage(response.error || "An unknown error occurred");
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage(`Error al ${editingMembership ? 'edit' : 'create'} membership: ${error.message}`);
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
                setModalMessage("Membership successfully deleted");
            } else {
                setModalMessage(response.error || "An unknown error occurred");
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage(`Error deleting membership: ${error.message}`);
            setShowModal(true);
        }
    };

    return (
        <Container className={styles.formContainer}>
            <h2 className={styles.title}>Membership Admin</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Duration in days</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Duration in days"
                                name="duration_days"
                                value={formData.duration_days}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Classes per month</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Classes per month"
                                name="classes_per_month"
                                value={formData.classes_per_month}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className={styles.button}>
                    {editingMembership ? 'Edit Membership' : 'Create Membership'}
                </Button>
            </Form>

            <div className="table-responsive">
                <Table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Duration (days)</th>
                            <th>Classes/Month</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.memberships.map((membership) => (
                            <tr key={membership.id} className={styles.tableRow}>
                                <td>{membership.name}</td>
                                <td>{membership.description}</td>
                                <td>{membership.price}</td>
                                <td>{membership.duration_days}</td>
                                <td>{membership.classes_per_month}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEditMembership(membership)}
                                        className={styles.editButton}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteMembership(membership.id)}
                                        className={styles.deleteButton}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <div className={styles.titlemodal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Membership Created</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Container>
    );
};

export default MembershipManager;
