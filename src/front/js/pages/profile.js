import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const defaultProfilePicUrl = process.env.PROFILE_PICTURE_URL;
  return (
    <>
      {store.token ? (
        <section className="page-body">
          <div className="container-fluid">
            <div className="row banner-test">
              <div className="col-3 d-flex justify-content-center align-items-center ">
                <img
                  src="https://avatars.mds.yandex.net/i?id=2a00000179eb7b77e0cf4877d0be5da6f043-2398678-images-thumbs&n=13&exp=1"
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

            <div className="row mt-5">
              <div className="col-3 text-center">
                <h5 className="fw-bold">@{localStorage.getItem("username")}</h5>
                <h6 className="text-muted mb-xl-5">
                  {localStorage.getItem("full_name")}
                </h6>
                <h6 className="mb-xl-4 "> Messages </h6>
                <h6 className="mb-xl-4"> Favorites </h6>
                <h6 className="mb-xl-4"> Your Listings </h6>
                <h6> Edit Profile </h6>
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
