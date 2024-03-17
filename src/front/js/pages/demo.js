import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Waterbottle from "../component/waterbottle"

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<Waterbottle />
		</div>
	);
};
