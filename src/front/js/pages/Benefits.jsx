import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Benefits.module.css"; // Importación de estilos CSS

const Benefits = () => {
  return (
    <>
      <div className={styles["container"]}>
        <div className="row">
          <div className={`col ${styles.features}`}>
            <h2 className={styles["text-uppercase"]}>Discover the benefits</h2>
            <p className="crossfy-texto-home">
            The complete tool for your box
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4 text-center">
            <div className="icon-block mb-md-5 mb-sm-4">
            <i className="fa-solid fa-group-arrows-rotate" id={styles.icons}></i>
              <h3>Community</h3>
              <p className="crossfy-texto-home">
              The pride of belonging to a community with its own identity,
                with a different image and aesthetic.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 text-center">
            <div className="icon-block mb-md-5 mb-sm-4">
            <i className="fa-regular fa-bell" id={styles.icons}></i>
              <h3>Notifications</h3>
              <p className="crossfy-texto-home">
              Enough of intermediaries and WhatsApp groups. With Crossfy,
                Communicate in real time with your partners.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 text-center">
            <div className="icon-block mb-md-5 mb-sm-4">
            <i className="fa-regular fa-calendar" id={styles.icons}></i>
              <h3>Class Reservations</h3>
              <p className="crossfy-texto-home">
              Comprehensive management of classes and shifts. Never book a class
                It was so easy. QR Check in.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4 text-center">
            <div className="icon-block mb-md-0 mb-sm-4">
              <i class="fa-solid fa-dumbbell" id={styles.icons}></i>
              <h3>WODs and routines</h3>
              <p className="crossfy-texto-home">
              Distance training and personalized WODs by programs.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 text-center">
            <div className="icon-block mb-md-0 mb-sm-4">
            <i className="fa-solid fa-scale-balanced" id={styles.icons}></i>
              <h3>Cash and Product Control</h3>
              <p className="crossfy-texto-home">
              Precisely manage cash flow and control your inventory
                of products efficiently.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 text-center">
            <div className="icon-block">
            <i className="fa-solid fa-microchip" id={styles.icons}></i>
              <h3>Cutting-edge technology</h3>
              <p className="crossfy-texto-home">
              We constantly improve our platform based on the
                feedback from our clients.
                <strong>gym software</strong> you have been
                expecting.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p>
          <a
            className="btn btn-success btn-lg"
            href=""
            title="Quiero saber más!"
          >
            <i class="fa-brands fa-whatsapp"></i> I want to know more!
          </a>
        </p>
      </div>
      </>
  );
};

export default Benefits;
