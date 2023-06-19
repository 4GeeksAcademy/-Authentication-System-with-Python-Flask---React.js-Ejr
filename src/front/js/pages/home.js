import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom"


export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const handleLogout = ()=>{
		sessionStorage.removeItem("token")
		navigate("/login")
	}

	return (
		<div className="text-center mt-5">
			<button type="submit" className="btn btn-primary" onClick={handleLogout}>Logout</button>
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
