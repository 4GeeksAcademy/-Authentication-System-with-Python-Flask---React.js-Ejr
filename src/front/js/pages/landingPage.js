import React, { useContext } from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { logoBlanco, man } from "../../img/image";
import { withRouter } from "react-router-dom";
import { Container, Button, Form, FormControl } from "react-bootstrap";
import { IconBox } from "../component/IconBox.jsx";
import { CardBox } from "../component/cardBox.jsx";

const LandingPage = () => {
	return (
		<div
			className="background"
			style={{
				backgroundImage: `url(http://localhost:3000/backGround.png)`
			}}>
			<Container>
				<div className="transBox mb-3" />
				<img src={logoBlanco} width="85" height="25" className="d-inline-block align-top" alt="coteclogo" />
				<div />
				<div className="mt-5">
					<h1 className="text-white">
						Contrata en línea
						<br />a los mejores freelancers
					</h1>
					<Form inline>
						<FormControl
							type="text"
							placeholder="Search"
							className="mr-sm-2 my-3"
							style={{ borderRadius: "1.75rem", width: "526px" }}
						/>
					</Form>
					<button type="button" className="btn btn-outline-light mr-3 mt-2 px-5">
						Buscar una freelancer
					</button>
					<Button variant="secondary  mt-2 px-5">Soy un freelancer</Button>
					<img src={man} width="280" height="250" className="d-inline-block align-top" alt="freelancer" />
				</div>
				<IconBox />
				<CardBox />
				<div className="transBox mb-3">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="success">Success</Button>
					<Button variant="outline-primary">Primary</Button>
					<Button variant="outline-secondary">Secondary</Button>
					<Button variant="outline-success">Success</Button>
					<button type="button" className="btn btn-light">
						Light
					</button>
					<button type="button" className="btn btn-outline-light">
						Light
					</button>
				</div>
			</Container>
		</div>
	);
};

export default withRouter(LandingPage);
