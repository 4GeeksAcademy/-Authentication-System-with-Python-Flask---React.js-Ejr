import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { FormInsertCategory } from "../component/formInsertCategory";
import "../../styles/provider.scss";

export const Category = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<FormInsertCategory />
		</div>
	);
};
