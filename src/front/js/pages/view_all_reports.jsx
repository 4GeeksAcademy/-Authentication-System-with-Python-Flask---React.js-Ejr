import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPlus, faChartBar, faMoon, faUtensils, faBabyCarriage, faDroplet, faPills, faSchool, faBaby } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import "../../styles/view_all_reports.css";

export const ViewReports = () => {
    const { babyId } = useParams();
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [babyName, setBabyName] = useState("");
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {

        if (!store.token) {
            navigate('/login');
            return;
        }

        const fetchReportsAndBabyName = async () => {
            const reportsUrl = `${process.env.BACKEND_URL}api/baby/${babyId}/reports`;
            const babyUrl = `${process.env.BACKEND_URL}api/babies`;

            try {
                const babyResponse = await fetch(babyUrl, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
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

                const reportsResponse = await fetch(reportsUrl, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
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
    }, [babyId, store.token, navigate]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="vr-container">
            <h2 className="vr-title">{babyName || "Loading..."}'s Reports</h2>
            {error && <div className="error">{error}</div>}
            {reports.length > 0 ? (
                <div className="vr-reports-container">
                    <div className="vr-reports-wrapper">
                        {reports.map(report => (
                            <div className="card vr-card" key={report.id}>
                                <div className="vr-card-body card-body">
                                    <div className="vr-card-column">
                                        <p><FontAwesomeIcon icon={faCalendar} />  {report.date} </p>
                                        <p> <FontAwesomeIcon icon={faMoon} /> {report.bedtime} hours</p>
                                        <p> <FontAwesomeIcon icon={faUtensils} /> {report.meals}</p>
                                        <p><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 300 600 200"
                                            fill="currentColor"
                                            style={{ width: '27px', height: '27px' }}
                                        >
                                            <path d="M106.667,341.333c-15.04,0-29.611,4.117-43.307,12.267l-21.717,14.357c24.107,56,68.117,100.928,123.051,124.907l14.869-22.443C187.691,457.152,192,442.219,192,426.667C192,379.605,153.728,341.333,106.667,341.333z" />
                                            <path d="M426.667,234.667c0-11.776,9.536-21.333,21.333-21.333h42.667c-0.064-35.307-28.779-64-64.107-64H85.44c-35.328,0-64.043,28.693-64.107,64H64c11.797,0,21.333,9.557,21.333,21.333S75.797,256,64,256H21.333v14.037c0,19.221,2.432,37.888,6.571,55.872l12.8-8.448c20.949-12.48,43.456-18.795,65.963-18.795c70.592,0,128,57.408,128,128c0,23.211-6.613,46.251-19.115,66.667l-8.725,13.163c10.965,2.389,22.101,4.267,33.6,5.013c5.291,0.341,10.539,0.491,15.765,0.491c16.704,0,33.109-1.899,49.088-5.291l-8.384-12.672c-12.928-21.013-19.563-44.096-19.563-67.371c0-70.592,57.408-128,128-128c23.253,0,46.315,6.635,66.731,19.157l13.696,6.997c3.221-15.531,4.907-31.445,4.907-47.488V256H448C436.203,256,426.667,246.443,426.667,234.667z" />
                                            <path d="M320,426.667c0,15.595,4.331,30.549,12.864,44.416l14.741,22.251c25.024-10.624,48.341-25.536,68.843-44.757c24.768-23.211,43.819-51.52,56.469-82.432l-21.76-11.136C389.461,317.397,320,364.032,320,426.667z" />
                                        </svg> {report.diapers}</p>
                                        <p><FontAwesomeIcon icon={faBabyCarriage} /> {report.walks}</p>
                                        <p><FontAwesomeIcon icon={faDroplet} /> {report.water} liters</p>
                                    </div>
                                    <div className="vr-card-column">
                                        <p><FontAwesomeIcon icon={faPills} /> {report.meds ? "Yes" : "No"}</p>
                                        <p><FontAwesomeIcon icon={faSchool} /> {report.kindergarden ? "Yes" : "No"}</p>
                                        <p><strong>Notes:</strong> {report.extra}</p>
                                    </div>
                                </div>
                                <div className="vr-card-footer card-footer">
                                    <Link to={`/edit_report/${babyId}/${report.id}`} className="btn vr-btn btn-primary">Edit Report</Link>
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
