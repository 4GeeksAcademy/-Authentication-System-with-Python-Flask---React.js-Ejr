import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
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
        <div className="form">
            <div className="form-title">Contáctanos</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Tu Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Tu Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Tu Mensaje"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    required
                />
                <button type="submit" className="form-button">Enviar</button>
            </form>
        </div>
    );
};

export default ContactForm;
