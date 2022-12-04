import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     actions.getVerified();
  //   }, [store.token]);

  //   useEffect(() => {
  //     if (store.verifiedUser) {
  //       navigate("/single");
  //     }
  //   }, [store.verifiedUser]);

  //   console.log(store.verifiedUser);

  //   console.log(store.token);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.getToken(userEmail, userPassword);
    console.log("form submitted");
    console.log(store.verifiedUser)
  };

  return (
    <div className="col-11">
      <div className="row">
        <div className="col-11 text-center m-2 align-items-center">
          <h1>Welcome to the login page :)</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-3 m-2">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="InputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div>
              <label htmlFor="InputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
              />
            </div>
            <br></br>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                //actions.getToken(userEmail, userPassword);
                //actions.getVerified()
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
