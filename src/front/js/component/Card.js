import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//const PlayasCard = ({ playa })
const PlayasCard = ({ item }) => {
	return (
		//	<>
		//		<h3 className="card-title">{playa.name}</h3>
		//	</>
		<>
			<img style={{ maxHeight: "220px" }} className="card-img-top" src={item.imagen} alt={item.categoria} />
			<h3 className="card-title">{item.name}</h3>
		</>
	);
};

//export const Card = ({ playa, montana, id, addFavorite }) => {
//	const onFavoriteHandler = useCallback(() => {
//		const entity = playa ? "playa" : "montana";
//		const id = playa ? playa.id : montana.id;
//		addFavorite(entity, id);
//	});

export const Card = ({ type, item }) => {
	return (
		<div className="card my-2" style={{ minWidth: "180px", maxWidth: "440px" }}>
			<div className="shadow-lg card-body">
				<PlayasCard item={item} />
				<div className="d-flex justify-content-between mt-5 align-items-center">
					<Link className="btn btn-sm btn-outline-primary" data-toggle="popover" to={`/viewPyme/${item.id}`}>
						Learn more
					</Link>
					<i className="ml-5 far fa-heart fa-2x" style={{ color: "red" }} />
				</div>
			</div>
		</div>
	);
};

//};

//to={`/viewPyme/${person ? "character" : "planets"}/${id}`} ***learn more
// {playa ? <PlayasCard playa={playa} /> : <MontanasCard montana={montana} />}

Card.propTypes = {
	type: PropTypes.string,
	item: PropTypes.object
	//montana: PropTypes.object,
	//playa: PropTypes.object,
	//id: PropTypes.number
};

PlayasCard.propTypes = {
	item: PropTypes.object
	//	playa: PropTypes.object
};
