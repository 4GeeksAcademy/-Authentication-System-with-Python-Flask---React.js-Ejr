import React from "react";

const Contact = () => {
    return (
        <div className="page-contact">
            <div className="contact section">
                <h2 className="contact-title">Contact Us</h2>
                <p className="contact-description">If you have any questions, please don't hesitate to send us a message.</p>
                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" placeholder="Subject" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
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
