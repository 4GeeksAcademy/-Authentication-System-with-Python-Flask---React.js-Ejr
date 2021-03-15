import React from "react";
//import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
//import { Context } from "../store/appContext";
//import { useParams } from "react-router-dom";
import Comment from "../component/comment";


const PymeProfile = ({pymes}) => {
	return (
		<>
			<div>
				<img
					className="card-img-top rounded-right shadow mt-3"
					style={{ width: "100%", height: "400px", margin: "0 auto" }}
					src={pymes.imagen}
					alt="Card image cap"
				/>
			</div>
			<div className="container">
				<div className="row" style={{ marginBottom: "37px", marginTop: "68px" }}>
					<h1 className="font-weight-bolder" style={{ paddingLeft: "13px" }}>
						{pymes.name}
					</h1>
				</div>
				<div className="d-flex mb-3">
					<div className="d-inline mr-3">
						<i className="fas fa-2x fa-map-marked-alt" />
					</div>
					<div className="d-inline font-italic">
						<h3>{pymes.provincia}, Costa Rica</h3>
					</div>
				</div>
				<div className="row d-flex">
					<div className="col-sm-12 col-md-8">
                    <p>{pymes.descripcion}</p>
					</div>
					<div className="col-sm-12 col-md-4">
						<img
							className="card-img-top"
							style={{ height: "230px", margin: "0 auto" }}
							src="https://images.squarespace-cdn.com/content/v1/555cbc7ee4b059e095f39179/1488390070674-CXYQU17QO2DSEV4TJ5V5/ke17ZwdGBToddI8pDm48kMxP3zelORv554bfrCgYiuNZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIO3p9JfP_jmAUPHyNnkpZX7wqTYQ8n-Q3yghIWqr7I-w/map-la-fortuna-arenal-costa-rica.jpg"
							alt="Card image cap"
						/>
					</div>
				</div>
				<div className="row" style={{ paddingLeft: "14px" }}>
                    <p>{pymes.info_adicional}</p>
				</div>
				<div className="row mt-3 mb-3" style={{ paddingLeft: "13px" }}>
					<h3>Contáctenos:</h3>
				</div>
				<div className="pl-3">
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="fas fa-phone" />
							</div>
							<div className="d-inline font-italic">
								<h5>+(506) 4000-2026</h5>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="far fa-envelope" />
							</div>
							<div className="d-inline font-italic">
								<h5>{pymes.email}</h5>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="fas fa-clock" />
							</div>
							<div className="d-inline font-italic">
                            <h5>{pymes.horario}</h5>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="fas fa-globe" />
							</div>
							<div className="d-inline font-italic">
								<h5>{pymes.site_web}</h5>
							</div>
						</div>
					</div>
				</div>
				<div className="embed-responsive embed-responsive-16by9 mb-5">
					<iframe
						className="embed-responsive-item"
						src={pymes.link_youtube}
						allowFullScreen
					/>
				</div>
			</div>
		</>
	);
};

export const PymeView = () => {
	return (
		<div>
			<div className="container">
				<PymeProfile />
			</div>
			<hr />
			<div className="container">
				<Comment />
			</div>
		</div>
	);
};


PymeProfile.propTypes = {
	pymes: PropTypes.object
};
