import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const { store, actions } = useContext(Context);

  let history = useHistory();

  const login = async () => {
    try {
      const response = await fetch(store.url + "/login", {
        method: "POST",
        body: JSON.stringify({ User: user, Password: password }),
        headers: {
          "access-control-allow-origin": "*",
          "Content-Type": "application/json",
        },
      });

      const confirmation = await response.json();

      if (response.ok == false) setResult("Something went wrong");
      if (response.status == 200) {
        localStorage.setItem("token", JSON.stringify(confirmation.token));
        localStorage.setItem("user", JSON.stringify(user));
        setResult(confirmation.msg);
        actions.verify();
        /* history.push("/private"); */
      } else {
        setResult(confirmation.msg);
      }
    } catch (error) {
      setResult("It was not possible to reach the server");
    }
  };

  return (
    <div className="container my-3">
      <form>
        <div className="row mb-3">
          <label htmlFor="inputUser" className="col-sm-2 col-form-label">
            User
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputUser"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <a
          className="btn btn-light mx-2"
          onClick={() => {
            login();
          }}
        >
          Login
        </a>
        <h6 className="my-2">{result}</h6>
      </form>
    </div>
  );
};