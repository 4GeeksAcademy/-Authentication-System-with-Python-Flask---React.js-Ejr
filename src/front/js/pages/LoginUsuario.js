import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const LoginUsuario = () => {
  const { store, actions } = useContext(Context);

  // function Password() {
  //   // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShowneye, setPasswordShowneye] = useState(false);
  //   // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
    setPasswordShowneye(!passwordShowneye)
  };

  return (
    <div className="container">

      <h3>Sing in</h3>
      <div className="col-md-12 position-relative">
        <label className="form-label">Email</label>

        <input type="text" className="form-control" placeholder="Username" aria-label="Username" />


      </div>
      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <div className="input-group">

          <input type={passwordShown ? "text" : "password"} className="form-control" />

          <button onClick={togglePassword} className="input-group-text">
            <i className={passwordShowneye ? "fa fa-eye" : "fa fa-eye-slash"}></i>

          </button>

        </div>


      </div>




      <div className="col-12 mb-3 ">
        <div class="d-grid gap-2">
          <button className="btn btn-primary  mx-1" type="submit">Save</button>
          <button type="button" class="btn btn-secondary  mx-1">Forgot your password?</button>
        </div>
      </div>

      <div class="form-check ">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
        <label class="form-check-label" for="flexCheckChecked">
          Keep me signed in
        </label>
      </div>
    </div>




  );
};
