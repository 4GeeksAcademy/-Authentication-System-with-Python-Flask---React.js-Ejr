import React, { useState } from "react";

const ResetPassword = () => {
    const [tempPassword, setTempPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
    
        const dataToSend = {
            temp_password: tempPassword,
            new_password: newPassword
        };
    
        console.log("Sending data:", dataToSend); 
    
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Your password has been successfully reset.");
            } else {
                setMessage(data.msg);
            }
        } catch (error) {
            setMessage("Failed to reset password. Try again later.");
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
