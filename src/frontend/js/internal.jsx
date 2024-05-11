import React from "react";
import backendImageUrl from "../assets/img/backend.jpg";

export const BackendURL = () => (
	<div className="mt-5 pt-5 w-50 mx-auto">
		<img src={backendImageUrl} />
		<h2>Missing BACKEND_URL env variable</h2>
		<p>please put your backend url on the BACKEND_URL variable in your .env file</p>
		<p>if you have not .env file, make a copy .env.default and rename the it to .env, do NOT modify .env.default file</p>
	</div>
);
