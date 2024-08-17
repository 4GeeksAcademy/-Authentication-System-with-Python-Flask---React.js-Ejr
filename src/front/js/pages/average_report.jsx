import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según tu estructura

export const AverageReportPage = () => {
    const { babyId } = useParams();
    const { actions } = useContext(Context);
    const [interval, setInterval] = useState("weekly");
    const [averages, setAverages] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.fetchAverages(babyId, interval);
            setAverages(data);
        };
        fetchData();
    }, [babyId, interval, actions]);

    return (
        <div className="container">
            <h2>Averages Report</h2>
            <label>Select Interval: </label>
            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
            </select>
            {averages ? (
                <div>
                    <p>Average Bedtime: {averages.bedtime} hours</p>
                    <p>Average Meals: {averages.meals}</p>
                    <p>Average Diapers: {averages.diapers}</p>
                    <p>Average Walks: {averages.walks}</p>
                    <p>Average Water: {averages.water} liters</p>
                </div>
            ) : (
                <p>No data available for the selected interval.</p>
            )}
        </div>
    );
};
