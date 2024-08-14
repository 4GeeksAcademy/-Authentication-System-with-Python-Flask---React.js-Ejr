import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ImageModal = ({ show, handleClose, imageUrl, imageAlt }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={imageUrl} alt={imageAlt} style={{ width: '100%' }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
