import React, { useContext } from "react";
import { Context } from "../store/appContext";

import CalendarComp from "../component/CalendarComp";
import Recomnendations from "../component/recomendations";
import Shape2 from "../component/shape2";

const imgStlye = {
  width: "100px",
  height: "auto",
};

const usernameStyle = {
  fontStyle: "italic",
};

const Profile = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-1">
            <img
              className="rounded-circle"
              src={`${process.env.BACKEND_URL}/${store.user_type}/download/${store.user.file}`}
              src={`${process.env.BACKEND_URL}/walker/download/${store.walkerProfile.file}`}
              style={imgStlye}
            />
          </div>
          <div className="col-lg-7 mt-3">
            <h2 className="">{store.user.first_name}</h2>
            <h5>{store.user.description}</h5>
            <h6 className="" style={usernameStyle}>
              {store.user.username}
            </h6>

            <h2 className="">{store.walkerProfile.first_name}</h2>
            <h5 className="">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia.
            </h5>

            <h5 className="">Ubicacion</h5>
          </div>
          <div className="col-lg-4 mt-3">
            <h2 className="col">Calendario</h2>
            <CalendarComp />
          </div>
        </div>

        <h3 className="mt-4">Recomendaciones</h3>
        <div className="row">
          <Recomnendations />
          <Recomnendations />
          <Recomnendations />
        </div>
        <div className="row">
          <div className="col">Horarios</div>
          <div className="col">Sobre mi</div>
        </div>

        <Shape2 />
      </div>
    </div>
  );
};

export default Profile;
