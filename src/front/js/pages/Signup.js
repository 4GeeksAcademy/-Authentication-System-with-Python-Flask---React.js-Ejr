import React, { useContext, useState } from "react";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
  const { storage, actions } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("inputEmail");
    let password = formData.get("inputPassword");
    let name = formData.get("inputName");
    let phone_number = formData.get("inputPhone_number");
    let confirmPassword = formData.get("inputConfirmPassword");

    if (!email || !password || !name || !phone_number) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    let signedUp = await actions.signup(email, password, name, phone_number);
    if (signedUp) navigate("/login");
  }

  return (
    <div id="content" className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header"><strong>Create a new account</strong></div>
          <div className="card-body">
            <form onSubmit={submitForm}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputName">Name</label>
                <input name="inputName" type="text" className="form-control" id="inputName" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputEmail">Email address</label>
                <input name="inputEmail" type="email" className="form-control" id="inputEmail" placeholder="Email" />
                <small id="emailHelp" className="form-text text-muted">We don't share your email with anyone</small>
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputPhone_number">Phone Number</label>
                <input name="inputPhone_number" type="text" className="form-control" id="inputPhone_number" placeholder="Phone Number" />
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputPassword">Password</label>
                <input name="inputPassword" type="password" className="form-control" id="inputPassword" placeholder="Enter Password" />
                <small id="passwordHelp" className="form-text text-muted">Your password is saved in encrypted form</small>
              </div>
              <div className="form-group">
                <label className="text-muted mt-1" htmlFor="inputConfirmPassword">Confirm Password</label>
                <input name="inputConfirmPassword" type="password" className="form-control" id="inputConfirmPassword" placeholder="Re-enter Password" />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
