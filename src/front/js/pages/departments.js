import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Departments = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			This is the department Page
			<div className="container-fluid">
				{store.artDepartments.map((item,index)=>{
					return (
						<Link to={"/departments/" + displayName}>
							<div className="d-flex navbar">
								<h1>{item.displayName}</h1>
								<img />
							</div>
					</Link>
						
					)

				})}
			</div>
		</div>
	);
};
