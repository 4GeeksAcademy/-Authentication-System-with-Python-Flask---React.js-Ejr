import React from "react";
import { Link } from "react-router-dom";

const EventSearchBar = () => {
  return (
    <div className="container my-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-3 mb-3">
          <input type="text" className="form-control" id="eventInput" placeholder="Enter event" />
        </div>
        <div className="col-md-3 mb-3">
          <input type="text" className="form-control" id="categoryInput" placeholder="Enter category" />
        </div>
        <div className="col-md-3 mb-3">
          <input type="text" className="form-control" id="locationInput" placeholder="Enter location" />
        </div>
        <div className="col-md-1 mb-3">
          <button type="button" className="btn btn-primary custom-btn w-100">Search</button>
        </div>
      </div>
    </div>
  );
};

export default EventSearchBar;
