import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

export const EditCompanyPhone = ({ increaseProgress }) => {
    const [companyPhone, setCompanyPhone] = useState('Numero de telefono');
    const [showModal, setShowModal] = useState(false);
    const [newPhone, setNewPhone] = useState(companyPhone);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = async (e) => {
        e.preventDefault(); // Asegúrate de que el formulario no se recargue

        try {
            const response = await fetch('https://studious-garbanzo-g4xv5w4wq96whpg79-3001.app.github.dev/updateCompanyPhone', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ phone: newPhone })
            });

            const data = await response.json();

            if (response.ok) {
                setCompanyPhone(newPhone); // Actualiza el teléfono mostrado
                increaseProgress(10); // Aumenta el progreso
                handleClose(); // Cierra el modal
            } else {
                console.error('Error al guardar el teléfono:', data.msg);
                alert(`Error: ${data.msg}`); // Muestra un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error de red: Por favor, inténtelo de nuevo más tarde.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave(e);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center" style={{
                color: 'Black', fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold', fontSize: '25px',
            }}>
                <p className="mb-0">
                    <FontAwesomeIcon
                        icon={faPhone}
                        style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}
                    />
                    {companyPhone}
                </p>

                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 25, height: 25, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} style={{ width: '15px', height: '15px' }} />
                </button>
            </div>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar el Teléfono de la Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onKeyDown={handleKeyDown} onSubmit={handleSave}>
                        <Form.Group controlId="formPhone">
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                                placeholder="Número de teléfono"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(103, 147, 174, 1)' }}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="secondary"
                        style={{ backgroundColor: 'rgba(103, 147, 174, 0.27)', color: 'rgba(103, 147, 174, 1)' }}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
