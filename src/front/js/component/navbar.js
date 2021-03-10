import React, { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { logoAzul } from "../../img/image";
import { withRouter } from "react-router-dom";

const MyNavbar = props => {
	useEffect(() => {
		console.log(props.location.pathname);
	}, []);

	if (props.location.pathname === "/") {
		return "";
	} else {
		return (
			<>
				<Navbar bg="light">
					<div className="container">
						<Navbar.Brand href="/">
							<img
								src={logoAzul}
								width="84"
								height="25"
								className="d-inline-block align-top"
								alt="cotec logo"
							/>
						</Navbar.Brand>
					</div>
				</Navbar>
			</>
		);
	}
};

export default withRouter(MyNavbar);
