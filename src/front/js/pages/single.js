import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpeg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="jumbotron">
			<h1 className="display-4"> {store.provincia[params.theid].title}</h1>
			<img src={rigoImageUrl} />
			<hr className="my-4" />
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
