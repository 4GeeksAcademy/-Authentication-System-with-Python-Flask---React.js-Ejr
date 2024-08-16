import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/gallery.css";

const Gallery = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const data = [
    {
      titulo: 'Concierto Slipknot',
      id: 1,
      description: 'Un gran concierto de Slipknot con increíbles actuaciones y energía.',
      images: [
        'https://cdn.midjourney.com/404707fc-1d26-4573-8890-99396329498f/0_2.png',
        'https://cdn.midjourney.com/e5decda0-4dda-4397-863b-a64ffc411aea/0_3.png',
        'https://cdn.midjourney.com/e5decda0-4dda-4397-863b-a64ffc411aea/0_3.png',
        'https://cdn.midjourney.com/e5decda0-4dda-4397-863b-a64ffc411aea/0_3.png'
      ]
    },
    {
      titulo: 'BCN FEST',
      id: 2,
      description: 'Festival en Barcelona con una alineación impresionante de artistas.',
      images: [
        'https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_2.png',
        'https://cdn.midjourney.com/0e37b0f3-9d79-4e8a-a7e1-0608b9d2f55d/0_1.png'
      ]
    },
    {
      titulo: 'MAD FEST',
      id: 3,
      description: 'Festival en Madrid que reúne a los mejores artistas de la música.',
      images: [
        'https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_0.png',
        'https://cdn.midjourney.com/75d95f87-6b29-42d7-b8d4-8b8a74b93a8d/0_1.png'
      ]
    },
    {
      titulo: 'GAL FEST',
      id: 4,
      description: 'Festival con grandes bandas y una atmósfera fantástica.',
      images: [
        'https://cdn.midjourney.com/c968799a-87ff-4f82-9472-08de96af2bd1/0_2.png',
        'https://cdn.midjourney.com/8b8c20d0-c7e3-4e3e-bf47-7a6d2c29dbf4/0_1.png'
      ]
    },
    {
      titulo: 'BEACH FEST',
      id: 5,
      description: 'Festival en la playa con música en vivo y vistas impresionantes.',
      images: [
        'https://cdn.midjourney.com/0f2d329c-6e2d-433d-9f72-e1bbccaa08a4/0_3.png',
        'https://cdn.midjourney.com/1f64a5a4-c23d-452e-9006-e8ec6c6b93b5/0_2.png'
      ]
    },
    {
      titulo: 'ACDC',
      id: 6,
      description: 'Concierto de ACDC con su legendaria energía y éxitos clásicos.',
      images: [
        'https://cdn.midjourney.com/6b5fa8f6-7f00-47fa-bc04-3131bf09cc25/0_1.png',
        'https://cdn.midjourney.com/2c7f54b3-0c1f-4e04-a2e2-bd5a9c6d35d5/0_2.png'
      ]
    }
  ];

  const handleShow = (item) => {
    setModalInfo(item);
    setCurrentImageIndex(0);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setModalInfo(null);
  };

  const filteredData = data.find(item => item.id === modalInfo?.id);

  return (
    <div className="gallery-container">
      {data.map(el => (
        <div
          className="gallery-item"
          key={el.id}
          onClick={() => handleShow(el)}
          style={{ backgroundImage: `url(${el.images[0]})` }}
        >
          <div className="gallery-item-overlay">
            <h3 className="gallery-item-title">{el.titulo}</h3>
          </div>
        </div>
      ))}

      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{modalInfo?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filteredData && (
            <>
              <div className="modal-main-image">
                <img
                  src={filteredData.images[currentImageIndex]}
                  alt={modalInfo?.titulo}
                />
              </div>
              <Row className="modal-thumbnails">
                {filteredData.images.map((img, index) => (
                  <Col key={index} className="thumbnail-col">
                    <img
                      className={`thumbnail-img ${index === currentImageIndex ? 'active' : ''}`}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  </Col>
                ))}
              </Row>
              <div className="modal-description">
                <h4>Descripción:</h4>
                <p>{filteredData.description}</p>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;
