import React, { useEffect, useState } from 'react';  // Importamos React y los hooks useEffect y useState
import { Bar } from 'react-chartjs-2';  // Importamos el componente Bar de react-chartjs-2
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';  // Importamos Chart y los elementos necesarios de chart.js
import styles from './ClassFrequencyChart.module.css';  // Importamos los estilos CSS específicos para este componente
import moment from 'moment';  // Importamos moment para el formateo de fechas

// Registramos CategoryScale, LinearScale y BarElement en Chart.js
Chart.register(CategoryScale, LinearScale, BarElement);

const ClassFrequencyChart = () => {
    const [chartData, setChartData] = useState(null);  // Estado para almacenar los datos del gráfico
    const [error, setError] = useState(null);  // Estado para manejar errores
    const [filter, setFilter] = useState('all');  // Estado para el filtro de fecha u hora
    const [reservationType, setReservationType] = useState('all');  // Estado para el tipo de reserva

    useEffect(() => {
        const fetchData = async () => {
            try {
                let myToken = localStorage.getItem("token");
                const url = new URL(`${process.env.BACKEND_URL}/api/class-reservation-frequency`);
                url.searchParams.append('filter_by', filter);
                url.searchParams.append('reservation_type', reservationType);
    
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${myToken}`
                    }
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }
    
                const data = await response.json();
                console.log(data);
    
                if (Array.isArray(data)) {
                    // Modificamos esta parte para ajustar las etiquetas según el filtro
                    const classTimes = data.map(item => {
                        if (filter === 'date') {
                            // Formato de fecha y hora completa
                            return moment(item.class_time).format('DD MMM YYYY, HH:mm');
                        } else if (filter === 'time') {
                            // Solo hora
                            return `${item.class_hour}:00`;
                        } else {
                            // Por defecto, solo hora
                            return `${item.class_hour}:00`;
                        }
                    });
                    const frequencies = data.map(item => item.frequency);
    
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
                }
            } catch (error) {
                console.error('Error fetching class reservation frequency data:', error);
                setError(error.message);
            }
        };
    
        fetchData();
    }, [filter, reservationType]);  // Dependencias incluyen filter y reservationType para reaccionar a sus cambios
    
    return (
        <div className={styles.container}>  
            {error ? ( 
                <div className={styles.error}>
                    <h2>Error</h2>
                    <p>There was an error fetching the class reservation frequency data: {error}</p>
                </div>
            ) : (
                <div className={styles.chart}>  
                    <h2>Class Reservation Frequency</h2>
                    <div className={styles.filters}>  
                        <label>
                            Filter by:
                            <select value={filter} onChange={(e) => setFilter(e.target.value)}>  
                                <option value="all">All</option>
                                <option value="date">By Date</option>
                                <option value="time">By Time</option>
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
