import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

export const UserNameEdit = ({ increaseProgress }) => {
    const [UserName, setUserName] = useState('NOMBRE PROGRAMADOR'); 
    const [showModal, setShowModal] = useState(false); 
    const [newUserName, setNewUserName] = useState(UserName); 

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault(); 
        setUserName(newUserName); 
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
                <h1 className="mb-0">{UserName}</h1>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 25, height: 25, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit}  style={{width: '15px', height: '15px',}}/>
                </button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Nombre de Programador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onKeyDown={handleKeyDown} onSubmit={handleSave}>
                        <Form.Group controlId="formUserName">
                            <Form.Control
                                type="text"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
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
