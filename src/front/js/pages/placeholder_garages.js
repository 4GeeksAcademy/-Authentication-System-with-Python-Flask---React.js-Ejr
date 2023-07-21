import React, { useContext, useNavigate, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";

import "/workspaces/Watacar_v2/src/front/styles/profile.css"



export const Placeholder_garages = () => {
    return (
        <>
      

      <div class="card" aria-hidden="true">
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
    <a class="btn btn-primary disabled placeholder col-6"></a>
  </div>
</div>
      
    </>
    );
  };
  