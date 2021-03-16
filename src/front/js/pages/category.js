import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { FormCategory } from "../component/formCategory";
import "../../styles/provider.scss";

export const Category = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<FormCategory />
		</div>
	);
};
