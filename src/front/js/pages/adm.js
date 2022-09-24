import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Adm= () => {
    const { store, actions } = useContext(Context);
    
    const handleClick = (e) => {
        e.preventDefault()
        if(email == "" || password == ""){
            setAlert(true)
        }
        if (email != "" && password != "") {
            
            actions.Login(email, password) 
            }

    };

    return (
        <div class="container login-container" >
            <div class="row login-row" >
            <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style ={{"width": "280px"}}>
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi pe-none me-2" style={{"width":"40px" , "height":"32px"}} ></svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi pe-none me-2" style={{"width":"16px", "height":"16px" }}></svg>
          Home
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" style={{"width":"16px", "height":"16px" }} ></svg>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" style={{"width":"16p", "height":"16" }}></svg>
          Orders
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" style={{"width":"16px", "height":"16px" }} ><use href="#grid"></use></svg>
          Products
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" style={{"width":"16px", "height":"16px" }} ><use href="#people-circle"></use></svg>
          Customers
        </a>
      </li>
    </ul>
    <hr/>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" style={{"width":"32px" ,"height":"32px"}} class="rounded-circle me-2"/>
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" style="">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"/></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
                
            </div>
        </div>
    );
};

