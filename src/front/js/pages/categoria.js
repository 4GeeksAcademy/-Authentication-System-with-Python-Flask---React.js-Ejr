import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Categoria = props => {
	var idcategoria = props.id;
	return (
		<div className="container">
			<div className=" post col-12 d-flex">
				<div className="card card-size">
					<img
						src="https://static.vix.com/es/sites/default/files/styles/1x1/public/imj/p/paisajes-espectaculares-del-mundo-1.jpg"
						className="card-img-top img-margin"
						alt="..."
					/>
					<div className="card-body">
						<p className="card-text">Categoría: {props.gender}</p>
						<div className="col-12 d-flex justify-content-between button-space">
							<Link to={"/detailpeople/" + idpeople}>
								<button type="button" className="btn btn-outline-success">
									Learn more!
								</button>
							</Link>
							<button type="button" className="btn btn-outline-warning ml-3">
								<i className="far fa-heart" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Cards.propTypes = {
	id: PropTypes.any,
	name: PropTypes.string,
	hair_color: PropTypes.string,
	eye_color: PropTypes.string,
	gender: PropTypes.string
};

export default Cards;
