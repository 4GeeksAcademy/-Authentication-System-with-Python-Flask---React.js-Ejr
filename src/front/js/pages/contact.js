import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Contactus = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        // Here you would typically handle the form submission, like sending the data to a server
        console.log({ name, email, subject, message });
        // Optionally, you can clear the form fields after submission
        // setName('');
        // setEmail('');
        // setSubject('');
        // setMessage('');
    };

    return (
        <section className="mb-4 m-3">
            <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
            <p className="text-center w-responsive mx-auto mb-5">
                Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
            </p>

            <div className="row">
                <div className="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <input type="text" id="name" name="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor="name" className={name ? "active" : ""}>Your name</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <input type="text" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="email" className={email ? "active" : ""}>Your email</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <input type="text" id="subject" name="subject" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    <label htmlFor="subject" className={subject ? "active" : ""}>Subject</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form">
                                    <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    <label htmlFor="message">Your message</label>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-md-left">
                            <button className="btn btn-primary" type="submit">Send</button>
                        </div>
                    </form>
                </div>

                <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                        <li><i className="fas fa-map-marker-alt fa-2x"></i>
                            <p>San Francisco, CA 94126, USA</p>
                        </li>
                        <li><i className="fas fa-phone mt-4 fa-2x"></i>
                            <p>+ 01 234 567 89</p>
                        </li>
                        <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                            <p>contact@mdbootstrap.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};