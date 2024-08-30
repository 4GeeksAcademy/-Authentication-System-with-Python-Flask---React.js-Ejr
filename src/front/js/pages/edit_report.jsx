import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMoon, faUtensils, faBabyCarriage, faDroplet, faPills, faSchool } from '@fortawesome/free-solid-svg-icons';
import "../../styles/edit_report.css";

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
            console.log("Fetching URL:", url);

            try {
                const response = await fetch(url);
                console.log("Response status:", response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response:", errorText);
                    setError(`Error ${response.status}: ${errorText}`);
                    return;
                }

                const result = await response.json();
                console.log("Report result:", result);
                setReport(result);
            } catch (error) {
                console.error("Network error:", error);
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
        console.log("Submitting to URL:", url);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(report),
            });
            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                setError(`Error ${response.status}: ${errorText}`);
                return;
            }

            navigate(`/baby/${babyId}/reports`);
        } catch (error) {
            console.error("Network error:", error);
            setError('Network error: ' + error.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="edit-report__container">
            <h2 className="edit-report__title">Edit Report</h2>
            {error && <div className="edit-report__error">{error}</div>}
            <form onSubmit={handleSubmit} className="edit-report__form">
                <div className="edit-report__form-row">
                    <div className="edit-report__form-group">
                        <label><FontAwesomeIcon icon={faCalendar} /></label>
                        <input
                            type="date"
                            name="date"
                            value={report.date.substring(0, 10)}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="edit-report__form-group">
                        <label><FontAwesomeIcon icon={faMoon} /></label>
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
                </div>
                <div className="edit-report__form-row">
                    <div className="edit-report__form-group">
                        <label><FontAwesomeIcon icon={faUtensils} /></label>
                        <input
                            type="number"
                            name="meals"
                            value={report.meals}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="edit-report__form-group">
                        <label>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 600"
                                fill="currentColor"
                                style={{ width: '44px', height: '44px' }}
                            >
                                <path d="M106.667,341.333c-15.04,0-29.611,4.117-43.307,12.267l-21.717,14.357c24.107,56,68.117,100.928,123.051,124.907l14.869-22.443C187.691,457.152,192,442.219,192,426.667C192,379.605,153.728,341.333,106.667,341.333z" />
                                <path d="M426.667,234.667c0-11.776,9.536-21.333,21.333-21.333h42.667c-0.064-35.307-28.779-64-64.107-64H85.44c-35.328,0-64.043,28.693-64.107,64H64c11.797,0,21.333,9.557,21.333,21.333S75.797,256,64,256H21.333v14.037c0,19.221,2.432,37.888,6.571,55.872l12.8-8.448c20.949-12.48,43.456-18.795,65.963-18.795c70.592,0,128,57.408,128,128c0,23.211-6.613,46.251-19.115,66.667l-8.725,13.163c10.965,2.389,22.101,4.267,33.6,5.013c5.291,0.341,10.539,0.491,15.765,0.491c16.704,0,33.109-1.899,49.088-5.291l-8.384-12.672c-12.928-21.013-19.563-44.096-19.563-67.371c0-70.592,57.408-128,128-128c23.253,0,46.315,6.635,66.731,19.157l13.696,6.997c3.221-15.531,4.907-31.445,4.907-47.488V256H448C436.203,256,426.667,246.443,426.667,234.667z" />
                                <path d="M320,426.667c0,15.595,4.331,30.549,12.864,44.416l14.741,22.251c25.024-10.624,48.341-25.536,68.843-44.757c24.768-23.211,43.819-51.52,56.469-82.432l-21.76-11.136C389.461,317.397,320,364.032,320,426.667z" />
                            </svg>
                        </label>
                        <input
                            type="number"
                            name="diapers"
                            value={report.diapers}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                </div>
                <div className="edit-report__form-row">
                    <div className="edit-report__form-group">
                        <label><FontAwesomeIcon icon={faBabyCarriage} /></label>
                        <input
                            type="number"
                            name="walks"
                            value={report.walks}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="edit-report__form-group">
                        <label><FontAwesomeIcon icon={faDroplet} /></label>
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
                </div>
                <div className="edit-report__form-row">
                    <div className="edit-report__form-group">
                        <label><FontAwesomeIcon icon={faPills} /></label>
                        <label className="switch switch-edit">
                            <input
                                type="checkbox"
                                name="meds"
                                checked={report.meds}
                                onChange={handleChange}
                            />
                            <span className="slider round slider-edit"></span>
                        </label>
                    </div>
                    <div className="edit-report__form-group">
                        <label><FontAwesomeIcon icon={faSchool} /></label>
                        <label className="switch switch-edit">
                            <input
                                type="checkbox"
                                name="kindergarden"
                                checked={report.kindergarden}
                                onChange={handleChange}
                            />
                            <span className="slider round slider-edit"></span>
                        </label>
                    </div>
                </div>
                <div className="edit-report-textarea__form-row ">
                    <div className="edit-report-textarea__form-group " style={{ width: "100%" }}>
                        <label>Notes:</label>
                        <textarea
                            name="extra"
                            value={report.extra}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
            <button type="submit" className="edit-report__btn">Save Changes</button>
        </div>
    );
};
