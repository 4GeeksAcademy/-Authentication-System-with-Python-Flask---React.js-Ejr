import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import CalendarComp from "../component/CalendarComp";
import Recomnendations from "../component/recomendations";
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
        <h4 className="separator text-muted">Recomendaciones</h4>

        <div className="row">
          <Recomnendations />
          <Recomnendations />
          <Recomnendations />
        </div>
        <Shape2 />
      </div>
    </div>
  );
};

export default Profile;
