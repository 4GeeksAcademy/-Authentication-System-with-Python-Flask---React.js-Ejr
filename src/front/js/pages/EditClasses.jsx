import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Row, Col, Button } from "react-bootstrap";


const EditClasses = () => {
    const { actions, store } = useContext(Context);
    const { classesToFilter, setClassesToFilter } = useState(store.classesData);
    const { id } = useParams()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        dateTime_class: "",
        start_time: "",
        duration_minutes: "",
        available_slots: ""

    });

    useEffect(() => {
        // Buscar la clase por ID y establecer el estado
        let foundClass = store.classesData.find((c) => c.id === parseInt(id));
        if (foundClass) {
            setFormData({
                name: foundClass.name || "",
                description: foundClass.description || "",
                dateTime_class: foundClass.dateTime_class || "",
                start_time: foundClass.start_time || "",
                duration_minutes: foundClass.duration_minutes || "",
                available_slots: foundClass.available_slots || ""
            });
        }
    }, [id, store.classesData]);

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    let navigate = useNavigate()
    const handleSubmit = async () => {
        //e.preventDefault();

        let response = await actions.updateEditForm(id, formData)
        if (response.success) {
            alert("el usuario se edito correctamente")
            navigate("/ClassesView")
        } else {
            alert("error al editar el usuario")
        }
    };

    const handleClose = () => {
        navigate("/ClassesView");
    };

    return (

        <div>Componente de Edicion de Clases de entrenamiento
            <h3>{store.currentEdit.name}</h3>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Nombre de la clase</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" name="name"
                                value={formData.name} onChange={handleChange}
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" name="description"
                                value={formData.description} onChange={handleChange}
                                required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">

                    <Col>
                        <Form.Group>
                            <Form.Label>Fecha y hora de inicio</Form.Label>
                            <Form.Control type="datetime-local" name="dateTime_class"
                                value={formData.dateTime_class} onChange={handleChange}
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Hora de inicio</Form.Label>
                            <Form.Control type="time" name="start_time"
                                value={formData.start_time} onChange={handleChange}
                                required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Duración (minutos)</Form.Label>
                            <Form.Control type="number" name="duration_minutes"
                                value={formData.duration_minutes} onChange={handleChange}
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Plazas disponibles</Form.Label>
                            <Form.Control type="number" name="available_slots"
                                value={formData.available_slots} onChange={handleChange}
                                required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-around mt-3">
                    <Col xs="auto">
                        <Button variant="primary" type="button" className="btn-secondary mx-2" onClick={handleSubmit}>Aceptar cambios</Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" type="button" className="btn-secondary mx-2" onClick={handleClose}>Volver</Button>
                    </Col>
                </Row>
            </Form>

        </div>
    )
}

export default EditClasses;
