import React, { useState, useContext } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";

export const QuizzesCourse = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        questionTitle: '',
        answerTeacher: '',
        answerUser: '',
        approved: '',
        approvalPercentageUser: '',
        approvalPercentageNumber: '',
        approvalPercentage: '',
        moduleId: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await actions.postQuizzes(formData);
            console.log(response);
            navigate('/success'); // Navegar a una página de éxito o realizar otra acción
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Create Quiz for Course Module</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question Title</label>
                    <input
                        type="text"
                        name="questionTitle"
                        value={formData.questionTitle}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Answer Teacher</label>
                    <input
                        type="text"
                        name="answerTeacher"
                        value={formData.answerTeacher}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Answer User</label>
                    <input
                        type="text"
                        name="answerUser"
                        value={formData.answerUser}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Approved</label>
                    <input
                        type="text"
                        name="approved"
                        value={formData.approved}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Approval Percentage User</label>
                    <input
                        type="text"
                        name="approvalPercentageUser"
                        value={formData.approvalPercentageUser}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Approval Percentage Number</label>
                    <input
                        type="text"
                        name="approvalPercentageNumber"
                        value={formData.approvalPercentageNumber}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Approval Percentage</label>
                    <input
                        type="text"
                        name="approvalPercentage"
                        value={formData.approvalPercentage}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Module ID</label>
                    <input
                        type="text"
                        name="moduleId"
                        value={formData.moduleId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Quiz</button>
            </form>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
                <GoArrowLeft /> Back
            </button>
        </div>
    );
};