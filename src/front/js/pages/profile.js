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
              <div className="col-3 d-flex justify-content-center align-items-center ">
                <img
                  src={process.env.DEFAULT_PROFILE_PIC}
                  className="ms-4 mt-5"
                  style={{
                    height: "auto",
                    top: "3rem",
                    border: "solid 5px black",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>

            <div className="row" style={{ background: "lightblue" }}>
              <div className="col-3 mt-5 ps-5 ms-5">
                <div className="d-flex align-items-start">
                  <div
                    className="nav flex-column nav-pills me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Inbox
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Mis Inmuebles
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-messages-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-messages"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      Messages
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-settings-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-settings"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-settings"
                      aria-selected="false"
                    >
                      Editar Perfil
                    </button>
                  </div>
                  <div class="tab-content" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                      tabindex="0"
                    >
                      <Message />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
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
                      ...
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-settings"
                      role="tabpanel"
                      aria-labelledby="v-pills-settings-tab"
                      tabindex="0"
                    >
                      ...
                    </div>
                  </div>
                </div>
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
