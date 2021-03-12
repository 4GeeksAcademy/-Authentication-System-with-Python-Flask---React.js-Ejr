import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { FormInsertCategoria } from "../component/formInsertCategoria";
import "../../styles/provider.scss";

export const Categoria = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<FormInsertCategoria />
		</div>
	);
};
