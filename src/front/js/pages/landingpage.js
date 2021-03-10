import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { IconBox } from "../component/iconbox.jsx";
import { CardBox } from "../component/cardBox.jsx";
import { logoBlanco } from "../../img/image";
//import { ButtonAll } from "../component/buttonAll";

export const Landingpage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div
			className="background"
			style={{
				backgroundImage: `url("http://localhost:3000/backGround.png")`
			}}>
			<Container className="mt-3">
				<div className="boxTrans">
					<img
						src={logoBlanco}
						width="84"
						height="25"
						className="d-inline-block align-top"
						alt="cotec logo"
					/>
				</div>
				<div className="mt-5">
					<h1 className="text-left text-white">
						Contrata en línea <br />a los mejores freelancers
					</h1>
					<Form inline>
						<FormControl
							type="text"
							placeholder="Search"
							className="mr-sm-2 mt-3"
							style={{ borderRadius: "2rem", height: "39px", width: "521px" }}
						/>
					</Form>

					<Button className="btn-outline-light mr-4 mt-3 px-5">Buscar una freelancer</Button>
					<Button className="btn-secondary mt-3 px-5">Soy una freelancer</Button>
				</div>
				<IconBox />
				<CardBox title="Categorias más buscadas" />
				<h1 className="text-left">Button</h1>
				<Button variant="primary">Primary</Button>
				<Button variant="outline-primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline-secondary">Secondary</Button>
				<Button variant="success">Success</Button>
				<Button variant="outline-success">Success</Button>
				<button type="button" className="btn btn-light">
					Light
				</button>
				<button type="button" className="btn btn-outline-light">
					Light
				</button>
			</Container>
		</div>
	);
};
