import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { AiFillFacebook } from "react-icons/ai";
import { FaHandPointDown } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";

function Contact() {
  return (
    <>
      <div className="container mt-5 my-3 border-success mb-3 col-8">
        <div className="card text-bg-success mb-3 col-12">
          <div className="card-body ">
            <h1 className="card-title1 text-center"> Contacto </h1>
            <h2 className="card-text text-center mt-5">
              ¿Quieres hablar con nosotros?
            </h2>
            <p className="card-text text-center mt-5">
              Envía tus dudas y consultas, responderemos dentro de las
              siguientes 24 hrs.
            </p>
            <p className="card-text text-center">
              Llámanos al +xx x xxxx xxxx WhatsApp +xx x xxxx xxxx
            </p>
            <h6 className="card-text text-center mt-5">
              Horario de Atención: lunes a viernes 9am - 14pm 15pm - 19pm
            </h6>
            <p className="card-text text-center mt-5">
              ¡No dudes en contactarnos! <FontAwesomeIcon icon={faSmileBeam} />
            </p>
          </div>
        </div>
        <h6 className="mt-5">
          © Casino Corporativo <FontAwesomeIcon icon={faSeedling} /> 2022{" "}
        </h6>
        <p>
          ¡Síguenos en nuestras redes sociales! <FaHandPointDown />
        </p>
        <button className="btn btn-secondary me-3 text-dark border-warning bg-warning rounded-circle">
          <AiFillFacebook />{" "}
        </button>
        <button className="btn btn-secondary text-dark border-warning bg-warning rounded-circle">
          {" "}
          <AiOutlineInstagram />{" "}
        </button>
      </div>
    </>
  );
}

export default Contact;
