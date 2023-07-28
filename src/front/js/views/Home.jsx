import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";

import { Context } from '../store/appContext.js';



const Home = () => {

	const { actions, store } = useContext(Context)
	console.log(store.user)

	return (
		<div>
			<Navbar />
			<h1> Soy home </h1>
			<h3>{store.user.firstName} {store.user.lastName}</h3>
		</div>

	)

};

export default Home;