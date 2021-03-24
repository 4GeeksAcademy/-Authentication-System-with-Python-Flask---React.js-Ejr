import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	// en este código se llama a la matriz demo dentro del Store y se utiliza params.theid para obtener la id de la URL
	//  {store.demo[params.theid].title} y luego ocupar "title" que es la key almacenada dentro de demo[id].title.
	return (
		<div>
			<h1>Profile</h1>
		</div>
	);
};

// Complex.propTypes = {
// 	match: PropTypes.object
// };
