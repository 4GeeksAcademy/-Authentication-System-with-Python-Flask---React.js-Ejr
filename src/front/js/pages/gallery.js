import React, { useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/gallery.css';
import ImageUpload from '../component/ImageUpload';

const Gallery = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageUpload, setShowImageUpload] = useState(false); 
  const [galleryData, setGalleryData] = useState([
    {
      id: 1,
      title: "Concierto Slipknot",
      image: 'https://cdn.midjourney.com/404707fc-1d26-4573-8890-99396329498f/0_2.png',
      description: "Un gran concierto de Slipknot con increíbles actuaciones y energía.",
      images: [
        'https://cdn.midjourney.com/404707fc-1d26-4573-8890-99396329498f/0_2.png',
        'https://cdn.midjourney.com/e5decda0-4dda-4397-863b-a64ffc411aea/0_3.png',
        'https://cdn.midjourney.com/e5decda0-4dda-4397-863b-a64ffc411aea/0_3.png',
        'https://cdn.midjourney.com/e5decda0-4dda-4397-863b-a64ffc411aea/0_3.png'
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
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setModalInfo(null);
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

  const filteredData = galleryData.find(item => item.id === modalInfo?.id);

  return (
    <div className="discover-container">
      <h1 className="title">Descubre Eventos</h1>
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
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{modalInfo?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filteredData && (
            <>
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
            </>
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
