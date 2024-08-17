import React, { useState } from "react";
import "../../styles/discover.css";

const Modal = ({ show, event, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const ticketPrice = 50; 
  const totalPrice = quantity * ticketPrice;

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handlePurchase = async () => {
    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalPrice,
      }),
    });

    const session = await response.json();
    const stripe = window.Stripe('pk_test_51PoUGbKRUE81lQChEmIzvoi9n0jNfoASUukIwuRez0f5cAxrxO0OnOOEdocXMHFhCcTFRWWGOahB5d2CJhNWuCBS00raBmJoom'); // Reemplaza con tu clave publicable

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <img src={event.image} alt={event.title} className="modal-image" />
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <div className="modal-details">
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
        <button className="modal-purchase-button" onClick={handlePurchase}>
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};

export default Modal;
