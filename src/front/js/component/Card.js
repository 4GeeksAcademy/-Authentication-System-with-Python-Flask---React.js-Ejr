import React from "react";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

//const PlayasCard = ({ playa })
const PlayasCard = () => {
	return (
		//	<>
		//		<h3 className="card-title">{playa.name}</h3>
		//	</>
		<>
			<img
				className="card-img-top"
				src="https://cf.bstatic.com/images/hotel/max1024x768/268/26816997.jpg"
				alt="Card image cap"
			/>
			<h3 className="card-title">Sol y Luna Lodge</h3>
		</>
	);
};
//const MontanasCard = ({ montana })
const MontanasCard = () => {
	return (
		//	<>
		//		<h3 className="card-title">{montana.name}</h3>
		//	</>
		<>
			<img
				className="card-img-top"
				src="https://www.fortunawelcome.com/images/hotels/montana-de-fuego-hotel/montana-de-fuego-hotel.jpg"
				alt="Card image cap"
			/>
			<h3 className="card-title">Hotel Montaña de Fuego</h3>
		</>
	);
};

//export const Card = ({ playa, montana, id, addFavorite }) => {
//	const onFavoriteHandler = useCallback(() => {
//		const entity = playa ? "playa" : "montana";
//		const id = playa ? playa.id : montana.id;
//		addFavorite(entity, id);
//	});

export const Card = () => {
	return (
		<div className="card my-2" style={{ minWidth: "180px", maxWidth: "440px" }}>
			<div className="shadow-lg card-body">
				{true ? <PlayasCard /> : <MontanasCard />}
				<div className="d-flex justify-content-between mt-5 align-items-center">
					<Link className="btn btn-sm btn-outline-primary" data-toggle="popover" to="/viewPyme">
						Learn more
					</Link>
					<i className="ml-5 fas fa-passport fa-2x" />
				</div>
			</div>
		</div>
	);
};

//};

//to={`/viewPyme/${person ? "character" : "planets"}/${id}`} ***learn more
// {playa ? <PlayasCard playa={playa} /> : <MontanasCard montana={montana} />}

//Card.propTypes = {
//montana: PropTypes.object,
//playa: PropTypes.object,
//id: PropTypes.number
//};

//PlayasCard.propTypes = {
//	playa: PropTypes.object
//};

//MontanasCard.propTypes = {
//	montana: PropTypes.object
//};
