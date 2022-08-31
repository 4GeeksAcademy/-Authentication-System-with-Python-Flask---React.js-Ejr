import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        username: username,
        password: password,
      }),
    };
    try {
      const resp = await fetch(process.env.BACKEND_URL + "/api/signup", opts);
      if (resp !== 200) {
        throw new Error("Error signin up");
        return false;
      }
      const data = await resp.json();
      return true;
    } catch (error) {
      console.error(`${error.name} : ${error.message}`);
    }
  };
  return (
    <div className="container text-center">
      <div className="row justify-content-center mt-5">
        <div className="col-6 mt-5">
          <div className="card" style={{ width: "18rem;" }}>
            <div className="card-body">
              <h5 className="card-title">Signup</h5>
              <p className="card-text pt-2">
                Join us now and start exploring our listings
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <input
                className="list-group-item"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                className="list-group-item"
                value={email}
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </ul>
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
                value={password}
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </ul>
            <div className="card-body">
              <a href="#" className="btn btn-success" onClick={handleSubmit}>
                Signup
              </a>
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
  );
};
