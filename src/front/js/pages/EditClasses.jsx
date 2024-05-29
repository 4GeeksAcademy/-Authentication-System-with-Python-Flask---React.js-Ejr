import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Row, Col, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import styles from './EditClasses.module.css';

const EditClasses = ({ classData, onClose }) => {
    const { actions, store } = useContext(Context);
    const { id } = classData;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        dateTime_class: "",
        start_time: "",
        duration_minutes: "",
        available_slots: ""
    });

    useEffect(() => {
        if (classData) {
            setFormData({
                name: classData.name || "",
                description: classData.description || "",
                dateTime_class: classData.dateTime_class || "",
                start_time: classData.start_time || "",
                duration_minutes: classData.duration_minutes || "",
                available_slots: classData.available_slots || ""
            });
        }
    }, [classData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        let response = await actions.updateEditForm(id, formData);
        if (response.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Tus cambios se han guardado",
                showConfirmButton: false,
                timer: 1500
            });
            onClose();
        } else {
            alert("error al editar la clase");
        }
    };

    const handleCancel = async () => {
        await actions.cancelClass(id);
        onClose();
    };

    return (
        <div className={`container ${styles.editClassesContainer}`}>
            <h3 className={styles.title}>{classData.name}</h3>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Nombre de la clase</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
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
                            <Form.Label className={styles.label}>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Descripción"
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
                            <Form.Label className={styles.label}>Fecha y hora de inicio</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dateTime_class"
                                value={formData.dateTime_class}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Hora de inicio</Form.Label>
                            <Form.Control
                                type="time"
                                name="start_time"
                                value={formData.start_time}
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
                            <Form.Label className={styles.label}>Duración (minutos)</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration_minutes"
                                value={formData.duration_minutes}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className={styles.label}>Plazas disponibles</Form.Label>
                            <Form.Control
                                type="number"
                                name="available_slots"
                                value={formData.available_slots}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-around mt-3">
                    <Col xs="auto">
                        <Button variant="primary" type="button" onClick={handleSubmit} className={`btn-secondary mx-2 ${styles.button}`}>
                            Aceptar cambios
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="danger" type="button" onClick={handleCancel} className={`mx-2 ${styles.button}`}>
                            Cancelar Clase
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="secondary" type="button" onClick={onClose} className={`mx-2 ${styles.button}`}>
                            Volver
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default EditClasses;
