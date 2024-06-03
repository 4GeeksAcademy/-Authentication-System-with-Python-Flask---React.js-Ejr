import React, { useState } from 'react'; // Importa React y el hook useState
import { Modal, Button, Form, Alert } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import styles from "./PasswordResetRequest.module.css"; // Importa los estilos CSS
import { useNavigate, useLocation } from "react-router-dom"; // Importa useNavigate y useLocation para la navegación programática y acceso a la ubicación URL

const PasswordResetRequest = () => {
    const navigate = useNavigate(); // Obtiene el hook navigate para redirigir al usuario

    const [email, setEmail] = useState(''); // Estado para almacenar el email ingresado
    const [message, setMessage] = useState(''); // Estado para almacenar el mensaje de éxito
    const [error, setError] = useState(''); // Estado para almacenar el mensaje de error
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    const handleSubmit = async (e) => { // Función para manejar el envío del formulario
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/tokenLoginHelp`, { // Hace una solicitud POST a la API
                method: 'POST', // Define el método de la solicitud
                headers: {
                    'Content-Type': 'application/json' // Define el tipo de contenido de la solicitud
                },
                body: JSON.stringify({ email }) // Envía el email como un objeto en el cuerpo de la solicitud
            });
            const result = await response.json(); // Parsea la respuesta de la API a JSON
            if (response.ok) { // Verifica si la respuesta fue exitosa
                setMessage(result.message); // Establece el mensaje de éxito
                setError(''); // Limpia el mensaje de error
                setShowModal(true); // Muestra el modal

                setTimeout(() => {
                    navigate('/Login'); // Redirige al usuario a la página de login después de 2 segundos
                }, 2000);
            } else {
                setError(result.error); // Establece el mensaje de error
                setMessage(''); // Limpia el mensaje de éxito
            }
        } catch (error) {
            console.error('Error reset request', error); // Muestra el error en la consola
            setError('An error occurred while requesting password reset'); // Establece el mensaje de error
            setMessage(''); // Limpia el mensaje de éxito
        }
    };

    return (
        <div className={styles['password-reset-request']}> {/* Aplica los estilos CSS */}
            <h2 className={styles.h2}>Forgot Password</h2> {/* Título */}
            <Form onSubmit={handleSubmit} className={styles.form}> {/* Formulario para solicitar el reinicio de contraseña */}
                <Form.Group>
                    <Form.Label className={styles.label}>Email:</Form.Label> {/* Etiqueta para el campo de email */}
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email cuando cambia el valor del campo
                        required
                        className={styles.input} // Aplica los estilos CSS
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className={styles.button}>Send Reset Email</Button> {/* Botón para enviar el formulario */}
            </Form>
            {message && <Alert variant="success" className={styles.message}>{message}</Alert>} {/* Muestra un mensaje de éxito si existe */}
            {error && <Alert variant="danger" className={styles.error}>{error}</Alert>} {/* Muestra un mensaje de error si existe */}
            <Modal show={showModal} onHide={() => setShowModal(false)}> {/* Modal para mostrar el estado del envío del email */}
                <div className={styles.modalNotification}> {/* Aplica los estilos CSS */}
                    <Modal.Header closeButton>
                        <Modal.Title>Password Reset Email Sent</Modal.Title> {/* Título del modal */}
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p> {/* Muestra el mensaje de éxito */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowModal(false)}> {/* Botón para cerrar el modal */}
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
};

export default PasswordResetRequest; // Exporta el componente para su uso en otros archivos
