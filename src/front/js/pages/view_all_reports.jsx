import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/view_all_reports.css";

export const ViewReports = () => {
    const { babyId } = useParams(); // Obtenemos el babyId de los parámetros de la URL
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [babyName, setBabyName] = useState(""); // Nuevo estado para el nombre del bebé

    useEffect(() => {
        const fetchReportsAndBabyName = async () => {
            const reportsUrl = `${process.env.BACKEND_URL}api/baby/${babyId}/reports`;
            const babyUrl = `${process.env.BACKEND_URL}api/babies`; // URL para obtener los bebés

            try {
                // Obtener el nombre del bebé
                const babyResponse = await fetch(babyUrl);
                if (!babyResponse.ok) {
                    const errorText = await babyResponse.text();
                    console.error("Error fetching babies:", errorText);
                    setError(`Error fetching babies: ${errorText}`);
                    return;
                }

                const babies = await babyResponse.json();
                const baby = babies.find(b => b.id === parseInt(babyId));
                if (baby) {
                    setBabyName(baby.name);
                } else {
                    setError("Baby not found");
                    return;
                }

                // Obtener los informes
                const reportsResponse = await fetch(reportsUrl);
                if (!reportsResponse.ok) {
                    const errorText = await reportsResponse.text();
                    console.error("Error fetching reports:", errorText);
                    setError(`Error ${reportsResponse.status}: ${errorText}`);
                    return;
                }

                const result = await reportsResponse.json();
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setReports(result);
            } catch (error) {
                console.error("Network error:", error);
                setError('Network error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReportsAndBabyName();
    }, [babyId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2 className="title">{babyName || "Loading..."}'s Reports</h2>
            {error && <div className="error">{error}</div>}
            {reports.length > 0 ? (
                <div className="reports-container">
                    <div className="reports-wrapper">
                        {reports.map(report => (
                            <div className="card" key={report.id}>
                                {report.date}
                                <div className="card-body">
                                    <div className="card-column">
                                        <p><strong>Bedtime:</strong> {report.bedtime} hours</p>
                                        <p><strong>Meals:</strong> {report.meals}</p>
                                        <p><strong>Diapers:</strong> {report.diapers}</p>
                                        <p><strong>Walks:</strong> {report.walks}</p>
                                        <p><strong>Water:</strong> {report.water} liters</p>
                                    </div>
                                    <div className="card-column">
                                        <p><strong>Medications:</strong> {report.meds ? "Yes" : "No"}</p>
                                        <p><strong>Kindergarten:</strong> {report.kindergarden ? "Yes" : "No"}</p>
                                        <p><strong>Extra Notes:</strong> {report.extra}</p>
                                    </div>
                                </div>
                                <div className="card-footer">
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
