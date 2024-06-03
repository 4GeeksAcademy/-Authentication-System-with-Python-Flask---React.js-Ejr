import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según tu estructura
import styles from "./CreateClasses.module.css"; // Ajusta la ruta según tu estructura
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap'; // Asumiendo que estás usando React-Bootstrap

const CreateClassForm = () => {
    const { actions, store } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        instructor_id: null, // Cambiado de "" a null para reflejar mejor un "no valor"
        dateTime_class: "",
        start_time: "",
        duration_minutes: "",
        available_slots: "",
        createBatch: false,
        endDate: ""
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [instructorModalVisible, setInstructorModalVisible] = useState(false);
    const [coaches, setCoaches] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = () => {
        setFormData({ ...formData, createBatch: !formData.createBatch });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = formData.createBatch && formData.endDate ? 
            await actions.createBatchClasses(formData) : 
            await actions.createTrainingClasses(formData);
        setModalMessage(result.success ? "Class(es) created successfully!" : result.error);
        setModalVisible(true);
        setFormData({
            name: "",
            description: "",
            instructor_id: null,
            dateTime_class: "",
            start_time: "",
            duration_minutes: "",
            available_slots: "",
            createBatch: false,
            endDate: ""
        });
    };

    const handleModalClose = () => {
        setModalVisible(false);
        actions.resetCreationTrainingClasses();
    };

    const handleInstructorSelectModal = () => {
        const filteredCoaches = store.users.filter(user => user.role === 'coach');
        setCoaches(filteredCoaches);
        setInstructorModalVisible(true);
    };

    const handleSelectInstructor = (id) => {
        setFormData({ ...formData, instructor_id: id });
        setInstructorModalVisible(false);
    };

    return (
        <>
            <Container className={styles.formContainer}>
                <h1 className={styles.titleComponent}>Create Training Classes</h1>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Class Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter class name" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description" name="description" value={formData.description} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Instructor</Form.Label>
                                <Button onClick={handleInstructorSelectModal}>Select Instructor</Button>
                                {formData.instructor_id && <div>Selected ID: {formData.instructor_id}</div>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Start Date and Time</Form.Label>
                                <Form.Control type="datetime-local" name="dateTime_class" value={formData.dateTime_class} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="time" name="start_time" value={formData.start_time} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Duration (Minutes)</Form.Label>
                                <Form.Control type="number" name="duration_minutes" value={formData.duration_minutes} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Available Slots</Form.Label>
                                <Form.Control type="number" name="available_slots" value={formData.available_slots} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={6}>
                            <Form.Check type="checkbox" label="Create Batch of Classes" checked={formData.createBatch} onChange={handleCheckboxChange} />
                        </Col>
                        {formData.createBatch && (
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        )}
                    </Row>
                    <Button variant="primary" type="submit">Create Class(es)</Button>
                </Form>
            </Container>
            <Modal show={modalVisible} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Class Creation Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
            </Modal>
            <Modal show={instructorModalVisible} onHide={() => setInstructorModalVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select an Instructor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {coaches.map((coach) => (
                        <div key={coach.id} onClick={() => handleSelectInstructor(coach.id)}>
                            <strong>{coach.name}</strong> (ID: {coach.id})
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateClassForm;
