import React from "react";
import ContactForm from "../component/ContactForm.jsx";
import navbar from "../component/navbar.js";
import '../../styles/Contact.css'
import Ubication from "../component/Ubication.jsx";

function ContactPage(){
    return(
        <div>
            <header>
            <Navbar/>
        </header>
        <body>
            <div className="title-container">
                <h1>CONTACTO</h1>
                <div className="orange-line">
                </div>
            </div>
        <div className="body-container">
            <div className="ubication">
                <p >Manhattan, New York, NY, United States</p>
                <p className="ubii">999-7777-000</p>
                <p className="ubii">contact@TechSports.com</p>
                <p>mon-fri 8:00-19:00</p>
            </div>
            <div>
            <ContactForm/>
            </div>
           
        </div>
        <div className="ubication-container">
            <Ubication/>
           </div>
        </body>
        

        </div>
        
    )
}

export default ContactPage;