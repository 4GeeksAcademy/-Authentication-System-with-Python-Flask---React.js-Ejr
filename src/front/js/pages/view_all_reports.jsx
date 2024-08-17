import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/view_all_reports.css";

export const ViewReports = () => {
    const { babyId } = useParams(); // Obtenemos el babyId de los parámetros de la URL
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            const url = `${process.env.BACKEND_URL}api/baby/${babyId}/reports`;
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
                console.log("Reports result:", result); // Verifica el resultado del JSON

                // Ordenar los reportes por fecha en orden cronológico inverso
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setReports(result);
            } catch (error) {
                console.error("Network error:", error); // Imprime el error de red en la consola
                setError('Network error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [babyId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2>Reports for Baby {babyId}</h2>
            {error && <div className="error">{error}</div>}
            {reports.length > 0 ? (
                <div className="reports-container">
                    <div className="reports-wrapper">
                        {reports.map(report => (
                            <div className="card" key={report.id}>
                                <div className="card-body">
                                    <h5 className="card-title">Report from {report.date}</h5>
                                    <p><strong>Bedtime:</strong> {report.bedtime} hours</p>
                                    <p><strong>Meals:</strong> {report.meals}</p>
                                    <p><strong>Diapers:</strong> {report.diapers}</p>
                                    <p><strong>Walks:</strong> {report.walks}</p>
                                    <p><strong>Water:</strong> {report.water} liters</p>
                                    <p><strong>Medications:</strong> {report.meds ? "Yes" : "No"}</p>
                                    <p><strong>Kindergarten:</strong> {report.kindergarden ? "Yes" : "No"}</p>
                                    <p><strong>Extra Notes:</strong> {report.extra}</p>
                                    <Link to={`/edit_report/${babyId}/${report.id}`} className="btn btn-primary">Edit Report</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No reports available.</p>
            )}
        </div>
    );
};
