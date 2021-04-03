import React from "react";
// import { Link } from "react-router-dom";
import "../styles/home.css";
import Picture from "/workspace/canchapp2/src/front/img/vectorstock_8229541.png";
const Stepper = () => {
	return (
		<div className="card-group">
			<div className="card">
				<img src={Picture} className="stepper-1 card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Paso 1</h5>
					<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
				{/* <div className="card-footer">
					<small className="text-muted">Last updated 3 mins ago</small>
				</div> */}
			</div>
			<div className="card">
				<img src={Picture} className="stepper-2 card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Paso 2</h5>
					<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
				{/* <div className="card-footer">
					<small className="text-muted">Last updated 3 mins ago</small>
				</div> */}
			</div>
			<div className="card">
				<img src={Picture} className="stepper-3 card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Paso 3</h5>
					<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
				{/* <div className="card-footer">
					<small className="text-muted">Last updated 3 mins ago</small>
				</div> */}
			</div>
            <div className="card">
				<img src={Picture} className="stepper-3 card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Paso 3</h5>
					<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
				{/* <div className="card-footer">
					<small className="text-muted">Last updated 3 mins ago</small>
				</div> */}
			</div>
             <div className="card">
				<img src={Picture} className="stepper-3 card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Paso 3</h5>
					<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
				{/* <div className="card-footer">
					<small className="text-muted">Last updated 3 mins ago</small>
				</div> */}
			</div>
		</div>
	);
};

export default Stepper;
