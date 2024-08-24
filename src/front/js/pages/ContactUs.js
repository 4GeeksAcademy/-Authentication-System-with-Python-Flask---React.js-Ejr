import React, { useState } from "react";
import '../styles/ContactUs.css';



export const ContactUs = () => {
    const [formdata, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1>Contact us</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            onChange={handleChange}
                            required
                            style={{ width: '40%' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                            required
                            style={{ width: '40%' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <input type="message"
                            name="message"
                            className="form-control"
                            onChange={handleChange}
                            required
                            style={{ height: '150px', width: '40%' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </div>
    );
};