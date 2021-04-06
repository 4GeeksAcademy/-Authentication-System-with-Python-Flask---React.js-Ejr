import React from "react";
import { Context } from "../store/appContext";
import { ProgressBar } from "react-bootstrap";

const ProgressBar2 = ({ getTotales, comments }) => {
	const { total1, total2, total3, total4, total5 } = getTotales(comments);
	console.log(total1, total2, total3, total4, total5);

	const getTotales = comments => {
		let total1 = 0;
		let total2 = 0;
		let total3 = 0;
		let total4 = 0;
		let total5 = 0;
		comments.map(item => {
			if (item.count === 1) total1++;
			if (item.count === 2) total2++;
			if (item.count === 3) total3++;
			if (item.count === 4) total4++;
			if (item.count === 5) total5++;
		});
		return { total5, total4, total3, total2, total1 };
	};

	return (
		<>
			<div className="col-sm-3">
				<h5>Desglose de Calificación</h5>
				<div className="pull-left">
					<div className="pull-left" style={{ width: "35px", lineHeight: "1.5" }}>
						<div style={{ height: "9px", margin: "{5px 0}" }}>
							<span className="fas fa-star" style={{ position: "relative", left: "-20px" }}></span>
						</div>
					</div>
					<div className="pull-left" style={{ width: "180px" }}>
						<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
							<ProgressBar
								variant="success"
								now={(total1 * 100) / comments.length}
								style={{ width: "100%" }}
							/>
							<span className="sr-only">80% Complete (danger)</span>
						</div>
					</div>
					<div className="pull-right" style={{ marginLeft: "-35px", marginTop: "-20px" }}>
						1
					</div>
				</div>
				<div className="pull-left">
					<div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
						<div style={{ height: "9px", margin: "{5px 0}" }}>
							<span className="fas fa-star" style={{ position: "relative", left: "-20px" }}></span>
						</div>
					</div>
					<div className="pull-left" style={{ width: "180px" }}>
						<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
							<ProgressBar
								variant="info"
								now={(total2 * 100) / comments.length}
								style={{ width: "100%" }}
							/>
						</div>
					</div>
					<div className="pull-right" style={{ marginLeft: "-35px", marginTop: "-20px" }}>
						2
					</div>
				</div>
				<div className="pull-left">
					<div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
						<div style={{ height: "9px", margin: "{5px 0}" }}>
							<span className="fas fa-star" style={{ position: "relative", left: "-20px" }}></span>
						</div>
					</div>
					<div className="pull-left" style={{ width: "180px" }}>
						<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
							<ProgressBar now={(total3 * 100) / comments.length} style={{ width: "100%" }} />
						</div>
					</div>
					<div className="pull-right" style={{ marginLeft: "-35px", marginTop: "-20px" }}>
						3
					</div>
				</div>
				<div className="pull-left">
					<div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
						<div style={{ height: "9px", margin: "{5px 0}" }}>
							<span className="fas fa-star" style={{ position: "relative", left: "-20px" }}></span>
						</div>
					</div>

					<div className="pull-left" style={{ width: "180px" }}>
						<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
							<ProgressBar
								variant="warning"
								now={(total4 * 100) / comments.length}
								style={{ width: "100%" }}
							/>
						</div>
					</div>
					<div
						className="pull-right"
						style={{ marginLeft: "-35px", marginTop: "-20px", fontFamily: "Catamaran" }}>
						4
					</div>
				</div>
				<div className="pull-left">
					<div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
						<div style={{ height: "9px", margin: "{5px 0}" }}>
							<span className="fas fa-star" style={{ position: "relative", left: "-20px" }}></span>
						</div>
					</div>
					<div className="pull-left" style={{ width: "180px" }}>
						<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
							<ProgressBar
								variant="danger"
								now={(total5 * 100) / comments.length}
								style={{ width: "100%" }}
							/>
						</div>
					</div>
					<div
						className="pull-right"
						style={{ marginLeft: "-35px", marginTop: "-20px", fontFamily: "Catamaran" }}>
						5
					</div>
				</div>
			</div>
		</>
	);
};

export default ProgressBar2;
