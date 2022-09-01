import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import CalendarComp from "../component/CalendarComp";
import Imgee from "../component/imgee";
import Recomnendations from "../component/recomendations";
import Shape2 from "../component/shape2";

const imgStlye = {
  width: "100px",
  height: "100px",
};
const usernameStyle = {
  fontStyle: "italic",
};
const bgColor = {
  background: "#DDD5D0",
  border: "none",
};

const ProfileUser = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container mb-5 mt-5">
        <div className="card mb-3" style={bgColor}>
          <div className="row g-0">
            <div className="col-1">
              <img
                className="rounded-circle"
                src={`${process.env.BACKEND_URL}/${store.user_type}/download/${store.user.file}`}
                style={imgStlye}
              />
            </div>
            <div className="col-lg-7 mt-2 ps-3">
              <div className="card-body">
                <h5 className="card-title" style={usernameStyle}>
                  {store.user.first_name + " " + store.user.last_name}
                </h5>
                <p className="card-text">
                  {store.user.description == "null"
                    ? ""
                    : store.user.description}
                </p>
              </div>
            </div>
            {store.user_type == "walker" ? (
              <div className="col-lg-4 mt-3">
                <h2 className="col">Calendario</h2>
                <CalendarComp />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {store.user_type == "owner" ? (
          <div className="container">
            <h4 className="separator text-muted">Galería</h4>
            <div className="row justify-content-center">
              <Imgee />
              <Imgee />
              <Imgee />
              <Imgee />
              <Imgee />
            </div>
          </div>
        ) : (
          <div className="row">
            <h4 className="separator text-muted">Recomendaciones</h4>
            <Recomnendations />
            <Recomnendations />
            <Recomnendations />
          </div>
        )}

        <Shape2 />
      </div>
    </div>
  );
};

export default ProfileUser;
