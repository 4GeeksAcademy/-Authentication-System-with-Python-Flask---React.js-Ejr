import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState(""); 
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			await actions.login({ email, password });
			navigate('/profile'); 
		} catch (error) {
			setLoginError("Failed to log in: " + error.message); message
		}
	};

	
	const handleSignup = async () => {
		
		try {
			await actions.signUp({ email, password });
			navigate('/signup'); 
		} catch (error) {
			
		}
	};

	return (
		<div className="w-50 mx-auto">
			<img 
				src="C:\Users\hgreg\Downloads\video_full (2).gif" 
				className="mx-auto"
				height="300px"
				width="300px"
			/>
			{/* <Link className="navbar-brand" to="/">
          <img className="logo" src="C:\Users\hgreg\Downloads\video_full (2).gif" />
        </Link> */}
			<div className="text-left">
				<h3>Sign In</h3>
				<p>Hi there! Nice to see you again</p>
			</div>
			<p>Email</p>
			<input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
			<p>Password</p>
			<input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
			{loginError && <p className="text-danger">{loginError}</p>}
			<div>
				<button onClick={handleLogin} className="btn btn-success">Sign In</button>
				<button onClick={handleSignup} className="btn btn-secondary">Sign up</button>
			</div>
		</div>
	);
};