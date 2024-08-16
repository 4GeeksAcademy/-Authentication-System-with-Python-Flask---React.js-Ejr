import React, { useState } from "react";

export const AddReport = () => {
    const [babyId, setBabyId] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!babyId || !date || !bedtime || !meals || !diapers || !walks || !water) {
            setError("Please fill in all required fields.");
            return;
        }

        const reportData = {
            baby_id: parseInt(babyId, 10),
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
            const response = await fetch(`${process.env.BACKEND_URL}/report`, {
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
            setError(""); // Limpiar errores si el reporte se añade correctamente
        } catch (error) {
            setError('Network error: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Add New Report</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Baby ID:</label>
                <input
                    type="number"
                    value={babyId}
                    onChange={(e) => setBabyId(e.target.value)}
                    required
                />

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
            </form>
        </div>
    );
};
