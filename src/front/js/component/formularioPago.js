//FormularioPago:proceso de pago con Stripe usando el clientSecret
//Procesa el pago usando Stripe y, si el pago es exitoso, muestra un modal y redirige al usuario a CompletoDisWeb



import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Importar Bootstrap para el modal

function FormularioPago() {
    const stripe = useStripe();//Para interactuar con la API de Stripe
    const elements = useElements(); // Para acceder a los elementos de Stripe como CardElement, necesarios para realizar la confirmación del pago
    const navigate = useNavigate();
    const location = useLocation(); // Para obtener datos de la ubicación actual, como la URL y el estado
    const { clientSecret, cantidad } = location.state || {};

    // controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    const [isSimulating, setIsSimulating] = useState(true); // Para controlar si estamos en modo simulación

    // envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificaciones para asegurarse de que todo esté disponible
        if (!stripe || !elements || !clientSecret) {
             // Si cualquiera de estos elementos no está disponible, el proceso de confirmación del pago no se realiza y se muestra un mensaje de error.
            console.error('Stripe no está disponible o el clientSecret no es válido');
            return;
        }

        const cardElement = elements.getElement(CardElement); // recolectar y manejar la información de la tarjeta de crédito del usuario de manera segura
        if (!cardElement) { // Verificar que el elemento de la tarjeta esté disponible
            console.error('El elemento de la tarjeta no está disponible');
            return;
        }


        //SIMULACIÓN de PAGO
        if (isSimulating) {
            // Simulación de un pago exitoso
            setShowModal(true);
            setTimeout(() => navigate('/completoDisWeb'), 2000); // Redirige después de 2 segundos
        } else {
            //pago real con Stripe
            try {
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: { name: 'Nombre del Cliente' },
                    },
                });

                if (error) {
                    console.error('Error confirmando el pago:', error);
                   
                } else if (paymentIntent.status === 'succeeded') {
                    setShowModal(true);
                    setTimeout(() => navigate('/completoDisWeb'), 2000); // Redirige después de 2 segundos
                }
            } catch (error) {
                console.error('Error en el proceso de confirmación del pago:', error);
            }
        }
    };


    const handleClose = () => setShowModal(false);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pagar {cantidad} EUR
                </button>
            </form>

            {/* Modal de éxito */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pago Exitoso</Modal.Title>
                </Modal.Header>
                <Modal.Body>Gracias por tu compra. Serás redirigido a la página del curso adquirido.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FormularioPago;
