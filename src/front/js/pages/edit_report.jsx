import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EditReport = () => {
    const { babyId, reportId } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState({
        date: '',
        bedtime: '',
        meals: '',
        diapers: '',
        walks: '',
        water: '',
        meds: false,
        kindergarden: false,
        extra: ''
    });
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setReport(prevReport => ({
            ...prevReport,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.BACKEND_URL}api/baby/${babyId}/report/${reportId}`;
        console.log("Submitting to URL:", url); // Verifica la URL

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(report),
            });
            console.log("Response status:", response.status); // Verifica el código de estado

            if (!response.ok) {
                const errorText = await response.text(); 
                console.error("Error response:", errorText); // Verifica el contenido del error
                setError(`Error ${response.status}: ${errorText}`);
                return;
            }

            // Redirect or update state upon successful submission
            navigate(`/baby/${babyId}/${reportId}`); // Redirige a la vista del reporte
        } catch (error) {
            console.error("Network error:", error); // Imprime el error de red en la consola
            setError('Network error: ' + error.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2>Edit Report</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={report.date.substring(0, 10)}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Bedtime:</label>
                    <input
                        type="number"
                        name="bedtime"
                        value={report.bedtime}
                        onChange={handleChange}
                        min="0"
                        step="0.1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Meals:</label>
                    <input
                        type="number"
                        name="meals"
                        value={report.meals}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Diapers:</label>
                    <input
                        type="number"
                        name="diapers"
                        value={report.diapers}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Walks:</label>
                    <input
                        type="number"
                        name="walks"
                        value={report.walks}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Water (liters):</label>
                    <input
                        type="number"
                        name="water"
                        value={report.water}
                        onChange={handleChange}
                        min="0"
                        step="0.1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Medications:</label>
                    <input
                        type="checkbox"
                        name="meds"
                        checked={report.meds}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Kindergarten:</label>
                    <input
                        type="checkbox"
                        name="kindergarden"
                        checked={report.kindergarden}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Extra Notes:</label>
                    <textarea
                        name="extra"
                        value={report.extra}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};