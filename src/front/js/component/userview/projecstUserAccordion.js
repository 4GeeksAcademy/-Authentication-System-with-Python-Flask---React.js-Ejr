import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../../store/appContext";
import { Modal, Button, Form } from 'react-bootstrap';

const projecstUserAccordion = () => {
    const { store, actions } = useContext(Context)
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        descripcion_corta: "",
        git: "",
        link: "",
        tecnologias: ""
    })

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        actions.addProjects(formData, store.token)
        setFormData("")
        handleClose();
    };

    const handleonChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className="d-flex align-items-center flex-wrap">
                <p className="mb-0" style={{
                    color: 'black', fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                }}>Agregar Proyecto</p>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2 border-none"
                    style={{ width: 30, height: 30, backgroundColor: 'rgba(112, 135, 156, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Nombre del proyecto</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nombre del proyecto"
                                value={formData.name}
                                onChange={handleonChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Descripción corta</Form.Label>
                            <Form.Control
                                type="text"
                                name="descripcion_corta"
                                placeholder="Descripción corta"
                                value={formData.descripcion_corta}
                                onChange={handleonChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProjects">
                            <Form.Label>Git</Form.Label>
                            <Form.Control
                                type="text"
                                name="git"
                                placeholder="Git"
                                value={formData.git}
                                onChange={handleonChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProjects">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                name="link"
                                placeholder="Link"
                                value={formData.link}
                                onChange={handleonChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProjects">
                            <Form.Label>Tecnologias</Form.Label>
                            <Form.Control
                                type="text"
                                name='tecnologias'
                                placeholder="Tecnologias"
                                value={formData.tecnologias}
                                onChange={handleonChange}
                            />
                        </Form.Group>




                        <Button variant="primary" type="submit">
                            Añadir
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex flex-wrap" >
                {store.proyectos?.map((proyecto) => (
                    <div key={proyecto.id} className="card m-2" style={{ width: '18rem', backgroundColor: '#D9D9D9' }}>

                        <div className="card-body" >
                            <h5 className="card-title">{proyecto.name}</h5>
                            <p className="card-text">
                                <strong>Descripción corta:</strong> {proyecto.descripcion_corta}<br />
                                <strong>Git:</strong> {proyecto.git}<br />
                                <strong>Link:</strong> {proyecto.link}<br />
                                <strong>Tecnologias:</strong> {proyecto.tecnologias}
                            </p>

                        </div>
                    </div>
                ))}


            </div>
        </>
    );
};


export default projecstUserAccordion