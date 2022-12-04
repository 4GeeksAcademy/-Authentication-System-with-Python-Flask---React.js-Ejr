import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Home } from "./home";

export const User = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="col-6 my-5">
      {store.token !== "" ? (
        <h1>
          Thank you for creating an account with WordSword. Here is your home
          page:
        </h1>
      ) : (
        <h1>Please login to access this page</h1>
      )}
    </div>
  );
};
