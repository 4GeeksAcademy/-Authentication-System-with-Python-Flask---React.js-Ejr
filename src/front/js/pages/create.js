import React, { useContext, useState, useSyncExternalStore } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import getState from "../store/flux";

/*
create models to store user info and user documents
connect models to api
connect flux functions to the api
create input forms and connect them to the flux functions that are connected to the api
*/
export const Create = () => {
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //initiating navigate
  const navigate = useNavigate();


  //this function handling the onclick event when the user submits username and password to create an account
  const handleSubmit = (event) => {
    //need this to stop other behavior
    event.preventDefault();

    //createUser function in Flux, we need to write code
    //to double check data integretity before sending to the flux function
    //for it to be safer
    actions.createUser(email, password);

    //send the new user to test their login/login for the first time
    navigate("/login")
  };


  return (
      <div className="col-6 my-5">
      <div className="row">
        <div className="col-11 text-center m-2 align-items-center">
          <h1>Please create an account</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-3 m-2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="mail">Email:</label>
        <input
          type="email"
          id="mail"
          name="mail"
          value={email}
          placeholder="email@email.com"
          onChange={(event) => setEmail(event.currentTarget.value)}
        ></input>
        <br></br>
        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          id="pass"
          name="pass"
          minLength="8"
          placeholder="*********"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        ></input>
        <br></br>
        <input
          type="submit"
          value="Submit"
        ></input>
      </form>
      </div>
      </div>
    </div>
  );
};
