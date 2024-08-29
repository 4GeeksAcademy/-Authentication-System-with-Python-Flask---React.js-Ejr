//FormularioPago:


/* Usa Stripe para procesar el pago.
-Simulación: Si isSimulating es true, simula un pago exitoso mostrando un modal y redirigiendo después de 2 segundos.
-Pago Real: Si isSimulating es false, realiza un pago real con Stripe y maneja la confirmación del pago.
-Modal: Muestra un modal de éxito y redirige a /completoDisWeb después de 2 segundos. */


import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Importar Bootstrap para el modal
import VistaPago from '../pages/vistaPago';

function FormularioPago() {
    const stripe = useStripe();//Para interactuar con la API de Stripe
    const elements = useElements(); // Para acceder a los elementos de Stripe como CardElement, necesarios para realizar la confirmación del pago
    const navigate = useNavigate();
    const location = useLocation(); // Para obtener datos de la ubicación actual, como la URL y el estado
    const { clientSecret, cantidad } = location.state || {};
    console.log('clientSecret:', clientSecret); //verificar los valores recibidos en FormularioPago
    console.log('cantidad:', cantidad);

    // controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    const [isSimulating, setIsSimulating] = useState(true); // Para controlar si estamos en modo simulación
    const [isProcessing, setIsProcessing] = useState(false); // Para deshabilitar el botón mientras se procesa el pago


    // envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();// Previene el comportamiento por defecto del formulario (recarga de página)

        // Verificaciones para asegurarse de que todo esté disponible
        if (!stripe || !elements || !clientSecret) {
             // Si cualquiera de estos elementos no está disponible, el proceso de confirmación del pago no se realiza y se muestra un mensaje de error.
            console.error('Stripe no está disponible o el clientSecret no es válido');
            return;
        }

        const cardElement = elements.getElement(CardElement); //Obtiene el elemento de la tarjeta de crédito
        if (!cardElement) { // Verificar que el elemento de la tarjeta esté disponible
            console.error('El elemento de la tarjeta no está disponible');
            return;
        }

        setIsProcessing(true); // Procesa y mientras deshabilita el botón.


        //SIMULACIÓN de PAGO
        if (isSimulating) {
            // Simula un pago exitoso si estamos en modo simulación
            setShowModal(true);// Muestra el modal de éxito
            setIsProcessing(false); // Habilitar el botón después de simular el proceso de pago
            setTimeout(() => navigate('/completoDisWeb'), 2000); // Redirige después de 2 segundos
        } else {
            //pago real con Stripe
            try { /// Confirma el pago con Stripe usando el clientSecret
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: { name: 'Nombre del Cliente' },
                    },
                });

                if (error) {
                    console.error('Error confirmando el pago:', error);
                   
                } else if (paymentIntent.status === 'succeeded') {
                    // Si el pago es exitoso, muestra el modal y redirige al usuario a la vista /completoDisWeb.js
                    setShowModal(true);
                    setTimeout(() => navigate('/completoDisWeb'), 2000); // Redirige después de 2 segundos
                }
            } catch (error) {
                console.error('Error en el proceso de confirmación del pago:', error);
            } finally {
                setIsProcessing(false); // Reactiva el botón al final del proceso
            } 
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" className="btn btn-primary" disabled={isProcessing}>
                    {/* Botón de envío, desactivado mientras se procesa el pago */}
                    {isProcessing ? 'Procesando...' : `Pagar ${cantidad} EUR`}
                </button>
            </form>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Pago Exitoso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Mensaje de confirmación del pago */}
                    ¡Gracias por tu pago de {cantidad} EUR!
                </Modal.Body>
                <Modal.Footer>
                    {/* Botón para cerrar el modal y continuar */}
                    <Button variant="primary" onClick={() => navigate('/completoDisWeb')}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FormularioPago;
