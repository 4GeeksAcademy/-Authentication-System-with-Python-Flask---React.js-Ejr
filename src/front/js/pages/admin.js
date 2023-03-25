import React, {useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Options from "../component/options";
import GetPlants from "../component/getPlants";
import AddPlants from "../component/addPlants";
export const Admin = () => {
	 const [showOptions, setShowOptions] = useState(false);
	const [component, setComponent] = useState(<AddPlants />)

	const setAndClose = (comp) => {
		setComponent(comp);
		setShowOptions(false)
	}
	return (
        <>
		 <button className="button-dark button-options" onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? "Ocultar opciones" : "Mostrar opciones"}
      	</button>
		 <div className="d-flex admin-container">
		 {showOptions && <Options setComponent={setAndClose} />}
		 <div className="admin-component"> 
			{component}
		 </div>
		 </div>
        </>
	);
};