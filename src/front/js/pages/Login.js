import React from "react";
import "../../styles/login.css";

const Login = () => {
  return (
    <div id="content" className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header"><strong>Login to your account</strong></div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label className="text-muted" htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We don't share email with anyone</small>
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                <small id="passwordHelp" className="form-text text-muted">Your password is saved in encrypted form</small>
              </div>
              <div className="form-group">
              </div>
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
