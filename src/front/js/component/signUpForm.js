import React, { useState } from 'react';
import '../../styles/authForms.css';


const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
        });

        if (response.ok) {
            alert('User created successfully. Please go to the menu and login.');
        } else {
            console.error('Signup failed');
        }
    };

    return (
        
        <form onSubmit={handleSubmit} className="form-container">
            <div className="page-title">SignUp</div>
            <div className="form-group">
                <label className="label">First Name:</label>
                <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" />
            </div>
            <div className="form-group">
                <label className="label">Last Name:</label>
                <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" />
            </div>
            <div className="form-group">
                <label className="label">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            </div>
            <div className="form-group">
                <label className="label">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            </div> 
            
            <div className="form-group">
                <label className="label">Confirm Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            </div>

            <button type="submit" className="submit-button">Submit</button>
            
        </form>
    );
};
//Change logic for Confirm password 
//add visibility option for password
export default SignUpForm;