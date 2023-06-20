import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const RecoveryPassword = () => {
	const { store, actions } = useContext(Context);

    async function submitForm(e) {
        e.preventDefault()
        let data = new FormData(e.target)
        let resp = await actions.requestPasswordRecovery(data.get("email"))
        if (resp >= 400) {
          return
        }
        console.log("Login exitoso")
      }

	return (
    <div style={{ backgroundColor: '#40768C' }}>
        <div className="container min-vh-100" >

        <h3>Forgot your Password?</h3>
        <form onSubmit={submitForm}>
          <div className="col-md-12 mb-2 position-relative">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" name="email" placeholder="Username" aria-label="Username" />
          </div>
          <div className="col-12 mb-3 ">
            <div className="d-grid gap-2">
              <button className="btn btn-dark  mx-1" type="submit">Recovery Password</button>
            </div>
          </div>
        </form>
      </div>
      </div>
	);
};
