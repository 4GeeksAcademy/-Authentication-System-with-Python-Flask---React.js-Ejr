import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   actions.getVerified();
  // }, [store.token]);

  // useEffect(() => {
  //   if (store.verifiedUser) {
  //     navigate("/user");
  //   }
  // }, [store.verifiedUser]);

  //function to resolve after a time period
  function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise((resolve) => {
      setTimeout(() => {
        //calling navigate after half a second
        !store.verifiedUser ? navigate("/login") : navigate("/user");
        resolve("slow");
        console.log("slow promise is done");
      }, 500);
    });
  }

  async function navigateLogin() {
    console.log("==SEQUENTIAL START==");

    // 1. Execution gets here almost instantly
    //this await function verifies the use
    const slow = await resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.
  }

  //this function is for when the user click the submit login
  const handleSubmit = (event) => {
    //preventing the form from sending
    event.preventDefault();

    //calling flux to get token - if we get token then we get
    //jwt and verify the user
    actions.getToken(userEmail, userPassword);

    //waiting half a second before moving to login page to let
    //api await resolve
    navigateLogin();
  };

  return (
    <div className="col-10 my-5">
      <div className="row">
        <div className="col-11 text-center m-2 align-items-center">
          {
            //conditional rendering but isn't working right now
            store.newUser ? (
              <h1>Welcome to WordSword, try logging in for the first time</h1>
            ) : (
              <h1>Welcome to the login page</h1>
            )
          }
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
