import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function ProfileImage({ increaseProgress }) { // Asegúrate de pasar increaseProgress como prop
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false); // Falta definir el estado showModal

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {  // Asegura que se seleccione un archivo
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      if (increaseProgress) {
        increaseProgress(10); // Asegúrate de que increaseProgress esté disponible
      }
    }
  };

  const handleSave = () => {
    if (!image) return; // Asegúrate de que se ha seleccionado una imagen antes de guardar

    setShowModal(false);
    const formData = new FormData();
    formData.append('image', image);

    // Send the image to your API
    fetch('/api/upload-profile-image', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="text-center">
      <div className="d-flex flex-column align-items-center mb-3">
        <img
          src={preview || "https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded"
          width="200"
          height="200"
        />
        <Button
          className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center mt-2"
          style={{ width: 30, height: 30, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Imagen de Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onKeyDown={handleKeyDown}>
            <Form.Group controlId="formFile">
              <Form.Control 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </Form.Group>
            {preview && (
              <div className="mt-3 text-center">
                <h5>Vista previa:</h5>
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-circle"
                  width="150"
                  height="150"
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} style={{ backgroundColor: 'rgba(103, 147, 174, 1)' }}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleSave} style={{ backgroundColor: 'rgba(103, 147, 174, 0.27)', color: 'rgba(103, 147, 174, 1)' }}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileImage;
