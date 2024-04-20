import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const [tempPassword, setTempPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        const dataToSend = {
            temp_password: tempPassword,
            new_password: newPassword
        };

        const apiUrl = `${process.env.BACKEND_URL}/api/reset-password`;
        console.log("Sending data to:", apiUrl, "Data:", dataToSend);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Password reset successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.value) {
                        navigate('/login');
                    }
                });
            } else {
                setMessage(data.msg);
            }
        } catch (error) {
            setMessage("Error to reset password.");
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="reset-form">
        <div className="auth-container-reset">
            <div className="container form-body">
                <h2 className="title-login">Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group-reset">
                        <label htmlFor="tempPassword">Temporary Password:</label>
                        <input
                            type="text"
                            id="tempPassword"
                            value={tempPassword}
                            onChange={(e) => setTempPassword(e.target.value)}
                            placeholder="Enter your temporary password"
                            required
                        />
                    </div>
                    <div className="input-group-reset">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter your new password"
                            required
                        />
                    </div>
                    <div className="input-group-reset">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            required
                        />
                    </div>
                    {message && <div className="error-message mb-4">{message}</div>}
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default ResetPassword;
