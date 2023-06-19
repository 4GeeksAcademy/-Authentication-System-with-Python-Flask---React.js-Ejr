import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

// Para registrarse

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate=useNavigate()

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

  async function submitForm(e) {
    e.preventDefault()
    let data = new FormData(e.target)
    let resp = await actions.userCreate(data.get("first_name"), data.get("last_name"), data.get("city"), data.get("country"), data.get("zip_code"), data.get("address_one"), data.get("address_two"), data.get("phone"), data.get("email"), data.get("password"))
    if (resp >= 400) {
      return
    }
    navigate("/login")
    //console.log("Login exitoso")
  }

  return (
    <div style={{ backgroundColor: '#40768C' }}>
    <div className="container" >
      <h3>Details</h3>
      <form onSubmit={submitForm}>
        <div className="row g-3" >
          <div className="col-md-6 position-relative">
            <label className="form-label">First name</label>
            <input type="text" className="form-control" name="first_name" placeholder="First name" required />
          </div>
          <div className="col-md-6 position-relative">
            <label className="form-label">Last name</label>
            <input type="text" className="form-control" name="last_name" placeholder="Last name" required />
          </div>
          <div className="col-md-6 position-relative">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" placeholder="City" required />
          </div>
          <div className="col-md-6 position-relative">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" name="country" placeholder="Country" required />
          </div>
   
          <div className="col-md-4 position-relative">
            <label className="form-label">Zip Code</label>
            <input type="text" className="form-control" name="zip_code" placeholder="Enter your zip code. E.g. 10710" required />
          </div>
          <div className="col-md-4 position-relative">
            <label className="form-label">Adress line 1</label>
            <input type="text" className="form-control" name="address_one" placeholder="Street address, P.O box or military address" required />
          </div>
          <div className="col-md-4 position-relative">
            <label className="form-label">Adress line 2</label>
            <input type="text" className="form-control" name="address_two" placeholder="Building, floor, Apt, Suite, Unit, etc." required />
          </div>
          <div className="col-md-12 position-relative">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" name="phone" placeholder="Phone number" required />
          </div>
          <h3>Privacy</h3>
          <div className="col-md-12 position-relative">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" name="email" placeholder="Username" aria-label="Username" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input type={passwordShown ? "text" : "password"} className="form-control" name="password" required />
              <button onClick={togglePassword} className="input-group-text">
                <i className={passwordShowneye ? "fa fa-eye" : "fa fa-eye-slash"}></i>
              </button>
            </div>
          </div>
          <div id="passwordHelpBlock" className="form-text text-dark">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input type="password" className="form-control" name="password" required />
              <span className="input-group-text"><i className="fa fa-eye-slash" aria-hidden="true"></i></span>
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input is-invalid" type="checkbox" value="" aria-describedby="invalidCheck3Feedback" required />
              <label className="form-check-label text-dark">
                Agree to terms and conditions
              </label>
              <div id="invalidCheck3Feedback" className="invalid-feedback text-dark">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <button className="btn btn-dark mx-1" type="submit">Save</button>
            <button type="button" className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};
