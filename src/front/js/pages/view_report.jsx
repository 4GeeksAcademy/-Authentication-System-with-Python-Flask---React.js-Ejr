// src/components/ViewReport.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ViewReport = () => {
    const { babyId, reportId } = useParams();
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            const url = `${process.env.BACKEND_URL}api/baby/${babyId}/${reportId}`;
            console.log("Fetching URL:", url); // Verifica la URL

            try {
                const response = await fetch(url);
                console.log("Response status:", response.status); // Verifica el código de estado

                if (!response.ok) {
                    const errorText = await response.text(); 
                    console.error("Error response:", errorText); // Verifica el contenido del error
                    setError(`Error ${response.status}: ${errorText}`);
                    return;
                }

                const result = await response.json();
                console.log("Report result:", result); // Verifica el resultado del JSON
                setReport(result);
            } catch (error) {
                console.error("Network error:", error); // Imprime el error de red en la consola
                setError('Network error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [babyId, reportId]);

    return (
        <div className="container">
            <h2>View Report</h2>
            {loading && <p>Loading report...</p>}
            {error && <div className="error">{error}</div>}
            {report && !loading && (
                <div>
                    <p><strong>Date:</strong> {report.date}</p>
                    <p><strong>Bedtime:</strong> {report.bedtime} hours</p>
                    <p><strong>Meals:</strong> {report.meals}</p>
                    <p><strong>Diapers:</strong> {report.diapers}</p>
                    <p><strong>Walks:</strong> {report.walks}</p>
                    <p><strong>Water:</strong> {report.water} liters</p>
                    <p><strong>Medications:</strong> {report.meds ? "Yes" : "No"}</p>
                    <p><strong>Kindergarten:</strong> {report.kindergarden ? "Yes" : "No"}</p>
                    <p><strong>Extra Notes:</strong> {report.extra}</p>
                </div>
            )}
        </div>
    );
};
