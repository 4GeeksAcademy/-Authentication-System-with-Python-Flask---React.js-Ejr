import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.jsx";
import { LoginRegister } from "../component/registerModal.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<Navbar />
		<LoginRegister />
		{/* // Aquí irá el componente Jumbotron+searchbar
		// Aquí irá el componente RutasDestacadas
		//El footer se renderiza en layout de manera predefinida */}
		</>
	);
};
