import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>

      <div className="row"></div>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="row">
        <Link to="/pages/registrodueno">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Comenzemos!
          </span>
        </Link>
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
