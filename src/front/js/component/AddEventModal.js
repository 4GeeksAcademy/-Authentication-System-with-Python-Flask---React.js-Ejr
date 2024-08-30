import React, { useState, useRef } from "react";
import "../../styles/addeventmodal.css"; 

const AddEventModal = ({ show, onClose, addEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // Estado para el preview de la imagen
  const fileInputRef = useRef(null); // Referencia al input de archivo

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Crear URL para el preview
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview("");
    fileInputRef.current.value = null; // Resetear el input de archivo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && image && category) {
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        category,
        image: imagePreview,
      };
      addEvent(newEvent);
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="add-event-modal-overlay" onClick={onClose}>
      <div className="add-event-modal-content" onClick={(e) => e.stopPropagation()}>
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
                Tipo de Evento:
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="Teatro">Teatro</option>
                  <option value="Salsa">Salsa</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Rock">Rock</option>
                </select>
              </label>
            </div>
            <div className="add-event-modal-details-item add-event-modal-image-input">
              <input
                type="file"
                id="event-image"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef} // Asignar referencia al input
                required={!imagePreview} // Requerido solo si no hay preview
                style={{ display: "none" }}
              />
              <label htmlFor="event-image" className="image-input-label">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="image-preview-thumbnail" />
                    <button type="button" className="remove-image-button" onClick={handleRemoveImage}>
                      Eliminar imagen
                    </button>
                  </>
                ) : (
                  <>
                    <div className="folder-icon">📁</div>
                    <span>Haga clic aquí para seleccionar una imagen</span>
                  </>
                )}
              </label>
            </div>
            <button type="submit" className="add-event-modal-purchase-button">
              Crear Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
