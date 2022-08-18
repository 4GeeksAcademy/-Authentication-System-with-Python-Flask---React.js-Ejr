import React, { useContext } from "react";
import { Context } from "../store/appContext";
import dogpic from "../../img/dog1.jpg";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const CardOwner = () => {
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
                  src={dogpic}
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
                  <h4 className="card-title">{store.dogs.name}</h4>
                  <h5 className="card-text">{store.dogs.breed}</h5>
                  <button className="btn btn-info btn-md">
                    Editar informacion de {store.dogs.name}
                  </button>
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
