import React, { useContext, useEffect, useState } from 'react'; // Importamos React, useContext, useEffect y useState desde React
import { Calendar, momentLocalizer } from 'react-big-calendar'; // Importamos Calendar y momentLocalizer desde react-big-calendar
import Modal from 'react-modal'; // Importamos Modal desde react-modal
import moment from 'moment'; // Importamos moment para el manejo de fechas y horas
import { Context } from '../store/appContext'; // Importamos el contexto de nuestra aplicación
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importamos los estilos CSS de react-big-calendar
import styles from './PrivateCalendar.module.css'; // Importamos los estilos específicos del componente

// Configuramos el localizador de fechas para el calendario usando moment
const localizer = momentLocalizer(moment);

const PrivateCalendar = () => {
    // Obtenemos el estado global (store) y las acciones (actions) desde el contexto de la aplicación
    const { store, actions } = useContext(Context);
    // Definimos el estado para controlar si el modal está abierto o cerrado
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // Definimos el estado para almacenar el evento seleccionado
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        actions.loadTrainingClasses(); // Carga las clases al montar el componente
    }, []);

    // Transformamos los eventos del store para que sean compatibles con el calendario
    const events = store.trainingClasses.map(event => ({
        ...event,
        start: moment(event.dateTime_class).toDate(), // moment parsea la fecha asumiendo que está en UTC si termina en 'Z'
        end: moment(event.dateTime_class).add(event.duration_minutes, 'minutes').toDate(),
        title: `${event.name} (${event.available_slots} slots)`
    }));
    

    //console.log("estructura_eventos",events); // Esto mostrará la estructura de los eventos transformados en la consola

    // Maneja el clic en un evento del calendario
    const handleEventClick = (event) => {
        // console.log("Evento seleccionado:", event); // Esto te mostrará los detalles del evento en la consola
        setSelectedEvent(event); // Establece el evento seleccionado en el estado
        setModalIsOpen(true); // Abre el modal
    };

    // useEffect(() => {
    //     console.log("Evento actualmente seleccionado:", selectedEvent);
    // }, [selectedEvent]);

    // Función para cerrar el modal
    const closeModal = () => {
        setModalIsOpen(false); // Cierra el modal
        setSelectedEvent(null); // Limpia el evento seleccionado
    };

    // Estado y función para mostrar mensajes de reserva
    const [bookingMessage, setBookingMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    // Maneja la reserva de una clase
    const handleBookClass = async (classId) => {
        // console.log("Intentando reservar clase con ID:", classId);
        try {
            const result = await actions.book_class(classId); // Llama a la acción para reservar la clase
            if (result.success) {
                setBookingMessage("Reservation made successfully"); // Establece el mensaje de éxito
                setShowMessage(true); // Muestra el mensaje
            } else {
                setBookingMessage(result.error || "Error booking class"); // Establece el mensaje de error
                setShowMessage(true); // Muestra el mensaje
            }
        } catch (error) {
            console.error('Error en handleBookClass:', error);
            setBookingMessage("Error en el sistema: " + error.message); // Muestra el error del sistema
            setShowMessage(true); // Muestra el mensaje
        } finally {
            setTimeout(() => {
                setShowMessage(false); // Oculta el mensaje después de 5 segundos
                setBookingMessage(""); // Limpia el mensaje
            }, 5000);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.myCalendar}>
                    <h1 className={styles.titleComponent}>Private Calendar</h1>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{
                            height: '500px',
                            background: '#bebebe',
                            borderRadius: '5px',
                            color: 'gray'
                        }}
                        onSelectEvent={handleEventClick} // Maneja el clic en un evento del calendario
                    />
                </div>

                {selectedEvent && ( // Si hay un evento seleccionado, muestra el modal
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Class Details"
                        className={`${styles.modal} ${styles.customModal}`}
                        overlayClassName={styles.overlay}
                        shouldCloseOnOverlayClick={true}
                        shouldReturnFocusAfterClose={true}
                    >
                        <h2>{selectedEvent.title}</h2>
                        {showMessage && (
                            <h3 id='bookigMenssage'>{bookingMessage}</h3> // Muestra el mensaje de reserva si está disponible
                        )}
                        <h4>Class status: {selectedEvent.Class_is_active ? "Active" : "Cancelled"}</h4>
                        <p>Description: {selectedEvent.description}</p>
                        <p>Instructor: {selectedEvent.instructor}</p>
                        <p>Duration: {selectedEvent.start_time} minutes</p>
                        <p>Duration: {selectedEvent.duration_minutes} minutes</p>
                        <p>Available slots: {selectedEvent.available_slots}</p>

                        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            <h3>Personas en clase:</h3>
                            {(() => {
                                const uniqueBookings = new Set(); // Set para almacenar IDs únicos de reservas
                                const filteredBookings = selectedEvent.bookings.flatMap(booking =>
                                    booking.bookings.filter(b =>
                                        b.class_id === selectedEvent.id &&
                                        b.booking_status === "reserved" &&
                                        !uniqueBookings.has(b.booking_id) && // Verifica si el booking_id ya fue procesado
                                        uniqueBookings.add(b.booking_id) // Añade el booking_id al Set
                                    )
                                );
                                return filteredBookings.map((booking, index) => {
                                    // console.log("Reservas filtradas por evento y estado sin duplicados:", booking); // Esto mostrará en consola cada booking que cumpla las condiciones
                                    return (
                                        <div key={index} className={styles.bookingItem}>
                                            {booking.booking_user_profile_image ? (
                                                <img
                                                    src={booking.booking_user_profile_image}
                                                    alt="Profile"
                                                    className={styles.profileImage}
                                                />
                                            ) : (
                                                <i className={`fa-solid fa-circle-user ${styles.defaultProfileIcon}`}></i>
                                            )}
                                            <span className={styles.bookingUserName}>{booking.booking_user_name}</span>
                                        </div>
                                    );
                                });
                            })()}
                        </div>

                        <div className={styles.buttonContainer}>
                            <button onClick={closeModal} className={styles.buttonback}>
                                <i className="fa-solid fa-angle-left"></i> Close
                            </button>
                            <button
                                onClick={() => handleBookClass(selectedEvent.id)}
                                className={styles.buttonadd}
                                disabled={!selectedEvent.Class_is_active}
                            >
                                <i className="fa-solid fa-plus icon"></i> Book Class
                            </button>
                        </div>
                    </Modal>
                )}
            </div>
            {/* <MembershipManager/> */}
        </>
    );
};

export default PrivateCalendar;
