import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

export const ButtonEdit = ({ increaseProgress }) => {
    const [companyName, setCompanyName] = useState('NOMBRE EMPRESA'); 
    const [showModal, setShowModal] = useState(false); 
    const [newName, setNewName] = useState(companyName); 

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault(); 
        setCompanyName(newName); 
        handleClose();
        increaseProgress(10);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSave(e);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center" style={{ color: 'white' }}>
                <h2 className="mb-0">{companyName}</h2>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 30, height: 30, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Nombre de Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onKeyDown={handleKeyDown} onSubmit={handleSave}>
                        <Form.Group controlId="formCompanyName">
                            <Form.Control
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{  backgroundColor: 'rgba(103, 147, 174, 1)' }}>
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
