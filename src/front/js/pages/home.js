import React, { useContext } from "react";
import { Context } from "../store/appContext";
<<<<<<< HEAD
import { Container, Form, FormControl, Button, ButtonGroup } from "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { IconBox } from "../component/iconbox.jsx";
import { CardBox } from "../component/cardBox.jsx";
=======
import { homeSlideA, homeSlideB, homeSlideC, serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import "../../styles/home.scss";
import "../../styles/index.scss";
import MyCarousel from "../component/MyCarousel.jsx";
import { CardBox } from "../component/cardBox.jsx";
import { PersonBox } from "../component/personBox.jsx";
>>>>>>> 2e10dc16ebf3e51eaa20cf0c4264e351b31b4fdd

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
<<<<<<< HEAD
		<div
			className="background"
			style={{
				backgroundImage: `url("http://localhost:3000/backGround.png")`
			}}>
			<Container className="mt-3">
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
						<i className="fas fa-search" />
					</Form>

					<Button className="btn-outline-light mr-4 mt-3 px-5">Buscar una freelancer</Button>
					<Button className="btn-secondary mt-3 px-5">Soy una freelancer</Button>
				</div>
				<IconBox />
				<CardBox />
				<CardBox />
				<CardBox />
			</Container>
		</div>
=======
		<>
			<div className="text-center mt-5">
				<MyCarousel />
				<PersonBox title="Profesionales más solicitados" />
				<CardBox title="Categorias más buscadas" />
			</div>
		</>
>>>>>>> 2e10dc16ebf3e51eaa20cf0c4264e351b31b4fdd
	);
};
