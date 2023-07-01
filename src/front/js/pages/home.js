import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom"



export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	console.log(window, "window")

	const handleLogout = () => {
		sessionStorage.removeItem("token")
		navigate("/login")
	}

	return (
		<div style={{ marginTop: "0px", marginLeft: "0px" }}>
			<div style={{ height: "100%", width: "100%", backgroundImage: "url('https://img.freepik.com/vector-gratis/campo-futbol-verde_225004-1137.jpg?w=360&t=st=1687559589~exp=1687560189~hmac=d1c3aeaec090617431cd073486b551e3e0340e9ed6ea00447d2b065a9b7aaffe')", height: "100vh", width: "100vw" }}>
				<div style={{ paddingTop: "350px", marginLeft: "400px" }}>
					<button type="button" class="btn btn-dark btn-lg me-3" >Reserva tu Cancha</button>
					<button type="button" class="btn btn-dark btn-lg">Administra tus Canchas</button>
				</div>


			</div>
		</div>






	)
}
