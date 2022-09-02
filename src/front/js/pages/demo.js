import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css"
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				
					
						<li>


							<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
							<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
							<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


							<div class="sidenav">
								
								
							</div>
							<div class="main">
								
								<div class="login-main-text">
									<h2>Application<br /> Login Page</h2>
									<p>Login or register from here to access.</p>
								<div>
									<div class="login-form">
										
										<form className="form">
											<div class="form-group">
												<label>User Name</label>
												<input type="text" class="form-control" placeholder="User Name" />
											</div>
											<div class="form-group">
												<label>Password</label>
												<input type="password" class="form-control" placeholder="Password" />
											</div>
											<button type="submit" class="btn btn-black">Login</button>
											<button type="submit" class="btn btn-secondary">Register</button>
										</form>
									</div>
								</div>
								</div>
							</div>
						</li>

				
				
			</ul>
			<br />

		</div>
	);
};
{/* <Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link> */}
{/* <Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link> */}