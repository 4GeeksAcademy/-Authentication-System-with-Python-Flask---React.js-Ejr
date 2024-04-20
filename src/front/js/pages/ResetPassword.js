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
        <div className="reset-password-form">
            <h1 className="reset-password-form-title">Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
                <label className="label-reset" htmlFor="tempPassword">Temporary Password:</label>
                <input
                    type="text"
                    id="tempPassword"
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    placeholder="Enter your temporary password"
                    required
                    className="input-reset mb-4"
                />
                <label className="label-reset" htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                    className="input-reset mb-4"
                />
                <label className="label-reset" htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                    className="input-reset mb-4"
                />
                <button className="btn btn-reset" type="submit">Reset Password</button>
            </form>
            {message && <p className="msg-reset">{message}</p>}
        </div>
    );
};

export default ResetPassword;
