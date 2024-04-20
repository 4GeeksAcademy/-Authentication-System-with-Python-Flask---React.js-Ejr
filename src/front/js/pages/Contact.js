import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("jwt-token");  

        fetch(`${process.env.BACKEND_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Email Sent!',
                    text: 'We will respond as soon as possible.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Message sent:', data);
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });
    };

    return (
        <div className="page-contact">
            <div className="contact section">
                <h2 className="contact-title">Contact Us</h2>
                <p className="contact-description">If you have any questions, please don't hesitate to send us a message.</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Your Name" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" placeholder="Subject" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="5" placeholder="Your Message" required onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
                <div className="additional-contact-info">
                    <p>You can also contact us by:</p>
                    <ul>
                        <li>Phone: +34 665 245 214</li>
                        <li>Address: Calle San José, 17, Madrid, Spain</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Contact;
