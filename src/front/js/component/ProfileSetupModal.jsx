import React from 'react';
import '../../styles/Modals.css'; // Importa los estilos

const ProfileSetupModal = ({ show, handleClose, handlePrev, signUpData, setSignUpData, onComplete }) => {
    const handleChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSignUpData({ ...signUpData, imageFile: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Set up your profile</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="imageFile" className="form-label">Upload Profile Picture</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imageFile"
                                    name="imageFile"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={signUpData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bio" className="form-label">About Yourself</label>
                                <textarea
                                    className="form-control"
                                    id="bio"
                                    name="bio"
                                    value={signUpData.bio}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    id="gender"
                                    name="gender"
                                    value={signUpData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Complete</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handlePrev}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupModal;
