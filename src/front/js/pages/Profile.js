import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

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

const Profile = () => {
  const { store, actions } = useContext(Context);
  const [info, setInfo] = useState("");
  const [description, setDescription] = useState(true);

  return (
    <div className="container-fluid">
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-1">
            <img
              className="rounded-circle"
              src={`${process.env.BACKEND_URL}/${store.user_type}/download/${store.user.file}`}
              style={imgStlye}
            />
          </div>
          <div className="col-lg-7 mt-3">
            <h2 className="">{store.user.first_name}</h2>
            <h5>{store.user.description}</h5>
            <h6 className="" style={usernameStyle}>
              {store.user.username}
            </h6>
            <h5 className="">Ubicacion</h5>
          </div>
          <div className="col-lg-4 mt-3">
            <h2 className="col">Calendario</h2>
            <CalendarComp />
          </div>
        </div>

        <h3>Fotos</h3>
        <div className="row ml-2 mr-2">
          <Imgee />
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
