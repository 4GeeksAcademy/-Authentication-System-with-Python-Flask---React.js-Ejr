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
      title: "Blue concert",
      image: 'https://cdn.midjourney.com/fff3abed-c89b-427d-ae36-7fb4e705490f/0_1.png',
      description: "Un espectacular concierto al aire libre al atardecer, donde el escenario se ilumina con suaves luces LED azules, mientras una multitud emocionada vitorea y disfruta de la música. Los músicos se presentan en un escenario vibrante, con un cielo que poco a poco se transforma en la noche. La atmósfera está llena de energía y serenidad al mismo tiempo, mientras las luces azules bañan tanto a los artistas como al público. Un evento inolvidable que combina la magia de la música con la tranquilidad del color azul, creando una experiencia visual y sonora impresionante.",
      images: [
        'https://cdn.midjourney.com/46efa8be-0b19-4ed7-9467-566b69d6d98a/0_0.png',
        'https://cdn.midjourney.com/46efa8be-0b19-4ed7-9467-566b69d6d98a/0_2.png',
        'https://cdn.midjourney.com/fde800ac-6a44-46fa-ab78-65226e2dd805/0_2.png',
        'https://cdn.midjourney.com/fff3abed-c89b-427d-ae36-7fb4e705490f/0_2.png'
      ],
      category: "Rock",
    },
    {
      id: 2,
      title: "Urban Beats Festival",
      image: 'https://cdn.midjourney.com/86edc8f0-1010-49fb-9850-7cf971c44a08/0_2.png',
      description: "El Urban Beats Festival tuvo lugar el pasado 12 de agosto de 2023 a las 7:00 PM en el Estadio Olímpico de Ciudad del Sol. Este evento reunió a los mejores artistas de hip hop tanto de la escena local como internacional. La energía del público fue inigualable, con ritmos vibrantes que resonaron por todo el estadio, creando una atmósfera electrizante.",
      images: [
        'https://cdn.midjourney.com/c4e035a6-7ad4-49e5-8f90-4e6a7c727291/0_1.png',
        'https://cdn.midjourney.com/e930f2c4-4c72-4553-9176-8bd77eee7b3c/0_2.png',
        'https://cdn.midjourney.com/e930f2c4-4c72-4553-9176-8bd77eee7b3c/0_0.png',
        'https://cdn.midjourney.com/e930f2c4-4c72-4553-9176-8bd77eee7b3c/0_3.png'
      ],
      category: "Festival",
    },
    {
      id: 3,
      title: "Rap Battles Championship",
      image: 'https://cdn.midjourney.com/b185a4f2-ef78-4f29-8720-e5755618a346/0_2.png',
      description: "El Rap Battles Championship se celebró el 5 de septiembre de 2023 a las 8:00 PM en el Club UnderGround de Ciudad Nueva. Fue una competencia feroz, donde los mejores MCs del país se enfrentaron en duelos de freestyle. Los asistentes disfrutaron de una noche intensa llena de rimas afiladas y creatividad.",
      images: [
        'https://cdn.midjourney.com/b185a4f2-ef78-4f29-8720-e5755618a346/0_0.png',
        'https://cdn.midjourney.com/9ace1c4b-4b70-446e-b0cc-5cbe9eae26d4/0_3.png',
        'https://cdn.midjourney.com/e527d6a2-6d1b-4449-9181-3958df2e2dd1/0_3.png',
        'https://cdn.midjourney.com/06ca967e-7541-4ae8-9d67-56a66a61175d/0_3.png'
      ],
      category: "Festival",
    },
    
    {
      id: 4,
      title: "Teatro en el Parque",
      image: 'https://cdn.midjourney.com/0888cf50-b4c7-4ca3-8701-5786b333d7f5/0_3.png',
      description: "El Teatro en el Parque tuvo lugar el pasado 20 de julio de 2023 a las 5:00 PM en el Parque Central de Ciudad Jardín. Familias enteras disfrutaron de una tarde cultural al aire libre, donde actores locales presentaron una obra clásica bajo la luz del atardecer.",
      images: [
        'https://cdn.midjourney.com/c0cca0ce-2904-448e-aaf3-557f98241b4a/0_2.png',
        'https://cdn.midjourney.com/9168ca04-c252-4b9c-86ef-9e8ff083721d/0_3.png',
        'https://cdn.midjourney.com/9168ca04-c252-4b9c-86ef-9e8ff083721d/0_2.png',
        'https://cdn.midjourney.com/fef0eb7a-0ca3-4de2-8146-4c6cc8b4ffd9/0_1.png'
      ],
      category: "Festival",
    },
    {
      id: 5,
      title: "Noche de Shakespeare",
      image: 'https://cdn.midjourney.com/7d8aa301-f167-45b9-a8d0-fb370ca3cc1e/0_3.png',
      description: "La Noche de Shakespeare se celebró el 10 de agosto de 2023 a las 8:00 PM en el Teatro Clásico de Ciudad Vieja. Los asistentes vivieron una velada dedicada a las obras más famosas del dramaturgo inglés, con interpretaciones magistrales y una atmósfera teatral única.",
      images: [
        'https://cdn.midjourney.com/7d8aa301-f167-45b9-a8d0-fb370ca3cc1e/0_2.png',
        'https://cdn.midjourney.com/7d8aa301-f167-45b9-a8d0-fb370ca3cc1e/0_1.png',
        'https://cdn.midjourney.com/7d8aa301-f167-45b9-a8d0-fb370ca3cc1e/0_0.png',
        'https://cdn.midjourney.com/5a04f9dc-036a-4463-b35e-461dc9adc037/0_3.png'
      ],
      category: "Rock",
    },
    {
      id: 6,
      title: "Musical Broadway",
      image: 'https://cdn.midjourney.com/04b98b50-eb61-486b-b4e4-365fba608b38/0_0.png',
      description: "El Musical Broadway se presentó el 18 de septiembre de 2023 a las 9:00 PM en el Gran Teatro Metropolitano. El espectáculo ofreció una noche mágica llena de música y baile, transportando al público a la esencia de los grandes musicales de Nueva York.",
      images: [
        'https://cdn.midjourney.com/a064bd14-ab1f-4a7e-86fd-323d2c3548d8/0_3.png',
        'https://cdn.midjourney.com/a064bd14-ab1f-4a7e-86fd-323d2c3548d8/0_2.png',
        'https://cdn.midjourney.com/a064bd14-ab1f-4a7e-86fd-323d2c3548d8/0_0.png',
        'https://cdn.midjourney.com/04b98b50-eb61-486b-b4e4-365fba608b38/0_2.png'
      ],
      category: "Rock",
    },
    {
      id: 7,
      title: "Noche de Salsa",
      image: 'https://cdn.midjourney.com/09bbe124-be57-479e-b9aa-8ac77c22afb2/0_3.png',
      description: "La Noche de Salsa tuvo lugar el 25 de agosto de 2023 a las 10:00 PM en el Club Caribeño de Ciudad del Sol. Los asistentes disfrutaron de una noche llena de música latina, donde las parejas se dejaron llevar por los ritmos calientes de la salsa en una pista de baile vibrante.",
      images: [
        'https://cdn.midjourney.com/f3f84bca-79e0-4697-8682-b2feb66409c6/0_0.png',
        'https://cdn.midjourney.com/f3f84bca-79e0-4697-8682-b2feb66409c6/0_1.png',
        'https://cdn.midjourney.com/883e902e-3357-4ef5-b6c6-514c5b0fd3e1/0_3.png',
        'https://cdn.midjourney.com/883e902e-3357-4ef5-b6c6-514c5b0fd3e1/0_2.png'
      ],
      category: "Rock",
    },
    {
      id: 8,
      title: "Salsa en la Playa",
      image: 'https://cdn.midjourney.com/eb19d794-a3d5-4b37-aeeb-13b7e19e26fd/0_0.png',
      description: "El evento Salsa en la Playa tuvo lugar el 15 de julio de 2023 a las 6:00 PM en Playa Paraíso. Los asistentes disfrutaron de una tarde caribeña perfecta, bailando salsa con los pies en la arena mientras el sol se ocultaba en el horizonte.",
      images: [
        'https://cdn.midjourney.com/eb19d794-a3d5-4b37-aeeb-13b7e19e26fd/0_3.png',
        'https://cdn.midjourney.com/fb51a687-be3b-4185-b02e-84e8d57508cf/0_2.png',
        'https://cdn.midjourney.com/fb51a687-be3b-4185-b02e-84e8d57508cf/0_1.png',
        'https://cdn.midjourney.com/fb51a687-be3b-4185-b02e-84e8d57508cf/0_0.png'
      ],
      category: "Rock",
    },
    {
      id: 9,
      title: "Competencia de Salsa",
      image: 'https://cdn.midjourney.com/3017cac9-fb6b-4cb8-8ef5-d4a9bc73d89b/0_2.png',
      description: "La Competencia de Salsa tuvo lugar el 1 de septiembre de 2023 a las 8:00 PM en el Centro de Convenciones Caribeño. Las mejores parejas de baile compitieron por el título de campeones, mostrando su destreza y pasión en la pista de baile.",
      images: [
        'https://cdn.midjourney.com/3017cac9-fb6b-4cb8-8ef5-d4a9bc73d89b/0_1.png',
        'https://cdn.midjourney.com/3017cac9-fb6b-4cb8-8ef5-d4a9bc73d89b/0_0.png',
        'https://cdn.midjourney.com/889083da-7080-4630-a373-c8cfd85ac953/0_0.png',
        'https://cdn.midjourney.com/3017cac9-fb6b-4cb8-8ef5-d4a9bc73d89b/0_3.png'
      ],
      category: "Rock",
    },
    {
      id: 10,
      title: "Festival de Jazz",
      image: 'https://cdn.midjourney.com/d3a5e95f-bc00-4846-b13d-d24fb3d2d2df/0_3.png',
      description: "El Festival de Jazz se celebró el 22 de julio de 2023 a las 7:00 PM en el Parque del Jazz de Ciudad Armonía. Los mejores músicos de la escena jazzística se reunieron para ofrecer una noche inolvidable de melodías suaves y ritmos sincopados.",
      images: [
        'https://cdn.midjourney.com/d3a5e95f-bc00-4846-b13d-d24fb3d2d2df/0_2.png',
        'https://cdn.midjourney.com/d3a5e95f-bc00-4846-b13d-d24fb3d2d2df/0_1.png',
        'https://cdn.midjourney.com/d3a5e95f-bc00-4846-b13d-d24fb3d2d2df/0_0.png',
        'https://cdn.midjourney.com/72d1d8d2-4632-401c-b49b-3e8944fdd522/0_1.png',
      ],
      category: "Rock",
    },
    {
      id: 11,
      title: "Jazz en el Sótano",
      image: 'https://cdn.midjourney.com/e7b70b6c-2356-44d3-ae2c-f282e2783b3c/0_3.png',
      description: "Jazz en el Sótano se llevó a cabo el 5 de agosto de 2023 a las 9:00 PM en el Club Subterráneo de Ciudad Escondida. Este evento íntimo ofreció una experiencia auténtica de jazz en un ambiente acogedor y exclusivo, donde los sonidos del saxofón resonaban en cada rincón.",
      images: [
        'https://cdn.midjourney.com/e7b70b6c-2356-44d3-ae2c-f282e2783b3c/0_1.png',
        'https://cdn.midjourney.com/e7b70b6c-2356-44d3-ae2c-f282e2783b3c/0_0.png',
        'https://cdn.midjourney.com/7a4a8806-c838-4a26-8728-cae2b175df80/0_3.png',
        'https://cdn.midjourney.com/8a587d58-e611-4876-9ca9-946befa301ed/0_2.png'
      ],
      category: "Rock",
    },
    {
      id: 12,
      title: "Big Band Night",
      image: 'https://cdn.midjourney.com/05bbfeee-d1ce-4582-b8ec-a8a870a16a96/0_2.png',
      description: "La Big Band Night tuvo lugar el 28 de agosto de 2023 a las 8:00 PM en el Gran Salón del Club de Ciudad Dorada. Los asistentes revivieron la era dorada del swing con una gran orquesta que llenó la noche de música y baile.",
      images: [
        'https://cdn.midjourney.com/b5e5b8ef-fcdb-4020-a8de-8a50a47fae5b/0_3.png',
        'https://cdn.midjourney.com/8d187a48-d078-45c0-8122-c34573f6a7c0/0_2.png',
        'https://cdn.midjourney.com/b5e5b8ef-fcdb-4020-a8de-8a50a47fae5b/0_0.png',
        'https://cdn.midjourney.com/22af843e-6924-4b90-ac0f-dba7eb9351fe/0_2.png'
      ],
      category: "Rock",
    },
    {
      id: 13,
      title: "Concierto de Rock",
      image: 'https://cdn.midjourney.com/fb076ee8-e323-4661-b798-d00c401f6b1d/0_3.png',
      description: "El Concierto de Rock tuvo lugar el 12 de agosto de 2023 a las 8:00 PM en el Arena Rock de Ciudad Nova. Las bandas más populares del momento ofrecieron un espectáculo cargado de energía, donde el público disfrutó de guitarras estridentes y potentes solos de batería.",
      images: [
        'https://cdn.midjourney.com/fb076ee8-e323-4661-b798-d00c401f6b1d/0_0.png',
        'https://cdn.midjourney.com/8e643dd0-5524-4a62-b66c-4046a5fb6380/0_2.png',
        'https://cdn.midjourney.com/8e643dd0-5524-4a62-b66c-4046a5fb6380/0_1.png',
        'https://cdn.midjourney.com/643b2614-84c5-4251-bc19-1b1f62a07e5a/0_3.png'

      ],
      category: "Rock",
    },
    {
      id: 14,
      title: "Tributo a Queen",
      image: 'https://cdn.midjourney.com/96f76140-8be3-4a86-ac7d-93680ec8df59/0_3.png',
      description: "El Tributo a Queen tuvo lugar el 30 de agosto de 2023 a las 9:00 PM en el Teatro de las Estrellas. Este espectáculo recreó los mayores éxitos de la legendaria banda Queen, haciendo vibrar al público con temas icónicos como Bohemian Rhapsody y We Will Rock You.",
      images: [
        'hhttps://cdn.midjourney.com/a507dd1d-3967-44e4-853a-13b38773905c/0_0.png',
        'https://cdn.midjourney.com/b493ee5d-cfb6-4de8-a772-ca5618eca799/0_1.png',
        'https://cdn.midjourney.com/b493ee5d-cfb6-4de8-a772-ca5618eca799/0_2.png',
        'https://cdn.midjourney.com/b493ee5d-cfb6-4de8-a772-ca5618eca799/0_3.png'
      ],
      category: "Rock",
    },
    {
      id: 16,
      title: "Festival de Rock Indie",
      image: 'https://cdn.midjourney.com/b20f042b-bc2b-4541-8692-134fad206d40/0_0.png',
      description: "El Festival de Rock Indie se celebró el 22 de julio de 2023 a las 4:00 PM en el Parque de la Juventud. El festival reunió a las mejores bandas independientes de la escena alternativa, ofreciendo un día completo de música, arte y creatividad.",
      images: [
        'https://cdn.midjourney.com/3a50ee00-afd9-444b-8b24-8d5b21db3d89/0_3.png',
        'https://cdn.midjourney.com/7b72b9e6-e7b7-4cc7-8385-508bf29717bb/0_3.png',
        'https://cdn.midjourney.com/7b72b9e6-e7b7-4cc7-8385-508bf29717bb/0_1.png',
        'https://cdn.midjourney.com/8843b6ea-fe60-492c-849a-4270c76074ce/0_0.png',
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
