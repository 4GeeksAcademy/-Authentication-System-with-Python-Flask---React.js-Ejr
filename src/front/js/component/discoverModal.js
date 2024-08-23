import React, { useState } from "react";
import "../../styles/discoverModal.css"; 

const Modal = ({ show, event, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const ticketPrice = 50; 
  const totalPrice = quantity * ticketPrice;

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handlePurchase = () => {
    alert(`Compra confirmada para ${quantity} entradas. Precio total: $${totalPrice}. Gracias por usar Tickeate`);
  };

  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-discover-overlay" onClick={handleOverlayClick}>
      <div className="modal-discover-content">
        <span className="modal-discover-close-button" onClick={onClose}>
          &times;
        </span>
        <img
          src={event.image}
          alt={event.title}
          className="modal-discover-image"
        />
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <div className="modal-discover-details">
          <label>
            Cantidad de Entradas:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <p>Precio por Entrada: ${ticketPrice}</p>
          <p>Precio Total: ${totalPrice}</p>
        </div>
        <button
          className="modal-discover-purchase-button"
          onClick={handlePurchase}
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};

export default Modal;
