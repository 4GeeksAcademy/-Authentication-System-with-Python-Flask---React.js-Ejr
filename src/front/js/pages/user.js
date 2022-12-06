import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Home } from "./home";

export const User = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(()=>{
    !store.verifiedUser ? navigate("/login") : <></>;
  })


  return (
    <div className="col-10 my-5">
      <h1>Welcome to your personal WordSword Page</h1>
    </div>
  );
};
