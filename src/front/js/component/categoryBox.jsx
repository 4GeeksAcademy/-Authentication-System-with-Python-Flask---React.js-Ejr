import React, { useContext } from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { CardCategory } from "./cardCategory.jsx";
import { serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import { Row, Col, Container } from "react-bootstrap";
import { CardIndividual } from "./cardIndividual.jsx";
import { Context } from "../store/appContext";

export const CategoryBox = props => {
	const { store, actions } = useContext(Context);
	console.log(store.serviceInfo);

	return (
		<>
			<Container>
				<Row className="row-cols-sm-2 row-cols-md-3  row-cols-lg-3 align-items-center">
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Crearé un sitio web"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Crearé un sitio web"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Crearé un sitio web"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					{store.serviceInfo.map((item, index) => {
						return (
							<Col className="mb-4" key={index}>
								<CardIndividual
									img={serviceIt}
									title={item.name_servicio}
									valor={item.valor}
									tipoCobro={item.tipo_cobro}
									punta="4.5"
									trabajo="50"
								/>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
};
