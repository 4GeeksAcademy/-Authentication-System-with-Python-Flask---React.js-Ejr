import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./PrivatePageUser.module.css"; // Importación de estilos CSS


const PrivatePageUser = () => {
    const { store } = useContext(Context); // Usar useContext para acceder al contexto global
    const { uploadedUserData } = store; // Suponiendo que uploadedUserData contiene el objeto del usuario

    // Verificar si uploadedUserData contiene datos
    if (!uploadedUserData) {
        return <div>Cargando datos del usuario...</div>; // Mostrar un mensaje de carga o componente mientras los datos están cargando
    }

    // Renderizar los detalles del usuario
    return (
        <div className={styles.userDetails}>
            <h2>Detalles del Usuario</h2>
            <p><strong>ID:</strong> {uploadedUserData.id}</p>
            <p><strong>Email:</strong> {uploadedUserData.email}</p>
            <p><strong>Nombre:</strong> {uploadedUserData.name}</p>
            <p><strong>Apellido:</strong> {uploadedUserData.last_name}</p>
            <p><strong>Nombre de usuario:</strong> {uploadedUserData.username}</p>
            <p><strong>Rol:</strong> {uploadedUserData.role}</p>
            <p><strong>Fecha de registro:</strong> {uploadedUserData.register_date}</p>
            <p><strong>Última actualización:</strong> {uploadedUserData.account_update}</p>
            <p><strong>Descripción de la membresía:</strong> {uploadedUserData.membership_description}</p>
            <p><strong>Inicio de membresía:</strong> {uploadedUserData.membership_start_date}</p>
            <p><strong>Fin de membresía:</strong> {uploadedUserData.membership_end_date}</p>
            <p><strong>Membresía activa:</strong> {uploadedUserData.active_membership_is_active}</p>
            <p><strong>Clases restantes:</strong> {uploadedUserData.membership_remaining_classes}</p>
            <p><strong>Pregunta de seguridad 1:</strong> {uploadedUserData.security_questions_question1} - {uploadedUserData.security_questions_answer1}</p>
            <p><strong>Pregunta de seguridad 2:</strong> {uploadedUserData.security_questions_question2} - {uploadedUserData.security_questions_answer2}</p>
        </div>
    );
};

export default PrivatePageUser;

