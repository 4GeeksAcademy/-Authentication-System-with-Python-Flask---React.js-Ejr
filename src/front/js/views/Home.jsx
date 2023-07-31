import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import { Context } from '../store/appContext.js';
import { Link } from 'react-router-dom'

const Home = () => {
	const { actions , store } = useContext(Context)

	// const { actions, store } = useContext(Context)
	// console.log(store.user)
	

	const cardImageStyle = {
		height: "400px", 
		objectFit: "cover", 
		borderTopLeftRadius: "20px", 
		borderTopRightRadius: "20px", 
		padding: "10px",
	};

	

	return (
		<div>
			<Navbar />

			<div className="container-fluid card-group">
				<div className="card">
					<Link className='clothesImage' to='/clothes'>
						<img src="https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
							className="card-img-top"
							alt="..."
							style={cardImageStyle}
						/>
					</Link>
					<div className="card-body">
						<h5 className="card-title">CLOTHES</h5>
						<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					</div>
					<div className="card-footer">
						<small className="text-muted">Last updated 3 mins ago</small>
					</div>
				</div>
				<div className="card">
					<Link className='FootwearImage' to='/footwear'>
						<img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
							className="card-img-top" alt="..."
							style={cardImageStyle}
						/>
					</Link>
					<div className="card-body">
						<h5 className="card-title">FOOTWEAR</h5>
						<p className="card-text">This card ha.</p>
					</div>
					<div className="card-footer">
						<small className="text-muted">Last updated 3 mins ago</small>
					</div>
				</div>
				<div className="card">
					<Link className='accesoriesImage' to='/accesories'>
						<img src="https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
							className="card-img-top"
							alt="..."
							style={cardImageStyle}
						/>
					</Link>
					<div className="card-body">
						<h5 className="card-title">ACCESSORIES</h5>
						<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
					</div>
					<div className="card-footer">
						<small className="text-muted">Last updated 3 mins ago</small>
					</div>
				</div>
			</div>
		</div>

	)

};

export default Home;