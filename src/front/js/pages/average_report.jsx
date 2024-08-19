import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext"; 
import { useNavigate } from 'react-router-dom'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AverageReportPage = () => {
    const { babyId } = useParams();
    const { actions } = useContext(Context);
    const [interval, setInterval] = useState("weekly");
    const [averages, setAverages] = useState(null);
    const [extremes, setExtremes] = useState({ max: null, min: null });
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            const averagesData = await actions.fetchAverages(babyId, interval);
            const extremesData = await actions.fetchExtremes(babyId, interval);
            setAverages(averagesData);
            setExtremes(extremesData);
        };
        fetchData();
    }, [babyId, interval, actions]);

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
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
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
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    } : null;

    return (
        <div className="container">
            <h2>Report</h2>
            <label>Select Interval: </label>
            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
            </select>

            {chartData ? (
                <div>
                    <Bar 
                        data={chartData} 
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Averages, Maximums, and Minimums'
                                },
                            },
                        }}
                    />
                </div>
            ) : (
                <p>No data available for the selected interval.</p>
            )}
            
            <button onClick={() => navigate('/Today')} className="btn btn-secondary mt-3">Back to Add Report</button>
        </div>
    );
};
