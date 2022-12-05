import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Home } from "./home";

export const User = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);


  return (
    <div className="col-6 my-5">
      <h1>Welcome to your personal WordSword Page</h1>
    </div>
  );
};
