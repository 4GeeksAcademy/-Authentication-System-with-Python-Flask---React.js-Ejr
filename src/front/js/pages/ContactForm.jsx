import React, { useState } from 'react';
import './ContactForm.css';
import bg from "../../img/man.jpg";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
    };

    return (
        <div className="contact-form-container" style={{ backgroundImage: `url(${bg})` }}>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>CONTACT US</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Subscribe</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
