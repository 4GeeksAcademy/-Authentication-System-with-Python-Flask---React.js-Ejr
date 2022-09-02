import React, { useContext } from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const CardOwner = (props) => {
  const [flip, setFlip] = useState(true);
  const { store, actions } = useContext(Context);

  let imageStyle = {
    backgroundSize: "contain",
    backgroundPosition: "50%",
    objectFit: "cover",
    display: "block",
    width: "400px",
    height: "auto",
    overflow: "hidden",
    aspectRatio: "1",
  };

  return (
    <div className="col">
      <div className="image-flip">
        <div className="mainflip">
          {flip ? (
            <div className="frontside ">
              <div
                className="card"
                style={{ width: "18rem" }}
                onClick={() => setFlip(false)}
              >
                <img
                  className="card-img-top img-fluid"
                  src={`${process.env.BACKEND_URL}/dogs/download/${props.file}`}
                  alt="card image"
                  style={imageStyle}
                />
              </div>
              <div className="row mt-2 m-auto align-center">
                <div className="col-2"></div>
              </div>
            </div>
          ) : (
            <div className="backside">
              <div
                className="card"
                style={{ width: "18rem" }}
                onClick={() => setFlip(true)}
              >
                <div className="card-header"></div>
                <div className="card-body">
                  <h4 className="card-title">Nombre: {props.name}</h4>
                  <h5 className="card-text">Raza: {props.breed}</h5>
                  <h5 className="card-text">Edad: {props.age}</h5>

                  <Link to={`/editarperro/${props.posStore}`}>
                    <button className="btn btn-info btn-md">
                      Editar informacion de {props.name}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CardOwner;
