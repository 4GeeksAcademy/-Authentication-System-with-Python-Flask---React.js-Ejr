import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const { store, actions } = useContext(Context);
  let history = useHistory();

  const signup = async () => {
    try {
      const response = await fetch(store.url + "/signup", {
        method: "POST",
        body: JSON.stringify({ User: user, Password: password }),
        headers: {
          "access-control-allow-origin": "*",
          "Content-Type": "application/json",
        },
      });
      const confirmation = await response.json();
      if (response.status == 200) {
        alert(confirmation.msg);
        history.push("/login");
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
            signup();
          }}
        >
          Sign up
        </a>
        <h6 className="my-2">{result}</h6>
      </form>
    </div>
  );
};