import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

export const EditDescriptionUserAccordion = () => {
    const [descriptionUserAccordion, setDescriptionUserAccordion] = useState('Cuentanos lo mas importante de ti'); 
    const [showModal, setShowModal] = useState(false); 
    const [newDescriptionUserAccordion, setNewDescriptionUserAccordion] = useState(descriptionUserAccordion); 

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault(); 
        setDescriptionUserAccordion(newDescriptionUserAccordion); 
        handleClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSave(e);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center" style={{ color: 'white',fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', }}>
                <p className="mb-0">{descriptionUserAccordion}</p>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2 border-none"
                    style={{ width: 30, height: 30, backgroundColor: 'rgba(112, 135, 156, 1)' , boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cuentanos lo mas importante de tu carrera..!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onKeyDown={handleKeyDown} onSubmit={handleSave}>
                        <Form.Group controlId="formDescriptionUserAccordion">
                            <Form.Control
                                type="text"
                                value={newDescriptionUserAccordion}
                                onChange={(e) => setNewDescriptionUserAccordion(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button  type="submit" variant="secondary" onClick={handleSave} style={{  backgroundColor: 'rgba(103, 147, 174, 0.27)' , color: 'rgba(103, 147, 174, 1)' }}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
