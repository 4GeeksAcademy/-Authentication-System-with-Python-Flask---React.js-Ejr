import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.js";
import { prueba } from "../../img/rigo-baby.jpg";



export const JivamuktiCard = (props) => {
	const [state, setState] = useState({
		//initialize state here
	});

	const { store, actions } = useContext(Context);

	console.log(props.url_imagen)

	return (
		<div className="card mx-0 pl-0" style={{ width: "18rem" }}>
			
				<img src={`${process.env.BACKEND_URL}/api/jivamuktiyoga/${props.url_imagen}`} className="card-img-top" alt="..." />
			
			<div className="card-body">
				<h5 className="card-title">{props.name}</h5>
				<span className="card-title">{props.asana_focus}</span><br></br>
				<span className="card-title">{props.instructor}</span>
				<span className="card-title">{props.url_imagen}</span>
				{/* <span className="card-title">{props.level}</span> */}
			</div>

		</div>
	);
};



/**
 * Define the data-types for
 * your component's properties
 **/

JivamuktiCard.propTypes = {
	history: PropTypes.object,
	id: PropTypes.string,
	instructor: PropTypes.string,
	level: PropTypes.string,
	asana_focus: PropTypes.string,
	url_imagen: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/

