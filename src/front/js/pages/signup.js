import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const lastName = data.get("lastname");
    const email = data.get("email");
    const password = data.get("password");
    const dni = data.get("dni");
    const { signup } = actions;
    let resp = await signup(email, password, dni, name, lastName);
    console.log(resp);
    navigate("/login");
  }
  return (
    <div id="signup-page" className="text-center">
      <div className="container wrap-loginSignup">
        <i id="cat-suit" className="fa-solid fa-cat"></i>
        <h1>Signup</h1>
        <form className="pe-3" onSubmit={signup}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="inputName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              id="inputLastName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="inputDni" className="form-label">
              Dni
            </label>
            <input
              type="text"
              className="form-control"
              name="dni"
              id="inputDni"
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="inputPassword1"
            />
          </div>
          <button id="btn-signup" type="submit" className="btn">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
Signup.propTypes = {
  match: PropTypes.object,
};
