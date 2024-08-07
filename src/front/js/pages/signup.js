import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { SignupForm } from "../component/signupForm";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<SignupForm />
	);
};