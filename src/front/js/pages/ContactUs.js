import React from "react";
import "../../styles/ContactUs.css";

const ContactUs = () => {
    return (
        <div className="contact-body">
            <div className="contactUs-container">
                <div className="contactUs-container-left">
                    <div className="p-3 text-center">
                        <h1>Contact Us</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="signup-hidden" id="register">Sign Up</button>
                    </div>
                </div>
                <div className="contactUs-container-right">
                    <form>
                        <h2>Level up your brand</h2>
                        <span>You can reach us anytime via tickeate@gmail.com</span>
                        <input type="name" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="phone" placeholder="Phone" />
                        <input type="help" placeholder="How can we help?" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;