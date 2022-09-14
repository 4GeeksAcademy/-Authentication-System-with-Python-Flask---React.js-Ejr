import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [token, setToken] = useState(localStorage.getItem("token"));

  const handleClick = () => {
    if (email != "" && password != "") actions.Login(email, password);
    else alert("Completar datos");
  };

  return (
    <div class="container login-container">
      <div class="row login-row">
        <div class="col-md-6 login-form-1">
          <h3>Login Here</h3>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group">
            <input
              onClick={handleClick}
              type="submit"
              class="btnSubmit"
              value="Login"
            />
            <Link to="/register">
              <input type="submit" class="btnSubmit" value="Register" />
            </Link>
          </div>
          <div class="form-group">
            <a href="#" class="btnForgetPwd">
              Forget Password?
            </a>
          </div>
        </div>
        <div class="col-md-6 login-form-2">
          <div class="login-logo">
            <Link to="/">
          <i className="fa-solid  fa-house holis"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link> */
}
{
  /* <Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link> */
}

{
  /* <ul className="list-group">
				
					
						<li>


							<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
							<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
							<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


							<div className="sidenav">
								
								
							</div>
							<div className="main">
								
								<div className="login-main-text">
									<h2>Application<br /> Login Page</h2>
									<p>Login or register from here to access.</p>
								<div>
									<div className="login-form">
										
										<form className="form">
											<div className="form-group">
												<label>User Name</label>
												<input type="text" className="form-control" placeholder="User Name" />
											</div>
											<div className="form-group">
												<label>Password</label>
												<input type="password" className="form-control" placeholder="Password" />
											</div>
											<button type="submit" className="btn btn-black">Login</button>
											<button type="submit" className="btn btn-secondary">Register</button>
										</form>
									</div>
								</div>
								</div>
							</div>
						</li>

				
				
			</ul>
			<br /> */
}
