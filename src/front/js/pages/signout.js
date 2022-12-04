import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Home } from "./home";

export const Signout = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="jumbotron col-6 my-5">
      {store.token == "" ? <h1>You have successfuly signed out</h1> : <h1>Something went wrong</h1>}
    </div>
  );
};
