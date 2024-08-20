import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/contact.css";  // Asegúrate de crear y enlazar este archivo CSS

export const Contact = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <section className="contact-section text-center mt-5">
                <h2 style={{ color: "#6793AE" }} className="fw-bold" >Contáctanos</h2>
                <p className="text-secondary mt-3">
                    ¿Tienes alguna pregunta o estás interesado en nuestros servicios? ¡Estamos aquí para ayudarte! Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
            </section>
            <section className="contact-form-section mt-5 section-margin">
                <form className="row g-3 justify-content-center">
                    <div className="col-md-5">
                        <label htmlFor="first-name" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="first-name" placeholder="Ingresa tu nombre" />
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="last-name" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="last-name" placeholder="Ingresa tu apellido" />
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="correo@ejemplo.com" />
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="company" className="form-label">Empresa</label>
                        <input type="text" className="form-control" id="company" placeholder="Nombre de la empresa (opcional)" />
                    </div>

                    <div className="col-md-10">
                        <label htmlFor="message" className="form-label">Mensaje</label>
                        <textarea className="form-control" id="message" aria-label="Mensaje" style={{ height: "150px" }} placeholder="Describe cómo podemos ayudarte"></textarea>
                    </div>

                    <div className="col-md-10 d-flex justify-content-start">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Acepto la Política de Privacidad
                            </label>
                        </div>
                    </div>

                    <div className="col-md-10 text-center mt-3">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </section>
        </div>
    );
};