import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/buttonsHome.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	const images = [
		"https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg",
		"https://journey.app/blog/wp-content/uploads/2021/11/reglas-deportivas_Tenis_.jpg",
		"https://thephysiocompany.co.uk/wp-content/uploads/football.jpg"
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const currentImage = images[currentImageIndex];

	return (
		<div>
			<div
				className="home"
				style={{
					backgroundImage: `url(${currentImage})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center"
				}}
			>
				<p className="text-uppercase fw-bold float-right text-white">
					"Spot Sport allows you to easily book courts for your preferred sports at the venue of your choice, ensuring the best prices and ultimate convenience."
				</p>
				<div className="d-flex justify-content-between ">
					<div className="btnhome">
						<Link className="btnhome btn-lg btn-dark" to="/canchas">
							<span>Reserva tu Cancha</span>
						</Link>
					</div>
					<div className="btnhome">
						<Link className="btnhome btn-lg btn-dark" to="/profile">
							<span>Administra tus Canchas</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

				// {/* <div style={{ paddingTop: "350px", marginLeft: "400px" }}>
				// 	<button type="button" className="btn btn-dark btn-lg me-3" >Reserva tu Cancha</button>
				// 	<button type="button" className="btn btn-dark btn-lg">Administra tus Canchas</button>
				// </div> */}