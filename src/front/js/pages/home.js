import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handleLogin = () => {
		const user = {
			"email" : email,
			"password" : password
		}
		actions.login(user)
		navigate("'/private'")
	}
	return (
		<div className="w-50 mx-auto">
			<img 
				src="https://cdn.vox-cdn.com/thumbor/XT0dC02q2XhIqTVeyZuzRFYFoVk=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/25255126/Banner_UncleIroh_2400x1600.png" 
				className="mx-auto"
				height="300px"
				width="300px"
			/>
			<div className="text-left">
				<h3>Sign In</h3>
				<p>Hi there! Nice to see you again</p>
			</div>
			<p>Email</p>
			<input onChange={(e) => setEmail(e.target.value)}/>
			<p>Password</p>
			<input onChange={(e) => setPassword(e.target.value)}/>
			<div>
				<Link to={"/signup"}className="btn btn-secondary">Sign up</Link>
				<button className="btn btn-success">Sign In</button>
			</div>
		</div>
	);
};
