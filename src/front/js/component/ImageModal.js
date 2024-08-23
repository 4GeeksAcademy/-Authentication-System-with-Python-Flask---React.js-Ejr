import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ImageModal = ({ show, handleClose, imageUrl, imageAlt }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  {filteredData && (
    <div className="custom-modal-body">
      <div className="custom-modal-main-image">
        <img
          src={filteredData.images[currentImageIndex]}
          alt={modalInfo?.title}
        />
      </div>
      <Row className="custom-modal-thumbnails">
        {filteredData.images.map((img, index) => (
          <Col key={index} className="custom-thumbnail-col">
            <img
              className={`custom-thumbnail-img ${index === currentImageIndex ? 'active' : ''}`}
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          </Col>
        ))}
      </Row>
      <div className="custom-modal-description">
        <h4>Descripción:</h4>
        <p>{filteredData.description}</p>
      </div>
    </div>
  )}
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
