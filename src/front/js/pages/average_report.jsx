import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "../../styles/avg_report.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalendarPlaceholder = () => {
    return (
        <div className="card ar-calendar-card">
            <div className="ar-card-body">
                <h3>Calendar</h3>
                {/* Aquí puedes agregar tu implementación de calendario en el futuro */}
            </div>
        </div>
    );
};

export const AverageReportPage = () => {
    const { babyId } = useParams();
    const { store, actions } = useContext(Context);
    const [interval, setInterval] = useState("weekly");
    const [averages, setAverages] = useState(null);
    const [extremes, setExtremes] = useState({ max: null, min: null });
    const [babyName, setBabyName] = useState(""); // Nuevo estado para el nombre del bebé
    const navigate = useNavigate();

    useEffect(() => {
        // Redirige al login si no hay un token en el contexto
        if (!store.token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Añadir el token de autorización en el encabezado
                const headers = {
                    'Authorization': `Bearer ${store.token}`,
                    'Content-Type': 'application/json'
                };

                const averagesData = await actions.fetchAverages(babyId, interval, headers);
                const extremesData = await actions.fetchExtremes(babyId, interval, headers);
                setAverages(averagesData);
                setExtremes(extremesData);

                // Obtener el nombre del bebé
                const babyResponse = await fetch(`${process.env.BACKEND_URL}api/babies`, { headers });
                if (!babyResponse.ok) {
                    console.error('Error fetching babies:', await babyResponse.text());
                    return;
                }
                const babies = await babyResponse.json();
                const baby = babies.find(b => b.id === parseInt(babyId));
                if (baby) {
                    setBabyName(baby.name);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [babyId, interval, actions, store.token, navigate]);

    const chartData = averages && extremes.max && extremes.min ? {
        labels: ['Bedtime', 'Meals', 'Diapers', 'Walks', 'Water'],
        datasets: [
            {
                label: 'Average',
                data: [
                    averages.bedtime,
                    averages.meals,
                    averages.diapers,
                    averages.walks,
                    averages.water
                ],
                backgroundColor: '#075E81', // Color para promedio
                borderRadius: 50, // Esquinas redondeadas
                borderSkipped: false // Sin borde en las esquinas
            },
            {
                label: 'Maximum',
                data: [
                    extremes.max.bedtime,
                    extremes.max.meals,
                    extremes.max.diapers,
                    extremes.max.walks,
                    extremes.max.water
                ],
                backgroundColor: '#B4E49D', // Color para máximo
                borderRadius: 50, // Esquinas redondeadas
                borderSkipped: false // Sin borde en las esquinas
            },
            {
                label: 'Minimum',
                data: [
                    extremes.min.bedtime,
                    extremes.min.meals,
                    extremes.min.diapers,
                    extremes.min.walks,
                    extremes.min.water
                ],
                backgroundColor: '#FBEE84', // Color para mínimo
                borderRadius: 50, // Esquinas redondeadas
                borderSkipped: false // Sin borde en las esquinas
            }
        ]
    } : null;

    return (
        <div className="avg-container">
            <div className="avg-row">
                <div className="avg-calendar">
                    <CalendarPlaceholder />
                </div>
                <div className="avg-content">
                    <div className="avg-header">
                        <h2>{babyName ? `${babyName}'s Report` : 'Report'}</h2>
                        <div className="avg-controls">
                            <label>Select Interval:    </label>
                            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                                <option value="weekly">Weekly</option>
                                <option value="biweekly">Biweekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                    {chartData ? (
                        <div className="avg-chart">
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                boxWidth: 12,
                                                font: {
                                                    family: 'Poppins',
                                                    size: 14
                                                }
                                            }
                                        },
                                        title: {
                                            display: false,
                                            text: 'Averages, Maximums, and Minimums',
                                            font: {
                                                family: 'Poppins',
                                                size: 16
                                            }
                                        }
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                display: false, // Ocultar cuadrícula en el eje X
                                                drawBorder: false // Ocultar borde en el eje X
                                            },
                                            ticks: {
                                                font: {
                                                    family: 'Poppins',
                                                    size: 14
                                                }
                                            }
                                        },
                                        y: {
                                            grid: {
                                                display: false, // Ocultar cuadrícula en el eje Y
                                                drawBorder: false // Ocultar borde en el eje Y
                                            },
                                            ticks: {
                                                font: {
                                                    family: 'Poppins',
                                                    size: 12,
                                                    color: '#075E81'
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <p>No data available for the selected interval.</p>
                    )}

                    <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mt-3">Back to Add Report</button>
                </div>
            </div>
        </div>
    );
};
