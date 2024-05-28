import React, { useState } from 'react';
import '../../styles/Modals.css'; // Importa los estilos

const PersonalInfoModal = ({ show, handleClose, handleNext, onInputChange, signUpData }) => {
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        onInputChange(e.target.name, e.target.value);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setBirthDate(date);

        const age = calculateAge(date);
        if (age < 13) {
            setError('You must be at least 13 years old to sign up.');
        } else {
            setError('');
            onInputChange('age', age); // Set the calculated age in the signUpData
        }
    };
 

    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Get started by creating your account</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={signUpData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={signUpData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={signUpData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="age"
                                    name="age"
                                    value={signUpData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="region" className="form-label">Region</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="region"
                                    name="region"
                                    value={signUpData.region}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="languages" className="form-label">Language</label>
                                <select
                                    className="form-select"
                                    id="languages"
                                    name="languages"
                                    value={signUpData.languages}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleNext}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoModal;
