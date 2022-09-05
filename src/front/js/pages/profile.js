import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Message } from "../component/user/message";
import { Properties } from "../component/user/properties";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token ? (
        <section className="page-body">
          <div className="container-fluid">
            <div className="row banner-test">
              <div className=" col col-sm-3 d-flex justify-content-center ">
                <img
                  src={process.env.DEFAULT_PROFILE_PIC}
                  className="mt-5"
                  style={{
                    height: "auto",
                    top: "3rem",
                    border: "solid 5px black",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col col-sm-3 d-flex justify-content-center sidebar bg-light">
                <ul className="mt-5">
                  <li>Mensajes </li>
                  <li className="mt-2">Mis anuncios</li>
                  <li className="mt-2">Editar Perfil</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1>UNAUTHORIZED</h1>
      )}
    </>
  );
};
