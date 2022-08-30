import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const ViewWalkers = () => {
  const { store, actions } = useContext(Context);

  let navigate = useNavigate();
  const profile = "/profile";
  const walkerUrl = process.env.BACKEND_URL + "/api/walkers/";

  const handleRoute = () => {
    navigate(profile);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-between mb-3">
        {store.walkers.map((walker, index) => {
          return (
            <div
              className="card p-0 col-sm-12 col-md-6 col-lg-4 my-2"
              key={index}
              style={{ width: "18rem" }}
            >
              <img
                src={`${process.env.BACKEND_URL}/walker/download/${walker.file}`}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{walker.username}</h5>

                <p className="card-text ">
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <strong className="m-2">12</strong>
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => (
                    actions.getInfo(walkerUrl, walker.id), navigate(profile)
                  )}
                >
                  Ver perfil
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewWalkers;
