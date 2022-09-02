import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import resena from "../../img/resena.png";

import CalendarComp from "../component/CalendarComp";
import Reviews from "../component/reviews";
import Shape2 from "../component/shape2";

const imgStlye = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
};
const usernameStyle = {
  fontStyle: "italic",
};
const bgColor = {
  background: "#DDD5D0",
  border: "none",
};

const Profile = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container mb-5 mt-5">
        <div className="card mb-3" style={bgColor}>
          <div className="row g-0">
            <div className="col-1">
              <img
                className="rounded-circle"
                src={`${process.env.BACKEND_URL}/walker/download/${store.walkerProfile.file}`}
                style={imgStlye}
              />
            </div>
            <div className="col-lg-7 mt-3">
              <div className="card-body">
                <h5 className="card-title" style={usernameStyle}>
                  {store.walkerProfile.first_name +
                    " " +
                    store.walkerProfile.last_name}
                </h5>
                <p className="card-text">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia.
                </p>
              </div>
            </div>

            <div className="col-lg-4 mt-3">
              <h2 className="col">Calendario</h2>
              <CalendarComp />
            </div>
          </div>
        </div>
        <h4 className="separator text-muted">Reseñas</h4>

        <button
          type="button"
          className="btn btn-success float-end"
          data-bs-toggle="modal"
          data-bs-target="#recomendation"
        >
          Hacer recomendación
        </button>

        <div
          className="modal fade"
          id="recomendation"
          tabIndex="-1"
          aria-labelledby="recomendation"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="recomendation">
                  Nueva recomendación
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <textarea className="form-control"></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-success">
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {store.reviews.length == 0 ? (
            <img src={resena} />
          ) : (
            store.reviews.map((review, index) => {
              return store.owners.map((owner) => {
                return review.owner_id == owner.id ? (
                  <Reviews
                    key={index}
                    comment={review.comment}
                    img={`${process.env.BACKEND_URL}/owner/download/${owner.file}`}
                    name={owner.first_name}
                  />
                ) : (
                  ""
                );
              });
            })
          )}
        </div>
        <Shape2 />
      </div>
    </div>
  );
};

export default Profile;
