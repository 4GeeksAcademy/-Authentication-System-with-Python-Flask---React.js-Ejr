import React, { useContext, useRef } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

//Instalar npm install @emailjs/browser --save
import emailjs from "@emailjs/browser";

export const Contacto = () => {
const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_3q83svb","template_ds0qae1",form.current,"iEJeEfqPLuw3KXA1l")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div class="row imghome">
      <Navbar />
      
	  <div class="row login-row">
                <div class="col-md-6 login-form-1">
                    <h3>Formulario de Contacto</h3>

					<form ref={form} onSubmit={sendEmail}>
          			<label>Nombre</label>
          			<input type="text" class="form-control" placeholder="Tu nombre" name="user_name" />
          			<label>Correo electrónico</label>
          			<input type="email" class="form-control" placeholder="Tu correo electrónico" name="user_email" />
          			<label>Mensaje</label>
          			<textarea class="form-control" placeholder="Mensaje" name="message" />
          			<input  className =" btn btn-secondary mt-3"type="submit" value="Enviar" />
        			</form>    
				</div>
			</div>
      <Footer />
    </div>
  );
};
