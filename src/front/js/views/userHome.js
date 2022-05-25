import React from "react";
import { Link } from "react-router-dom";
import { UserHomeList } from "../component/userHomeList";

export const UserHome = () => {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-12 col-sm-6">

          <Link to="/user_proyects">
            <button type="button" className="btn btn-primary">Ver Postulaciones</button> 
          </Link>
        </div>
      </div>
        <UserHomeList />
  </div>
  );
};
