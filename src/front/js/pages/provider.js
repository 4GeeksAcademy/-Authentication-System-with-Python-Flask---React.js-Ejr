import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { FormProvider } from "../component/formProvider";
import "../../styles/provider.scss";

export const Provider = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<FormProvider />
		</div>
	);
};
