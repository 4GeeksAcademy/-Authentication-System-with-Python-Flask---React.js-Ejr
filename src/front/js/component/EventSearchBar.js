import React from "react";

const EventSearchBar = () => {
  return (
    <div className="container my-5">

      <div className="row justify-content-center align-items-center">

        {/* Event Input */}
        <div className="col-md-3 mb-3">
          <input
            type="text"
            className="form-control"
            id="eventInput"
            placeholder="Enter event"
            style={{ fontSize: "14px" }}
          />
        </div>

        {/* Category Dropdown */}
        <div className="col-md-3 mb-3">
          <select
            className="form-control"
            id="categoryInput"
            style={{ fontSize: "14px" }}
          >
            <option value="">Select category</option>
            <option value="">Music</option>
            <option value="">Comedy</option>
            <option value="">Business</option>
            <option value="">Sport</option>
            <option value="">Other</option>
            {/* Add your category options here */}
          </select>
        </div>

        {/* Location Dropdown */}
        <div className="col-md-3 mb-3">
          <select
            className="form-control"
            id="locationInput"
            style={{ fontSize: "14px" }}
          >
            <option value="">Select location</option>
            {/* Add your location options here */}
            <option value="">London</option>
            <option value="">Paris</option>
            <option value="">New York</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="col-md-2 mb-3 pr-5">
          <button type="button" className="btn btn-primary custom-btn btn-block">
            Search
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventSearchBar;
