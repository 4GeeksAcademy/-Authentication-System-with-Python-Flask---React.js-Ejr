import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPlus, faChartBar, faMoon, faUtensils, faBabyCarriage, faDroplet, faPills, faSchool, faBaby } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext"; // Importa el contexto para verificar autenticación
import "../../styles/add_report.css";

// Componente para el marcador de posición del calendario
const CalendarPlaceholder = () => {
    return (
        <div className="card ar-calendar-card">
            <div className="ar-card-body">
                <h3><FontAwesomeIcon icon={faCalendar} /> Calendar</h3>
                {/* Aquí puedes agregar tu implementación de calendario en el futuro */}
            </div>
        </div>
    );
};

// Componente para el interruptor (switch)
const Switch = ({ checked, onChange }) => {
    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="slider"></span>
        </label>
    );
};

export const AddReport = () => {
    const [babyName, setBabyName] = useState("");
    const [babies, setBabies] = useState([]); // Inicializar como arreglo vacío
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

    const { store, logout } = useContext(Context); // Accede al contexto para verificar el estado de autenticación
    const navigate = useNavigate();

    useEffect(() => {
        // Redirige al login si no hay un token en el contexto
        if (!store.token) {
            navigate('/login');
            return;
        }

        const fetchBabies = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}api/babies`, { 
                    headers: {
                        'Authorization': `Bearer ${store.token}` 
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch babies: ${errorText}`);
                }

                const data = await response.json();

                // Asegúrate de que `data` sea un arreglo
                if (Array.isArray(data)) {
                    setBabies(data);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching babies:', error);
                setError('Error fetching baby names');
            }
        };

        fetchBabies();
    }, [store.token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBabyId || !date || !bedtime || !meals || !diapers || !walks || !water) {
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
            const response = await fetch(`${process.env.BACKEND_URL}api/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.token}` // Incluye el token en la solicitud
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
            // Opcional: Redirige o limpia el formulario
        } catch (error) {
            setError('Network error: ' + error.message);
        }
    };

    return (
        <div className="ar-container main-container" style={{marginTop:'55px'}}>
            <div className="card ar-calendar-card">
                <div className="ar-card-body">
                    <CalendarPlaceholder />
                </div>
            </div>
            <div className="card ar-form-card">
                <div className="ar-card-body">
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleSubmit} className="ar-form-grid">
                        <div className="ar-column-one">
                            <div className="ar-form-group">
                                <label><FontAwesomeIcon icon={faBaby} /></label>
                                <select
                                    value={babyName}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setBabyName(name);
                                        // Encuentra el ID del bebé seleccionado
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
                            </div>

                            <div className="ar-form-group">
                                <label><FontAwesomeIcon icon={faCalendar} /></label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="ar-form-group">
                                <label>
                                    <FontAwesomeIcon icon={faMoon} />
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={bedtime}
                                    onChange={(e) => setBedtime(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="ar-form-group">
                                <label><FontAwesomeIcon icon={faUtensils} /></label>
                                <input
                                    type="number"
                                    value={meals}
                                    onChange={(e) => setMeals(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="ar-form-group">
                                <label>
                                    Diapers
                                </label>
                                <input
                                    type="number"
                                    value={diapers}
                                    onChange={(e) => setDiapers(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="ar-form-group">
                                <label><FontAwesomeIcon icon={faBabyCarriage} /></label>
                                <input
                                    type="number"
                                    value={walks}
                                    onChange={(e) => setWalks(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="ar-form-group">
                                <label><FontAwesomeIcon icon={faDroplet} /></label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={water}
                                    onChange={(e) => setWater(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="ar-column-two">
                            <div className="ar-form-group">
                                <label><FontAwesomeIcon icon={faPills} /></label>
                                <Switch
                                    checked={meds}
                                    onChange={(e) => setMeds(e.target.checked)}
                                />
                            </div>

                            <div className="ar-form-group">
                                <label><FontAwesomeIcon icon={faSchool} /></label>
                                <Switch
                                    checked={kindergarden}
                                    onChange={(e) => setKindergarden(e.target.checked)}
                                />
                            </div>

                            <div className="ar-form-group textarea-group">
                                <label>Notes:</label>
                                <textarea
                                    value={extra}
                                    onChange={(e) => setExtra(e.target.value)}
                                ></textarea>
                            </div>

                            <button type="submit" className="ar-btn ar-btn-primary">
                                <FontAwesomeIcon icon={faPlus} /> Submit
                            </button>

                            <div className="ar-button-container">
                                <button
                                    onClick={() => navigate(`/average-report/${selectedBabyId}`)}
                                    className="ar-btn ar-btn-secondary"
                                    disabled={!selectedBabyId} // Deshabilitar si no hay bebé seleccionado
                                >
                                    <FontAwesomeIcon icon={faChartBar} /> Report
                                </button>
                                <button
                                    onClick={() => navigate(`/baby/${selectedBabyId}/reports`)}
                                    className="ar-btn ar-btn-secondary"
                                    disabled={!selectedBabyId} // Deshabilitar si no hay bebé seleccionado
                                >
                                    <FontAwesomeIcon icon={faCalendar} /> View All
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
