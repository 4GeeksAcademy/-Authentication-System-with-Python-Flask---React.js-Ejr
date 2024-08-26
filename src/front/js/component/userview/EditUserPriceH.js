import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

export const EditUserPrice = ({ increaseProgress }) => {
    const [userPrice, setUserPrice] = useState(50); 
    const [showModal, setShowModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('EUR');
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        handleClose();
        increaseProgress(10); 
    };

    
    const handleRangeChange = (e) => {
        setUserPrice(e.target.value);
    };

    
    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    return (
        <>
            <div className="d-flex align-items-center" style={{ color: 'Black', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
            <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 25, height: 25, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginRight: '10px' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit}  style={{width: '15px', height: '15px',}}/>
                </button>
                <div>
                    <p className="mb-0">Precio/Hora</p> 
                    <p className="mb-0">{`${userPrice} ${selectedCurrency}`}</p> 
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Precio / Hora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formUserPrice">
                            <Form.Label>Selecciona el precio por hora</Form.Label>
                            <Form.Range
                                min="10"
                                max="500"
                                step="5"
                                value={userPrice}
                                onChange={handleRangeChange}
                            />
                            <Form.Text>{`Precio Seleccionado: ${userPrice} ${selectedCurrency}`}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formCurrencySelect" className="mt-4">
                            <Form.Label>Selecciona la moneda</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCurrency}
                                onChange={handleCurrencyChange}
                            >
                                <option value="EUR">EUR - Euro</option>
                                <option value="USD">USD - Dólar</option>
                                <option value="GBP">GBP - Libra esterlina</option>
                                <option value="JPY">JPY - Yen japonés</option>
                                <option value="CNY">CNY - Yuan chino</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(103, 147, 174, 1)' }}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="secondary" onClick={handleSave} style={{ backgroundColor: 'rgba(103, 147, 174, 0.27)', color: 'rgba(103, 147, 174, 1)' }}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
