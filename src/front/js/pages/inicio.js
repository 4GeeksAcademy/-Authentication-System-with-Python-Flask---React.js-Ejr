import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imgInicio from "../../img/inicio.png"
import { Login } from "../component/login.jsx"

export const Inicio = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center rectangle-10">
         
         <Login/>
 
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={imgInicio} alt="Placeholder" className="img-fluid" />
        </div>
      </div>
    </div>
	);
};
