import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CardIndividual = props => {
	return (
		<div>
			<Link to="/category/individual">
				<Card style={{ width: "13rem" }}>
					<Card.Img variant="top" src={props.img} />
					<Card.Body>
						<Card.Title style={{ marginBottom: "3px" }}>{props.title}</Card.Title>
						<Card.Text style={{ marginBottom: "3px" }}>{props.valor}</Card.Text>
						<Card.Text
							className="d-inline"
							style={{ marginBottom: "3px", fontSize: "14px", color: "#606060" }}>
							<i className="fas fa-star" />
							{props.punta} / {props.trabajo} trabajo
						</Card.Text>
					</Card.Body>
				</Card>
			</Link>
		</div>
	);
};

CardIndividual.propTypes = {
	img: PropTypes.object,
	title: PropTypes.string,
	valor: PropTypes.string,
	punta: PropTypes.string,
	valor: PropTypes.string,
	trabajo: PropTypes.string
};
