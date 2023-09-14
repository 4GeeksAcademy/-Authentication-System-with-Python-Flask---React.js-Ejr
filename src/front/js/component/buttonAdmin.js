import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ButtonAdmin = () => {
  const navigate = useNavigate();

  function handleButtonAdmin(event){
    navigate("/home")
  }

    return (
      <button type="button" className="btn btn-dark" onClick={handleButtonAdmin}> ADMIN ** </button>
    )
  };

