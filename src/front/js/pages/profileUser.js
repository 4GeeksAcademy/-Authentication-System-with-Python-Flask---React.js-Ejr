import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import CalendarComp from "../component/CalendarComp";
import Imgee from "../component/imgee";
import resena from "../../img/resena.png";
import Reviews from "../component/reviews";
import Shape2 from "../component/shape2";

const imgStlye = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
};
const usernameStyle = {
  fontStyle: "italic",
};
const bgColor = {
  background: "#DDD5D0",
  border: "none",
};

const ProfileUser = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="container mb-5 mt-5">
        <div className="card mb-3" style={bgColor}>
          <div className="row g-0">
            <div className="col-1">
              <img
                className="rounded-circle"
                src={`${process.env.BACKEND_URL}/${store.user_type}/download/${store.user.file}`}
                style={imgStlye}
              />
            </div>
            <div className="col-lg-7 mt-2 ps-3">
              <div className="card-body">
                <h5 className="card-title" style={usernameStyle}>
                  {store.user.first_name + " " + store.user.last_name}
                </h5>
                <p className="card-text text-black">
                  {store.user_type == "walker"
                    ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    : store.user.description == "null"
                    ? ""
                    : store.user.description}
                </p>
              </div>
            </div>
            {store.user_type == "walker" ? (
              <div className="col-lg-4 mt-3">
                <h2 className="col">Calendario</h2>
                <CalendarComp />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {store.user_type == "owner" ? (
          <div className="container">
            <h4 className="separator text-muted">Galería</h4>
            <div className="row justify-content-center">
              <Imgee />
              <Imgee />
              <Imgee />
              <Imgee />
              <Imgee />
            </div>
          </div>
        ) : (
          <div className="row">
            <h4 className="separator text-muted">Reseñas</h4>
            <div className="row">
              {store.reviews.length == 0 ? (
                <img src={resena} />
              ) : (
                store.reviews.map((review, index) => {
                  return store.owners.map((owner) => {
                    return review.owner_id == owner.id ? (
                      <Reviews
                        key={index}
                        comment={review.comment}
                        img={`${process.env.BACKEND_URL}/owner/download/${owner.file}`}
                        name={owner.first_name}
                      />
                    ) : (
                      ""
                    );
                  });
                })
              )}
            </div>
          </div>
        )}

        <Shape2 />
      </div>
    </div>
  );
};

export default ProfileUser;
