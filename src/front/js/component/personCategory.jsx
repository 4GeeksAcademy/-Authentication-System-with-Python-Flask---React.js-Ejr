import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const PersonCategory = props => {
	return (
		<div>
			<Card style={{ width: "17rem" }} className="g-2">
				<Card.Img variant="top" src={props.img} />
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
					<Card.Title>{props.title}</Card.Title>
					<Card.Text>{props.valor}</Card.Text>
					<Button variant="primary">Contrátame</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

PersonCategory.propTypes = {
	img: PropTypes.object,
	name: PropTypes.string,
	title: PropTypes.string,
	valor: PropTypes.string
};
