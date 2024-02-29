import React, { useContext } from "react";
import { Context } from "../store/appContext";

import AuthComponent from "../component/auth";
import "../../styles/home.css";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<AuthComponent>
			<div className="text-center mt-5">
				Your Profile Should Appear Below
			</div>
		</AuthComponent>
	);
};
