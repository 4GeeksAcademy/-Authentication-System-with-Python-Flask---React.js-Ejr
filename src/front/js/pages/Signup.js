import React from "react";
import "../../styles/signup.css";

const Signup = () => {
  return (
    <div id="content" className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header"><strong>Create a new account</strong></div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label className="text-muted" htmlFor="inputUsername">Username</label>
                <input type="text" className="form-control" id="inputUsername" placeholder="Enter username" />
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="inputEmail">Email address</label>
                <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We don't share email with anyone</small>
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                <small id="passwordHelp" className="form-text text-muted">Your password is saved in encrypted form</small>
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="inputConfirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password" />
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
