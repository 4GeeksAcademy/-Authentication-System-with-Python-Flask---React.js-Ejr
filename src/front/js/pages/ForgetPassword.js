import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: 'Email Sent!',
                    text: 'Temporary password sent to your email.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.value) {
                        navigate('/reset-password'); 
                    }
                });
            } else {
                setMessage(data.msg);
            }
        } catch (error) {
            setMessage("Failed to send email. Try again later.");
        }
    };

    return (
        <div className="form-password">
            <h1 className="form-password-title">Forgot Password?</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="label-forget">Enter your email to send you a temporary password:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="input-forget mb-3"
                />
                <button className="btn btn-forget" type="submit">Send Password</button>
            </form>
            {message && <p className="msg-forget">{message}</p>}
        </div>
    );
};

export default ForgetPassword;
