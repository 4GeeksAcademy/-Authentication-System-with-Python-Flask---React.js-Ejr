import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const ViewWalkers = () => {
  const { store, actions } = useContext(Context);

  const profile = "/profile";
  const walkerUrl = process.env.BACKEND_URL + "/api/walkers/";
  const reviewUrl = process.env.BACKEND_URL + "/api/reviews/";

  const imageStyle = {
    objectFit: "cover",
  };

  return (
    <div className="container">
      <h4 className="separator text-muted">Caminadores disponibles</h4>
      <div className="row d-flex justify-content-sm-center">
        {store.walkers.map((walker, index) => {
          return (
            <div
              className="card p-0 col-sm-12 col-md-6 col-lg-3 m-3"
              key={index}
              style={{ width: "18rem" }}
            >
              <img
                src={`${process.env.BACKEND_URL}/walker/download/${walker.file}`}
                className="card-img-top"
                style={imageStyle}
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
                <Link to={profile}>
                  <button
                    className="btn btn-primary"
                    onClick={() => (
                      actions.getInfoProfile(walkerUrl, walker.id),
                      actions.getReviews(reviewUrl, walker.id),
                      actions.getUsers()
                    )}
                  >
                    Ver perfil
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewWalkers;
