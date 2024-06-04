import React, { useEffect, useState } from 'react';  // Importamos React y los hooks useEffect y useState
import { Bar } from 'react-chartjs-2';  // Importamos el componente Bar de react-chartjs-2
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';  // Importamos Chart y los elementos necesarios de chart.js
import styles from './ClassFrequencyChart.module.css';  // Importamos los estilos CSS específicos para este componente
import moment from 'moment';  // Importamos moment para el formateo de fechas

// Registramos CategoryScale, LinearScale y BarElement en Chart.js
Chart.register(CategoryScale, LinearScale, BarElement);

const ClassFrequencyChart = () => {
    // Definimos los estados para almacenar los datos del gráfico, errores, el filtro seleccionado y el tipo de reserva
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [reservationType, setReservationType] = useState('all');

    // useEffect se ejecuta después de que el componente se monta y cuando cambian 'filter' o 'reservationType'
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtenemos el token almacenado en el localStorage
                let myToken = localStorage.getItem("token");
                // Creamos la URL para la solicitud GET
                const url = new URL(`${process.env.BACKEND_URL}/api/class-reservation-frequency`);
                // Añadimos los parámetros de filtro a la URL
                url.searchParams.append('filter_by', filter);
                url.searchParams.append('reservation_type', reservationType);

                // Realizamos la solicitud fetch con el token de autorización
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${myToken}`
                    }
                });

                // Si la respuesta no es OK, lanzamos un error
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }

                // Convertimos la respuesta en JSON
                const data = await response.json();

                // Mapeamos los datos recibidos para obtener los tiempos de clase y las frecuencias
                const classTimes = data.map(item => item.class_time);
                const frequencies = data.map(item => item.frequency);

                // Establecemos los datos del gráfico en el estado chartData
                setChartData({
                    labels: classTimes,
                    datasets: [{
                        label: 'Frequency of Reservations',
                        data: frequencies,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                // Si ocurre un error, lo registramos en la consola y establecemos el estado de error
                console.error('Error fetching class reservation frequency data:', error);
                setError(error.message);
            }
        };

        // Llamamos a la función fetchData para obtener los datos
        fetchData();
    }, [filter, reservationType]);  // El efecto se ejecuta cada vez que cambian 'filter' o 'reservationType'

    return (
        <div className={styles.container}>  
            <h1 className={styles.titleComponent}>Class Reservation Frequency</h1>
            {error ? ( 
                <div className={styles.error}>
                    <h2>Error</h2>
                    <p>There was an error fetching the class reservation frequency data: {error}</p>
                </div>
            ) : (
                <div className={styles.chart}>  
                    <div className={styles.filters}>  
                        <label>
                            Filter by:
                            <select value={filter} onChange={(e) => setFilter(e.target.value)}>  
                                <option value="all">All</option>
                                <option value="date">By Date</option>
                                <option value="time">By Time</option>
                                <option value="day">By Day</option>
                            </select>
                        </label>
                        <label>
                            Reservation Type:
                            <select value={reservationType} onChange={(e) => setReservationType(e.target.value)}>  
                                <option value="all">All</option>
                                <option value="reserved">Reserved</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </label>
                    </div>
                    {chartData ? (  
                        <Bar data={chartData} />  
                    ) : (
                        <p>Loading...</p> 
                    )}
                </div>
            )}
        </div>
    );
};

export default ClassFrequencyChart;  
