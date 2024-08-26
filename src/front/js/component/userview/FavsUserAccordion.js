import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import Select from 'react-select'; 

const projectOptions = [
    { value: 'project1', label: 'Proyecto 1' },
    { value: 'project2', label: 'Proyecto 2' },
    { value: 'project3', label: 'Proyecto 3' },
];

export const EditFavoritesUserAccordion = () => {
    const [favorites, setFavorites] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedProject) {
            setFavorites((prev) => [...prev, selectedProject]);
            setSelectedProject(null); 
        }
        handleClose();
    };

    const handleProjectChange = (selectedOption) => {
        setSelectedProject(selectedOption);
    };

    return (
        <>
            <div className="d-flex flex-column align-items-start" style={{ color: 'black',fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', }}>
                <p className="mb-0" style={{  color: 'black',fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', }}>Favoritos</p>
                <ListGroup>
                    {favorites.map((fav, index) => (
                        <ListGroup.Item key={index}>
                            {fav.label}
                            <FontAwesomeIcon icon={faStar} style={{ color: 'gold', marginLeft: '10px' }} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center mt-2 border-none"
                    style={{ width: 30, height: 30, backgroundColor: 'rgba(112, 135, 156, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona un proyecto para agregar a favoritos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formProjectSelector">
                            <Select
                                value={selectedProject}
                                onChange={handleProjectChange}
                                options={projectOptions}
                                placeholder="Selecciona un proyecto..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
