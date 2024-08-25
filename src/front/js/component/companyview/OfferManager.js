import React, { useState } from 'react';
import OfferCard from './OfferCard';
import { Button, Modal, Form } from 'react-bootstrap';

const OfferManager = () => {
    const [offers, setOffers] = useState([]);
    const [offerCount, setOfferCount] = useState(0);
    const [selectedOfferIndex, setSelectedOfferIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        title: '',
        description: '',
        status: 'Activo',
        price: 100,
    });

    const createNewOffer = () => {
        const newOffer = {
            title: `Oferta ${offerCount + 1}`,
            description: `Descripción de la oferta ${offerCount + 1}`,
            status: 'Activo',
            price: 100,
        };
        setOffers([...offers, newOffer]);
        setOfferCount(offerCount + 1);
    };

    const handleOpenModal = (index = null) => {
        if (index !== null) {
            setModalData(offers[index]);
            setSelectedOfferIndex(index);
        } else {
            setModalData({
                title: '',
                description: '',
                status: 'Activo',
                price: 100,
            });
            setSelectedOfferIndex(null);
        }
        setShowModal(true);
    };

    const handleSaveOffer = () => {
        if (selectedOfferIndex !== null) {
            const updatedOffers = [...offers];
            updatedOffers[selectedOfferIndex] = modalData;
            setOffers(updatedOffers);
        } else {
            setOffers([...offers, modalData]);
            setOfferCount(offerCount + 1);
        }
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };

    return (
        <div className='container'>
            <div className="text-center mb-4">
                <Button variant="btn btn-secondary" onClick={() => handleOpenModal()}>
                    Crear nueva oferta
                </Button>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                {offers.map((offer, index) => (
                    <OfferCard
                        key={index}
                        title={offer.title}
                        description={offer.description}
                        status={offer.status}
                        price={offer.price}
                        onEdit={() => handleOpenModal(index)}
                    />
                ))}
            </div>

            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedOfferIndex !== null ? 'Editar Oferta' : 'Nueva Oferta'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={modalData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={modalData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="range"
                                name="price"
                                min="50"
                                max="500"
                                value={modalData.price}
                                onChange={handleChange}
                            />
                            <Form.Text>€ {modalData.price}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={modalData.status}
                                onChange={handleChange}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Cerrado">Cerrado</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveOffer}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OfferManager;
