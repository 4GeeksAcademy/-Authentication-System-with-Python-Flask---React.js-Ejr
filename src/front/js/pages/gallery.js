import React, { useState } from 'react';
import { Modal, Row, Col, Button, Form } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/gallery.css';
import ImageUpload from '../component/ImageUpload';

const Gallery = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // Estado para habilitar edición
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImages, setEditImages] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [galleryData, setGalleryData] = useState([
    {
      id: 1,
      title: "Concierto Slipknot",
      image: 'https://cdn.midjourney.com/404707fc-1d26-4573-8890-99396329498f/0_2.png',
      description: "Una noche inolvidable con Slipknot: El pasado 15 de julio de 2023, a las 8:00 PM, más de 50,000 fanáticos se reunieron en el legendario estadio O2 Arena para presenciar uno de los conciertos más épicos del año. Con una energía desbordante y actuaciones que llevaron la adrenalina al máximo, Slipknot hizo vibrar cada rincón del recinto...",
      images: [
        'https://cdn.midjourney.com/404707fc-1d26-4573-8890-99396329498f/0_2.png',
        'https://cdn.midjourney.com/e5decda0-4dda-4397-863b-a64ffc411aea/0_3.png',
        'https://cdn.midjourney.com/e46d9f62-119b-4a1c-8b0b-f60119774077/0_0.png',
        'https://cdn.midjourney.com/e46d9f62-119b-4a1c-8b0b-f60119774077/0_2.png'
      ],
      category: "Rock",
    },
    {
      id: 2,
      title: "BCN FEST",
      image: 'https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_2.png',
      description: "Festival en Barcelona con una alineación impresionante de artistas.",
      images: [
        'https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_2.png',
        'https://cdn.midjourney.com/0e37b0f3-9d79-4e8a-a7e1-0608b9d2f55d/0_1.png'
      ],
      category: "Festival",
    },
    {
      id: 3,
      title: "MAD FEST",
      image: 'https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_0.png',
      description: "Festival en Madrid que reúne a los mejores artistas de la música.",
      images: [
        'https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_0.png',
        'https://cdn.midjourney.com/75d95f87-6b29-42d7-b8d4-8b8a74b93a8d/0_1.png'
      ],
      category: "Festival",
    },
    {
      id: 4,
      title: "GAL FEST",
      image: 'https://cdn.midjourney.com/c968799a-87ff-4f82-9472-08de96af2bd1/0_2.png',
      description: "Festival con grandes bandas y una atmósfera fantástica.",
      images: [
        'https://cdn.midjourney.com/c968799a-87ff-4f82-9472-08de96af2bd1/0_2.png',
        'https://cdn.midjourney.com/8b8c20d0-c7e3-4e3e-bf47-7a6d2c29dbf4/0_1.png'
      ],
      category: "Festival",
    },
    {
      id: 5,
      title: "BEACH FEST",
      image: 'https://cdn.midjourney.com/0f2d329c-6e2d-433d-9f72-e1bbccaa08a4/0_3.png',
      description: "Festival en la playa con música en vivo y vistas impresionantes.",
      images: [
        'https://cdn.midjourney.com/0f2d329c-6e2d-433d-9f72-e1bbccaa08a4/0_3.png',
        'https://cdn.midjourney.com/1f64a5a4-c23d-452e-9006-e8ec6c6b93b5/0_2.png'
      ],
      category: "Festival",
    },
    {
      id: 6,
      title: "ACDC",
      image: 'https://cdn.midjourney.com/6b5fa8f6-7f00-47fa-bc04-3131bf09cc25/0_1.png',
      description: "Concierto de ACDC con su legendaria energía y éxitos clásicos.",
      images: [
        'https://cdn.midjourney.com/6b5fa8f6-7f00-47fa-bc04-3131bf09cc25/0_1.png',
        'https://cdn.midjourney.com/2c7f54b3-0c1f-4e04-a2e2-bd5a9c6d35d5/0_2.png'
      ],
      category: "Rock",
    }
  ]);


  const handleShow = (item) => {
    setModalInfo(item);
    setCurrentImageIndex(0);
    setEditTitle(item.title); // Inicializar el título para editar
    setEditDescription(item.description); // Inicializar la descripción para editar
    setEditImages(item.images); // Inicializar las imágenes para editar
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setModalInfo(null);
    setIsEditing(false); // Cerrar el modo de edición al cerrar el modal
  };

  const handleAddImageClick = () => {
    setShowImageUpload(true);
  };

  const handleSaveImage = (newImage) => {
    setGalleryData([
      ...galleryData,
      {
        id: galleryData.length + 1,
        title: newImage.title,
        image: newImage.image,
        description: newImage.description,
        images: [newImage.image],
        category: "Nuevo"
      }
    ]);
  };

  const handleCloseImageUpload = () => {
    setShowImageUpload(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Actualizar los datos de la galería con los valores editados
    const updatedData = galleryData.map(item =>
      item.id === modalInfo.id
        ? { ...item, title: editTitle, description: editDescription, images: editImages }
        : item
    );
    setGalleryData(updatedData);
    setIsEditing(false); // Desactivar modo de edición después de guardar
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Restaurar los valores originales
    setEditTitle(modalInfo.title);
    setEditDescription(modalInfo.description);
    setEditImages(modalInfo.images);
  };

  const handleImageDelete = (index) => {
    const updatedImages = editImages.filter((_, i) => i !== index);
    setEditImages(updatedImages);
  };

  const filteredData = galleryData.find(item => item.id === modalInfo?.id);

  return (
    <div className="discover-container">
      <h1 className="title">Galeria de imagenes</h1>
      <div className="gallery">
        <div className="gallery-grid">
          {galleryData.map((event) => (
            <div key={event.id} className="gallery-item" onClick={() => handleShow(event)}>
              <img
                src={event.image}
                alt={event.title}
                className="gallery-item-image"
              />
              <div className="gallery-item-overlay">
                <h2>{event.title}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="add-post-wrapper">
          <div className="add-post-button" onClick={handleAddImageClick}>
            <span className="add-post-tooltip">Añadir Imágenes</span>
            +
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        centered
        dialogClassName="gallery-modal"
      >
        <Modal.Header closeButton className="custom-modal-header">
          {isEditing ? (
            <Form.Control
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="custom-modal-title-edit"
            />
          ) : (
            <Modal.Title>{modalInfo?.title}</Modal.Title>
          )}
          {!isEditing && (
            <PencilSquare
              className="edit-icon custom-spacing"
              size={20}
              onClick={handleEditClick}
              style={{ cursor: 'pointer', marginLeft: 'auto' }}
            />
          )}
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
                {editImages.map((img, index) => (
                  <Col key={index} className="custom-thumbnail-col">
                    <img
                      className={`custom-thumbnail-img ${index === currentImageIndex ? 'active' : ''}`}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                    {isEditing && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleImageDelete(index)}
                        className="delete-image-button"
                      >
                        Borrar
                      </Button>
                    )}
                  </Col>
                ))}
              </Row>
              <div className="custom-modal-description">
                <h4>Descripción:</h4>
                {isEditing ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="custom-modal-description-edit"
                  />
                ) : (
                  <p>{filteredData.description}</p>
                )}
              </div>
              {isEditing && (
                <div className="edit-buttons">
                  <Button variant="primary" onClick={handleSaveEdit}>
                    Guardar
                  </Button>
                  <Button variant="secondary" onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
      <ImageUpload
        show={showImageUpload}
        handleClose={handleCloseImageUpload}
        handleSave={handleSaveImage}
      />
    </div>
  );
};

export default Gallery;
