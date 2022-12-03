import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Home } from "./home";

export const User = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="jumbotron col-9">
      {store.verifiedUser ? <h1>Authenticated</h1> : <h1>Invalid User</h1>}
    </div>
  );
};
