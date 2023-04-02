import React, {useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Options from "../component/options";
import GetPlants from "../component/getPlants";
import AddPlants from "../component/addPlants";
import AddOrder from "../component/addOrder";
export const Admin = () => {
	 const [showOptions, setShowOptions] = useState(false);
	const [component, setComponent] = useState(<AddOrder />)

	const setAndClose = (comp) => {
		setComponent(comp);
		setShowOptions(false)
	}

	const handleMouseMove = (e) => {
		const threshold = 200;
		if (e.clientX < threshold) {
			setShowOptions(true);
		}
	}

	const handleClick = (e) => {
		console.log(e.target)
		setShowOptions(false)
	}
	return (
        <>
		 <button className="button-dark button-options" onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? "Ocultar opciones" : "Mostrar opciones"}
      	</button>
		 <div className="d-flex admin-container" onClick={handleClick} onMouseMove={handleMouseMove}>
		 {showOptions && <Options setComponent={setAndClose} />}
		 <div className="admin-component"> 
			{component}
		 </div>
		 </div>
        </>
	);
};