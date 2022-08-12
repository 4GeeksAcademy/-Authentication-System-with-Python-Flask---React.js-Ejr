import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import dogpic from "../../img/dog1.jpg";
import { Link } from "react-router-dom";

export const SingleDog = () => {
  let imageStyle = {
    backgroundSize: "contain",
    backgroundPosition: "50%",
    objectFit: "cover",
    display: "block",
    height: "auto",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    borderRadius: "15px",
  };

  let infostyle = {
    backgroundColor: "rgba(0,0,0,0.4)",
  };

  return (
    <div className="container-fluid">
      <div className="container m-aut">
        <div className="row pb-5">
          <div className="col-lg-6 col-md-12 align-items-center my-auto m-auto rounded mt-4">
            <img
              className="col"
              src={dogpic}
              alt="card image"
              style={imageStyle}
            />
          </div>
          <div className="col-lg-6 col-md-12 rounded mt-4" style={infostyle}>
            <h1 className="text-light mt-4">Mocho</h1>
            <hr className="light" />
            <p>Juguetón. Ladra mucho, no es muy amigable con otros perros.</p>

            <h2 className="text-light">Raza</h2>
            <hr className="light col-3" />
            <p>Border-Collie</p>
            <h2 className="text-light">Direccion:</h2>
            <hr className="light col-3" />
            <p>125m Este de la Pops de Escazu.</p>
          </div>
        </div>
        <div className="row mb-4">
          <Link to={"/homecaminador"}>
            <button className="btn btn-primary btn-lg rounded-pill">
              Ir atras
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

SingleDog.propTypes = {
  match: PropTypes.object,
};
