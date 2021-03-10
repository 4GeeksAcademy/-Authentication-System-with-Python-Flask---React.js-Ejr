import React, { useContext } from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { logoBlanco, backGround, man } from "../../img/image";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

const LandingPage = () => {
	return (
		<div
			style={{
				backgroundImage: `url("https://via.placeholder.com/500")`
			}}>
			<Container>
				<div className="transBox" />
				<div />
				<div className="iconBox" />
			</Container>
		</div>
	);
};

export default withRouter(LandingPage);
