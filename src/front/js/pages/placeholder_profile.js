import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Placeholder_profile = () => {


return (
  <>
  
    <div className="container_profile">
      <div className="m-auto mb-4">
        <p aria-hidden="true" className="placeholder-glow ">
          <span className="placeholder col-4 avatar_image"></span>
        </p>
      </div>

      <div className="profile_info">
        <div className="row_profile_configuration">
          <a className="btn btn-primary disabled placeholder col-4"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </p>
        </div>
        <div className="row_profile_configuration">
          <a className="btn btn-primary disabled placeholder col-4"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </p>
        </div>
        <div className="row_profile_configuration">
          <a className="btn btn-primary disabled placeholder col-4"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </p>
        </div>
        <div className="row_profile_configuration">
          <a className="btn btn-primary disabled placeholder col-4"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </p>
        </div>
        <div className="row_profile_configuration">
          <a className="btn btn-primary disabled placeholder col-4"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </p>
        </div>
        <div className="row_profile_configuration">
          <a className="btn btn-primary disabled placeholder col-4"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </p>
        </div>
      </div>
    </div>
  </>
        )
   }