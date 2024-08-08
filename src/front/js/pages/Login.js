import React, { useContext, useState } from "react";
import "../../styles/login.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const{ store, actions} = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("inputEmail");
    let password = formData.get("inputPassword");
    
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    
    let logged = await actions.login(email, password);
    if (logged) navigate("/"); 
  }

  return (
    <div id="content" className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header"><strong>Login to your account</strong></div>
          <div className="card-body">
            <form onSubmit={submitForm}>
            {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label className="text-muted" htmlFor="inputEmail">Email address</label>
                <input name="inputEmail" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We don't share email with anyone</small>
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="inputPassword">Password</label>
                <input name="inputPassword" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                <small id="passwordHelp" className="form-text text-muted">Your password is saved in encrypted form</small>
              </div>
              <div className="form-group mt-2">
                <a href="/forgot-password" className="text-primary">Forgot your password?</a>
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
