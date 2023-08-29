import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

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
    <div className="text-center container mt-5">
      <h1>Signup</h1>
      <form onSubmit={signup}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="exampleInputName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputLastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            id="exampleInputLastName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDni" className="form-label">
            Dni
          </label>
          <input
            type="text"
            className="form-control"
            name="dni"
            id="exampleInputDni"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
};
Signup.propTypes = {
  match: PropTypes.object,
};
