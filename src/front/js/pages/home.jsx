import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.jsx";
import { LoginRegister } from "../component/registerModal.jsx";
import { Jumbotron } from "../component/jumbotron.jsx";
import RutaDestacada from "../component/rutaDestacada.jsx";
import { ForgotPassword } from "../component/recuperar-contraseña.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {/* <Navbar /> */}
      <LoginRegister />
      {/* <ForgotPassword /> */}
      <Jumbotron />
      <h4>Rutas destacadas 🔥</h4>
      <div className=" row justify-content-around justify-content-xxl-evenly mx-5">
        <div className="col-xs-12 col-xxl-4 d-flex justify-content-center">
          <RutaDestacada />
        </div>
        <div className="col-xs-12 col-xxl-4 d-flex justify-content-center">
          <RutaDestacada />
        </div>
        <div className="col-xs-12 col-xxl-4 d-flex justify-content-center">
          <RutaDestacada />
        </div>
      </div>
    </>
  );
};
