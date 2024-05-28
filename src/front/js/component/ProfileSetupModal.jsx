import React from 'react';
import '../../styles/Modals.css'; // Importa los estilos

const ProfileSetupModal = ({ show, handleClose, handlePrev, signUpData, setSignUpData }) => {
    const handleChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSignUpData({ ...signUpData, imageFile: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let success = await actions.submitSignUpForm(signUpData);
            if (success) {
                navigate('/login');
            } else {
                setError('Failed to create user. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
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
                        <form>
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
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={signUpData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={signUpData.lastName}
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
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handlePrev}>Go Back</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Complete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupModal;
