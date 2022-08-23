import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="container text-center">
      <div className="row justify-content-center mt-5">
        <div className="col-6 mt-5">
          <div className="card" style={{ width: "18rem;" }}>
            <div className="card-body">
              <h5 className="card-title">Signup</h5>
              <p className="card-text">
                Join us now and start exploring our page
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <input
                className="list-group-item"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                className="list-group-item"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </ul>
            <div className="card-body">
              <a href="#" className="btn btn-success" onClick={handleSubmit}>
                Submit
              </a>
              <Link to={"/home"}>
                {" "}
                <a href="#" className="card-link">
                  {" "}
                  Home{" "}
                </a>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
