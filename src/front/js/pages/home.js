import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>HOME</h1>
      <div className="d-flex justify-content-center ">
        <Link to={"/login"}>
          {" "}
          <a href="#" className="btn btn-success me-3">
            {" "}
            Login
          </a>{" "}
        </Link>
        <Link to={"/signup"}>
          {" "}
          <a href="#" className="btn btn-success">
            Signup{" "}
          </a>{" "}
        </Link>
      </div>
    </div>
  );
};
