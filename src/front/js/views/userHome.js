import React from "react";
import { Link } from "react-router-dom";
import { UserHomeList } from "../component/userHomeList";

export const UserHome = () => {
	return (
		<div className="container mt-2">
			<div className="row">
				<div className="col-12">
					<Link to="/user_projects">
						<button type="button" className="animate__animated animate__fadeIn btn btn-primary mb-3 mt-3">
							Ver Postulaciones
						</button>
					</Link>
				</div>
			</div>
			<UserHomeList />
			
		</div>
	);
};
