import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = (props) => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    actions.login(username, password);
  };
  return (
    <>
      {store.token ? (
        <h1>You are already logged in</h1>
      ) : (
        <div className="container text-center">
          <div className="row justify-content-center mt-5">
            <div className="col-6 mt-5">
              <div className="card" style={{ width: "18rem;" }}>
                <div className="card-body">
                  <h5 className="card-title">Login</h5>
                  <p className="card-text pt-2">Welcome back!</p>
                </div>
                <ul className="list-group list-group-flush">
                  <input
                    className="list-group-item"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <input
                    className="list-group-item"
                    required
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </ul>
                <div className="card-body">
                  <Link to={`/user/${localStorage.getItem("id")}`}>
                    <a
                      href="#"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      Login
                    </a>
                  </Link>
                  <Link to={"/"}>
                    {" "}
                    <a href="#" className="btn btn-danger">
                      {" "}
                      Home{" "}
                    </a>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
