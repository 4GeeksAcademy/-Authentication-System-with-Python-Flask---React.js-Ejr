import React from "react";
import '../../styles/Contact.css'

function ContactForm(){ 
    return(
        <div className="contact-form-container">
    <form className="contact-form">
      <div className="form-field">
        <input type="text" id="name" name="name" placeholder="Nombre" required />
        <input type="tel" id="phone" name="phone" placeholder="Telefono" required />
      </div>
      <div className="form-field">
        
      </div>
      <div className="form-field">
        <input type="email" id="email" name="email" placeholder="Email" required />
      </div>
      <div className="form-field">
        <textarea id="message" name="message" rows="4" placeholder="Mensaje" required></textarea>
      </div>
      <button id="submit-button" type="submit">Contactanos</button>
    </form>
  </div>
    )
    
}

export default ContactForm