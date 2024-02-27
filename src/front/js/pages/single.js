import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	// let exhibit = store[params.objectID].find(
	// 	(item, index) => index == params.objectID
	//   );

	return (
		<div>
			{/* make a for loop and create cards to reuse them in the department part */}
			<p>This is the exhibit: ---  </p>
		</div>
	);
};


