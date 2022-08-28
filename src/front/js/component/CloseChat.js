import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../pages/fire";
import Signin from "./Signin";

const CloseChat = () => {
  const { store, actions } = useContext(Context);
  const homeO = "/homedueno";
  const homeW = "/homecaminador";
  let navigate = useNavigate();

  const goHome = () => {
    store.user_type == "walker" ? navigate(homeW) : navigate(homeO);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-lg-3" id="col">
          <i
            className="fas fa-chevron-left mt-3"
            type="button"
            onClick={goHome}
          ></i>
        </div>
        <div className="col-sm-12 col-lg-3" id="col">
          <Signin />
        </div>
        <div className="col-sm-12 col-lg-3" id="col">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => auth.signOut()}
          >
            Cerrar el chat de google
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseChat;
