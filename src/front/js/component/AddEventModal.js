import React, { useState } from "react";
import "../../styles/addeventmodal.css"; 
// trabajando en el modal para agregar eventos que solo puedan ver los partners

const AddEventModal = ({ show, onClose }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [organizer, setOrganizer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo evento agregado:", {
      title,
      image,
      description,
      category,
      eventType,
      date,
      time,
      location,
      price,
      organizer,
    });
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-discover-overlay">
      <div className="modal-discover-content">
        <span className="modal-discover-close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Agregar Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-discover-details">
            <div className="modal-discover-details-item">
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
            <div className="modal-discover-details-item">
              <label>
                Imagen URL:
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Descripción:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Categoría:
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="Teatro">Teatro</option>
                  <option value="Salsa">Salsa</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Rock">Rock</option>
                </select>
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Tipo de Evento:
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  required
                >
                  <option value="">Selecciona un tipo de evento</option>
                  <option value="Conferencia">Conferencia</option>
                  <option value="Concierto">Concierto</option>
                  <option value="Taller">Taller</option>
                  <option value="Exposición">Exposición</option>
                </select>
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Fecha:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Hora:
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Ubicación:
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Precio:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="modal-discover-details-item">
              <label>
                Organizador:
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit" className="modal-discover-purchase-button">
              Agregar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
