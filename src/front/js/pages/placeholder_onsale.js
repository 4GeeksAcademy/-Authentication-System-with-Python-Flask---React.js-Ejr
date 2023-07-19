import React, { useContext, useNavigate, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";

import "/workspaces/Watacar_v2/src/front/styles/profile.css"



export const Placeholder_onsale = () => {
    return (
      <>
      
        <div className="justify-content-center d-flex">
          <div className="row row_product_profile container  justify-content-evenly m-1">
          <p class="placeholder-glow">
            <span class="placeholder customPlaceholder col-12"></span>
            
             </p>
          </div>
        </div>
      </>
    );
  };
  