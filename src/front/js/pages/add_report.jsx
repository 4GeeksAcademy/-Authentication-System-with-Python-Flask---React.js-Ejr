import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/add_report.css";

const CalendarPlaceholder = () => {
    return (
        <div className="calendar-placeholder">
            <h3>Calendar</h3>
            {/* Aquí puedes agregar tu implementación de calendario en el futuro */}
        </div>
    );
};

export const AddReport = () => {
    const [babyName, setBabyName] = useState("");
    const [babies, setBabies] = useState([]);
    const [date, setDate] = useState("");
    const [bedtime, setBedtime] = useState("");
    const [meals, setMeals] = useState("");
    const [diapers, setDiapers] = useState("");
    const [walks, setWalks] = useState("");
    const [water, setWater] = useState("");
    const [meds, setMeds] = useState(false);
    const [kindergarden, setKindergarden] = useState(false);
    const [extra, setExtra] = useState("");
    const [error, setError] = useState("");
    const [selectedBabyId, setSelectedBabyId] = useState("");

    const navigate = useNavigate();

    // Fetch babies on component mount
    useEffect(() => {
        const fetchBabies = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/babies`);
                if (!response.ok) {
                    throw new Error('Failed to fetch babies');
                }
                const data = await response.json();
                setBabies(data);
            } catch (error) {
                console.error('Error fetching babies:', error);
                setError('Error fetching baby names');
            }
        };

        fetchBabies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!babyName || !date || !bedtime || !meals || !diapers || !walks || !water) {
            setError("Please fill in all required fields.");
            return;
        }

        const reportData = {
            baby_id: parseInt(selectedBabyId, 10),
            date: date,
            bedtime: parseFloat(bedtime),
            meals: parseInt(meals, 10),
            diapers: parseInt(diapers, 10),
            walks: parseInt(walks, 10),
            water: parseFloat(water),
            meds: meds,
            kindergarden: kindergarden,
            extra: extra
        };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(`Error ${response.status}: ${errorText}`);
                return;
            }

            const result = await response.json();
            console.log('Report added successfully:', result);
            setError("");
        } catch (error) {
            setError('Network error: ' + error.message);
        }
    };

    return (
        <div className="main-container">
            <CalendarPlaceholder />
            <div className="form-container">
                <h2>Add New Report</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="column-one">
                        <label>Baby Name:</label>
                        <select
                            value={babyName}
                            onChange={(e) => {
                                const name = e.target.value;
                                setBabyName(name);
                                // Find the selected baby's ID
                                const selectedBaby = babies.find(baby => baby.name === name);
                                setSelectedBabyId(selectedBaby ? selectedBaby.id : "");
                            }}
                            required
                        >
                            <option value="">Select a baby</option>
                            {babies.map(baby => (
                                <option key={baby.id} value={baby.name}>{baby.name}</option>
                            ))}
                        </select>

                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                        <label>Bedtime (hours):</label>
                        <input
                            type="number"
                            step="0.1"
                            value={bedtime}
                            onChange={(e) => setBedtime(e.target.value)}
                            required
                        />

                        <label>Meals:</label>
                        <input
                            type="number"
                            value={meals}
                            onChange={(e) => setMeals(e.target.value)}
                            required
                        />

                        <label>Diapers:</label>
                        <input
                            type="number"
                            value={diapers}
                            onChange={(e) => setDiapers(e.target.value)}
                            required
                        />

                        <label>Walks:</label>
                        <input
                            type="number"
                            value={walks}
                            onChange={(e) => setWalks(e.target.value)}
                            required
                        />

                        <label>Water (liters):</label>
                        <input
                            type="number"
                            step="0.1"
                            value={water}
                            onChange={(e) => setWater(e.target.value)}
                            required
                        />
                    </div>
                    <div className="column-two">
                        <label>Medications:</label>
                        <input
                            type="checkbox"
                            checked={meds}
                            onChange={(e) => setMeds(e.target.checked)}
                        />

                        <label>Kindergarden:</label>
                        <input
                            type="checkbox"
                            checked={kindergarden}
                            onChange={(e) => setKindergarden(e.target.checked)}
                        />

                        <label>Extra Notes:</label>
                        <textarea
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                        ></textarea>

                        <button type="submit">Add Report</button>
                        <button onClick={() => navigate(`/average-report/${selectedBabyId}`)}>Go to Average Report</button>
                        <button onClick={() => navigate(`/baby/${selectedBabyId}/reports`)}>View Baby Reports</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
