import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const UserProfileSetup = () => {
  return (
    <>
      <h1>*suario*, dejanos conocerte...</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Example label
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Another label
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
          />
        </div>
        <Link to="/user_profile">
          <button>Registrate!</button>
        </Link>
      </form>
    </>
  );
};
