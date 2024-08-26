import React, { useState } from "react";
import "../../styles/addeventmodal.css"; 

const AddEventModal = ({ show, onClose, addEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && image) {
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        image: URL.createObjectURL(image), // Convierte la imagen en una URL
      };
      addEvent(newEvent);
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="add-event-modal-overlay">
      <div className="add-event-modal-content">
        <span className="add-event-modal-close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Agregar Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          <div className="add-event-modal-details">
            <div className="add-event-modal-details-item">
              <label>
                Título del Evento:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="add-event-modal-details-item">
              <label>
                Descripción:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="add-event-modal-details-item">
              <label>
                Imagen del Evento:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
            <button type="submit" className="add-event-modal-purchase-button">
              Agregar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
