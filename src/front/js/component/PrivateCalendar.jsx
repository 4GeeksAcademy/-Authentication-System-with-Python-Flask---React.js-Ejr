import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import moment from 'moment';
import { Context } from '../store/appContext'; // Asegúrate de ajustar la ruta al contexto
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './PrivateCalendar.module.css'; // Asegúrate de que la ruta al CSS es correcta

const localizer = momentLocalizer(moment);

const PrivateCalendar = () => {
    const { store, actions } = useContext(Context);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    

    useEffect(() => {
        actions.loadTrainingClasses(); // Carga las clases al montar el componente
    }, [actions]);

    const events = store.trainingClasses.map(event => ({
        ...event,
        start: new Date(event.dateTime_class),
        end: moment(new Date(event.dateTime_class)).add(event.duration_minutes, 'minutes').toDate(),
        title: `${event.name} (${event.available_slots} slots)`
    }));

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedEvent(null);
    };

    const [bookingMessage, setBookingMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);


    const handleBookClass = async (classId) => {
        console.log("Intentando reservar clase con ID:", classId);
        try {
            const result = await actions.book_class(classId);
            if (result.success) {
                setBookingMessage("Reserva realizada con éxito");
                setShowMessage(true);
            } else {
                setBookingMessage(result.error || "Error al reservar la clase");
                setShowMessage(true);
            }
        } catch (error) {
            console.error('Error en handleBookClass:', error);
            setBookingMessage("Error en el sistema: " + error.message);
            setShowMessage(true);
        } finally {
            setTimeout(() => {
                setShowMessage(false);
                setBookingMessage("");
            }, 5000); // Oculta el mensaje después de 3 segundos
        }
    };
    
    
    
    
    
    const handleCancelBooking = async (bookingId) => {
        console.log("Intentando cancelar reserva con ID:", bookingId);
        try {
            const result = await actions.cancel_booking(bookingId);
            if (result) {
                console.log('Reserva cancelada con éxito', result);
            } else {
                console.log('Error al cancelar la reserva', result);
            }
        } catch (error) {
            console.error('Error en handleCancelBooking:', error);
        }
    };
    
    

    return (
        <div className={styles.container}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleEventClick}
            />
            {selectedEvent && (
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Class Details"
                className={styles.modal}
                overlayClassName={styles.overlay}
                shouldCloseOnOverlayClick={true}
                shouldReturnFocusAfterClose={true}
            >
                    <h2>{selectedEvent.title}</h2>
                    {showMessage && (
                        <h3 id='bookigMenssage'>{bookingMessage}</h3>
                    )}
                    <p>Description: {selectedEvent.description}</p>
                    <p>Instructor: {selectedEvent.instructor}</p>
                    <p>Duration: {selectedEvent.start_time} minutes</p>
                    <p>Duration: {selectedEvent.duration_minutes} minutes</p>
                    <p>Available slots: {selectedEvent.available_slots}</p>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        <h3>Persona en clase:</h3>
                        {selectedEvent.bookings && selectedEvent.bookings.map((booking, index) => (
                            <div key={index}>
                                <p>Name: {booking.name}</p>
                            </div>
                    ))}
                    </div>
                    <button onClick={closeModal}>Close</button>
                    <button onClick={() => handleBookClass(selectedEvent.id)}>Book Class</button>
                    <button onClick={() => handleCancelBooking(selectedEvent.bookingId)}>Cancel Booking</button>

                </Modal>
            )}
        </div>
    );
};

export default PrivateCalendar;
