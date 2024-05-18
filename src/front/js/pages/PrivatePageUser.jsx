import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./PrivatePageUser.module.css"; // Importación de estilos CSS

import PrivateCalendar from "/workspaces/app_gestion_gym_crossfit_proyecto_final_pt28/src/front/js/component/PrivateCalendar.jsx"


const PrivatePageUser = () => {
    const { store, actions} = useContext(Context); // Usar useContext para acceder al contexto global
    const { uploadedUserData } = store; // Suponiendo que uploadedUserData contiene el objeto del usuario

    // Verificar si uploadedUserData contiene datos
    if (!uploadedUserData) {
        return <div className={styles.loading}>Cargando datos del usuario...</div>;
    }

    const handleCancelBooking = async (bookingId) => {
        try {
            await actions.cancel_booking(bookingId);
            alert('Reserva cancelada con éxito!');
            // Aquí podrías añadir lógica para actualizar la UI o refrescar los datos.
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            alert('Error al cancelar la reserva.');
        }
    }

    //TRABAJAR EN MODAL PARA LA RESPUESTA DEL SERVIDOR
    

    // Renderizar los detalles del usuario
    return (
        <>
            <div className={styles.userDetailsContainer}>
                <div className={styles.userDetailsCard}>
                    <h2>Detalles del Usuario</h2>
                    <p><strong>ID:</strong> {uploadedUserData.id}</p>
                    <p><strong>Email:</strong> {uploadedUserData.email}</p>
                    <p><strong>Nombre:</strong> {uploadedUserData.name} {uploadedUserData.last_name}</p>
                    <p><strong>Usuario:</strong> {uploadedUserData.username}</p>
                    <p><strong>Rol:</strong> {uploadedUserData.role}</p>
                    <p><strong>Registro:</strong> {uploadedUserData.register_date}</p>
                    <p><strong>Última Actualización:</strong> {uploadedUserData.account_update}</p>
                    <p><strong>Membresía:</strong> {uploadedUserData.membership_description}</p>
                    <p><strong>Inicio de Membresía:</strong> {uploadedUserData.membership_start_date}</p>
                    <p><strong>Fin de Membresía:</strong> {uploadedUserData.membership_end_date}</p>
                    <p><strong>Membresía Activa:</strong> {uploadedUserData.active_membership_is_active}</p>
                    <p><strong>Clases Restantes:</strong> {uploadedUserData.membership_remaining_classes}</p>
                </div>
                <div className={styles.securityQuestions}>
                    <h3>Preguntas de Seguridad</h3>
                    <p><strong>1:</strong> {uploadedUserData.security_questions_question1} - {uploadedUserData.security_questions_answer1}</p>
                    <p><strong>2:</strong> {uploadedUserData.security_questions_question2} - {uploadedUserData.security_questions_answer2}</p>
                </div>
                <div className={styles.bookingsContainer}>
                    <h3>Clases Reservadas:</h3>
                    <div className={styles.bookingsList}>
                        {uploadedUserData.bookings && uploadedUserData.bookings.map((booking, index) => (
                            <div key={index} className={styles.bookingDetail}>
                                <p>Nombre: {booking.booking_id}</p>
                                <p>Nombre: {booking.class_name}</p>
                                <p>Fecha: {booking.dateTime_class}</p>
                                <p>Hora: {booking.class_start_time}</p>
                                <button onClick={() => handleCancelBooking(booking.booking_id)} className={styles.deleteButton}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <PrivateCalendar />

        </>
    );
};

export default PrivatePageUser;


