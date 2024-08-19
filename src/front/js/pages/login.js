import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { LoginForm } from "../component/loginForm";


export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<LoginForm />
	);
};