import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Message } from "../component/user/message";
import { Properties } from "../component/user/properties";
import { Edit } from "../component/user/edit";
import { Publicar } from "../component/user/publicar";

export const Profile = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.syncUserInfo();
  }, []);
  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="page-body">
          <div className="container-fluid">
            <div className="row banner-test">
              <div className="col col-sm-3 d-flex justify-content-center ">
                <img
                  src={process.env.DEFAULT_PROFILE_PIC}
                  className="mt-5 profile-pic"
                  style={{
                    height: "auto",
                    top: "3rem",
                    border: "solid 5px black",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="d-flex col col-sm-6 justify-content-center align-items-center">
                <h1>{store.userInfo.full_name}</h1>
              </div>
            </div>
          </div>

          <div
            className="d-flex  justify-content-between"
            style={{ background: "lightblue", height: "fit-content" }}
          >
            <div
              className="nav flex-column nav-pills align-items-center me-3 col col-sm-3 mt-5"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="nav-link active nav-button"
                id="v-pills-inmuebles-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-inmuebles"
                type="button"
                role="tab"
                aria-controls="v-pills-inmuebles"
                aria-selected="false"
              >
                Mis Inmuebles
              </button>
              <button
                className="nav-link nav-button"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                Mensajes
              </button>
              <button
                className="nav-link nav-button"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                Editar
              </button>
              <button
                className="nav-link nav-button"
                id="v-pills-publicar-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-publicar"
                type="button"
                role="tab"
                aria-controls="v-pills-publicar"
                aria-selected="false"
              >
                Publicar un anuncio
              </button>
            </div>
            <div
              class="tab-content d-flex col w-100 mt-5"
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active "
                id="v-pills-inmuebles"
                role="tabpanel"
                aria-labelledby="v-pills-inmuebles-tab"
                tabindex="0"
              >
                <Properties />
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
                tabindex="0"
              >
                <Message />
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
                tabindex="0"
              >
                <Edit />
              </div>
              <div
                className="tab-pane fade pb-5"
                id="v-pills-publicar"
                role="tabpanel"
                aria-labelledby="v-pills-publicar-tab"
                tabindex="0"
              >
                <Publicar />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>UNAUTHORIZED</h1>
      )}
    </>
  );
};
