import React, { useEffect, useState } from 'react';  // Importa React y los hooks useEffect y useState
import styles from './PaymentResponses.module.css';  // Importa los estilos CSS del componente
import moment from 'moment';  // Importa la librería moment para formatear fechas

const ExecutePaymentAdmin = () => {
    const [message, setMessage] = useState('Processing your payment...');  // Estado para el mensaje que se mostrará al usuario
    const [error, setError] = useState(false);  // Estado para manejar si hay un error

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);  // Obtiene los parámetros de la URL
        const paymentId = params.get('paymentId');  // Extrae el paymentId de los parámetros de la URL
        const payerId = params.get('PayerID');  // Extrae el PayerID de los parámetros de la URL
        const membershipId = params.get('membership_id');  // Extrae el membership_id de los parámetros de la URL
        const userId = params.get('user_id');  // Extrae el user_id de los parámetros de la URL

        const executePayment = async () => {
            try {
                let myToken = localStorage.getItem("token");  // Obtiene el token de autenticación del almacenamiento local

                const url = `${process.env.BACKEND_URL}/api/paypal_payment/execute_admin?paymentId=${paymentId}&PayerID=${payerId}&membership_id=${membershipId}&user_id=${userId}`;
                // Construye la URL para la solicitud al backend con los parámetros necesarios

                let response = await fetch(url, {
                    method: "GET",  // Método de la solicitud
                    headers: {
                        Authorization: `Bearer ${myToken}`  // Incluye el token de autorización en los encabezados
                    },
                });
                const result = await response.json();  // Parsea la respuesta como JSON
                console.log("Result from executePayment:", result);  // Imprime el resultado en la consola para depuración

                if (response.ok) {
                    // Si la respuesta es exitosa, formatea las fechas usando moment
                    const startDate = moment(result.start_date).format('DD MMM YYYY');
                    const endDate = moment(result.end_date).format('DD MMM YYYY');
                    // Actualiza el mensaje con los detalles de la membresía activada
                    setMessage(`Payment executed and membership activated successfully! Duration: ${result.duration_days} days, Classes per month: ${result.classes_per_month}, Start date: ${startDate}, End date: ${endDate}`);
                } else {
                    // Si hay un error en la respuesta, muestra el mensaje de error
                    setMessage(`Payment failed: ${result.error || 'Unknown error'}`);
                    setError(true);  // Establece el estado de error a true
                }
            } catch (err) {
                console.error("Error during executePayment:", err);  // Imprime el error en la consola para depuración
                setMessage(`Payment failed: ${err.message}`);  // Muestra el mensaje de error
                setError(true);  // Establece el estado de error a true
            }
        };

        executePayment();  // Llama a la función executePayment cuando se monta el componente
    }, []);  // El array vacío asegura que el efecto solo se ejecute una vez

    return (
        <div className={styles.container}>  
            <div className={error ? styles.error : styles.message}>  
                <h2>{error ? 'Error' : 'Success'}</h2>  
                <p>{message}</p>  
                <button onClick={() => window.location.href = '/'}>Go to Home</button> 
            </div>
        </div>
    );
};

export default ExecutePaymentAdmin;  
