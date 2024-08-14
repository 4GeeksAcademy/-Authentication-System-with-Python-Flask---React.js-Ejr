import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.jsx";
import { LoginRegister } from "../component/registerModal.jsx";
import { Jumbotron } from "../component/jumbotron.jsx";
import RutaDestacada from "../component/rutaDestacada.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Navbar />
      <LoginRegister />
      <Jumbotron />
      <h2>Rutas destacadas 🔥</h2>
      <div className="d-flex justify-content-around justify-content-xxl-evenly mx-5">
        <RutaDestacada />
        <RutaDestacada />
        <RutaDestacada />
      </div>

      {/* // Aquí irá el componente Jumbotron+searchbar
		// Aquí irá el componente RutasDestacadas
		//El footer se renderiza en layout de manera predefinida */}
    </>
  );
};
