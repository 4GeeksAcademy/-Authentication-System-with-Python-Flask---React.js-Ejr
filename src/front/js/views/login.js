import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "../store/appContext"

import "../../styles/login.css";
import { useState } from "react";

export const LoginScreen = () => {

  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 
  const handleClick = () => {
    console.log({
      email: email,
      password: password
    })
    const opts = {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          email: email,
          password: password
        }
      )
    }
    fetch("https://3001-xetnal-finalproject-rjwnejuo77t.ws-us45.gitpod.io/api/token", opts)
        .then(resp => {
          console.log(resp)
          if(resp.status === 200) return resp.json();
          else alert("There was an error")
        })
        .then(data => {
          console.log("this came from the backend", data)
          sessionStorage.setItem('token', data.access_token)
        })
        .catch(error => {
          console.error("There was an error!!!", error);
        })




  }

  return (
    <div id="login my-5">
      <div className="container my-5">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form">
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label for="email" className="text-info">
                   Email:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={
                      (e) => setEmail(e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label for="password" className="text-info">
                    Contraseña:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={
                      (e) => setPassword(e.target.value)
                    }
                  />
                </div>
                <br />
                <div className="form-group">
                  
                    <button
                      type="button"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="submit"
                      onClick={handleClick}
                    >
                      Entrar
                    </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
