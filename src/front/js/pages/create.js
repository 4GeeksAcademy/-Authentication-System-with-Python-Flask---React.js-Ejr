import React, { useContext, useState } from "react";
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
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.createUser(email, password);
    console.log("form submitted");
    console.log(store.verifiedUser)
  };


  return (
      <div className="col-11">
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
