import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";

import { Context } from '../store/appContext.js';



const Home = () => {

	// const { actions, store } = useContext(Context)
	// // const [isLoggedIn, setIsLoggedIn] = useState(false);
	// let navigate = useNavigate();

	// 	useEffect(() => {
	// 		const myToken = localStorage.getItem("myToken");
	// 		// const userDataString = localStorage.getItem("user");
	// 		// const userData = JSON.parse(userDataString);
	// // console.log(userData)
	// 		// actions.saveUserDatainStore(userData)
	// 		const userLoggedIn = !!myToken;
	// 		setIsLoggedIn(userLoggedIn);
	// 		// console.log(store.user);
	// 	  }, []);


	// const name = localStorage.getItem("user");
	// const lastname = localStorage.getItem("user");


	return (
		// {name.firstName} {lastname.lastName}
		<div>
			<Navbar />
			<h1> Soy home </h1>
		</div>

	)

};

export default Home;