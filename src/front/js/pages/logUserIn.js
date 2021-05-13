import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Login } from "../component/login";
import "../../styles/reg_log_rec.scss";

export const LogUserIn = () => {
	const { store } = useContext(Context);

	return (
		<div className="container">
			{store.token && store.token != "" && store.token != undefined ? logInSuccess() : <Login />}
		</div>
	);
};
