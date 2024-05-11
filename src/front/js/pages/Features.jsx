import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Features.module.css"; // Importación de estilos CSS

const Features = () => {
  return (
    <div className={`container ${styles.features}`}>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Membership</h5>
              <p className="card-text">Basic - $30/month</p>
              <p className="card-text">Premium - $50/month</p>
              <p className="card-text">Unlimited - $70/month</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Classes</h5>
              <p className="card-text">Yoga - 10:00 AM</p>
              <p className="card-text">CrossFit - 12:00 PM</p>
              <p className="card-text">Weightlifting - 2:00 PM</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">About</h5>
              <p className="card-text">a</p>
              <p className="card-text">b</p>
              <p className="card-text">c</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
