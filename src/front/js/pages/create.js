import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import getState from "../store/flux";

/*
create models to store user info and user documents
connect models to api
connect flux functions to the api
create input forms and connect them to the flux functions that are connected to the api
*/
export const Create = () => {
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  return (
    <>
      <h1>Create A New Account</h1>
      <form action="/api/user">
        <label htmlFor="mail">Email:</label>
        <input type="email" id="mail" name="mail" value={email} placeholder="email@email.com" 
          onChange={(event) => setEmail(event.currentTarget.value)}></input>
        <br></br>
        <label htmlFor="pass">Password:</label>
        <input type="password" id="pass" name="pass" minLength="8" value={password} 
          onChange={(event) => setPassword(event.currentTarget.value)}></input>
        <br></br>
        <input type="submit" value="Submit" onClick={() => {
					actions.createUser(email, password)
				}}></input>
      </form>
    </>
  );
};
