import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imgInicio from "../../img/inicio.png"

export const Inicio = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center rectangle-10">
          <form style={{ width: '80%' }}>
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={imgInicio} alt="Placeholder" className="img-fluid" />
        </div>
      </div>
    </div>
	);
};
