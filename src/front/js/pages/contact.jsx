import React from 'react';
import ContactForm from '../component/contactForm.jsx';

const Contact = () => {
    return (
        <div className="container mt-5">
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <h1 className='text-center mb-4'> Contáctanos</h1>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default Contact;
