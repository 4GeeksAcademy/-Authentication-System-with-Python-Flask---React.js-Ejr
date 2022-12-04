import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Home } from "./home";

export const User = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="col-11">
      {store.token !== "" ? <h1>Authenticated</h1> : <h1>Invalid User</h1>}
    </div>
  );
};
