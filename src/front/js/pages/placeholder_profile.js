import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Placeholder_profile = () => {


return (
  <>
  <div className="container_profile">
      <div className="mx-5 px-5 box w-100"> 
      <div className="d-lg-flex justify-content-start my-5">
        <p aria-hidden="true" className="placeholder-glow ">
          <span className="placeholder col-4 avatar_image"></span>
        </p>
      </div>

      <div className="profile_info  m-auto pb-5">
        <div className="row_profile_configuration mx-1 justify-content-around text-center">
          <a className="btn btn-primary disabled placeholder col-10  col-sm-10 col-md-10 col-lg-10"></a>
          <p aria-hidden="true" className="placeholder-glow   ">
            <span className="placeholder col-10 col-sm-10 col-md-10 col-lg-10"></span>
          </p>
        </div>
        <div className="row_profile_configuration mx-1 justify-content-around text-center">
          <a className="btn btn-primary disabled placeholder col-10 col-xs-10 col-sm-10 col-md-10 col-lg-10"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-10 col-xs-10 col-sm-10 col-md-10 col-lg-10"></span>
          </p>
        </div>
        <div className="row_profile_configuration mx-1 justify-content-around text-center">
          <a className="btn btn-primary disabled placeholder col-10 col-xs-10 col-sm-10 col-md-10 col-lg-10"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-10 col-xs-10 col-sm-10 col-md-10 col-lg-10"></span>
          </p>
        </div>
        <div className="row_profile_configuration mx-1 justify-content-around text-center">
          <a className="btn btn-primary disabled placeholder col-10 col-xs-10 col-sm-10 col-md-10 col-lg-10"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-10 col-xs-10 col-sm-10 col-md-10 col-lg-10"></span>
          </p>
        </div>
        <div className="row_profile_configuration mx-1 justify-content-around text-center">
          <a className="btn btn-primary disabled placeholder col-10 col-sm-10 col-md-10 col-lg-10"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder  col-10 col-sm-10 col-md-10 col-lg-10"></span>
          </p>
        </div>
        <div className="row_profile_configuration mx-1 justify-content-around text-center">
          <a className="btn btn-primary disabled placeholder col-10 col-sm-10 col-md-10 col-lg-10"></a>
          <p aria-hidden="true" className="placeholder-glow">
            <span className="placeholder col-10 col-sm-10 col-md-10 col-lg-10"></span>
          </p>
        </div>
      </div>
    </div></div>
  </>
        )
   }