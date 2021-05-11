import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Cupones = props => {
	return (
		<div className="card mb-3">
			<div className="row g-0">
				<div className="col-md-4">
					<img
						src="https://express.dospinos.com/media/catalog/product/1/5/15002977_1.jpg"
						className="card-img-top"
						alt="..."
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</p>
						<button type="button" className="btn btn-success">
							Success
						</button>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
