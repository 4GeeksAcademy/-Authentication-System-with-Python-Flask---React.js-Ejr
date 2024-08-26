import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Payment } from "../component/checkout.jsx";
import "../../styles/discoverModal.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Modal = ({ show, event, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [showPayment, setShowPayment] = useState(false);
    const ticketPrice = 50;
    const totalPrice = quantity * ticketPrice;

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const handlePurchase = () => {
        setShowPayment(true);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePaymentSuccess = () => {
        setTimeout(() => {
            setShowPayment(false);
            setTimeout(() => {
                onClose();
            }, 3000); // Close modal after 3 seconds
        }, 2000); // Wait for 2 seconds before starting the close process
    };

    return (
        <>
            {show && !showPayment && (
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
            )}

            {showPayment && (
                <div className="modal-discover-overlay" onClick={handleOverlayClick}>
                    <div className="modal-discover-content">
                        <span className="modal-discover-close-button" onClick={() => setShowPayment(false)}>
                            &times;
                        </span>
                        <h2>Información de Pago</h2>
                        <Elements stripe={stripePromise}>
                            <Payment amount={totalPrice} onSuccess={handlePaymentSuccess} />
                        </Elements>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
