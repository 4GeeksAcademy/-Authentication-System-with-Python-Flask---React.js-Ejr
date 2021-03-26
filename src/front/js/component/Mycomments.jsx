import React from "react";
import { personA, personB, personC, personD } from "../../img/image";
import { ProgressBar } from "react-bootstrap";

export const Comments = () => {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-sm-3">
						<div className="rating-block">
							<h4>Average user rating</h4>
							<h2 className="bold padding-bottom-7">
								4.3 <small>/ 5</small>
							</h2>
							{/* Estrellas de puntuación */}
							<button
								type="button"
								className="btn btn-warning btn-sm"
								aria-label="Left Align"
								style={{ margin: "1px" }}>
								<span className="fas fa-star" aria-hidden="true"></span>
							</button>
							<button
								type="button"
								className="btn btn-warning btn-sm"
								aria-label="Left Align"
								style={{ margin: "1px" }}>
								<span className="fas fa-star" aria-hidden="true"></span>
							</button>
							<button
								type="button"
								className="btn btn-warning btn-sm"
								aria-label="Left Align"
								style={{ margin: "1px" }}>
								<span className="fas fa-star" aria-hidden="true"></span>
							</button>
							<button
								type="button"
								className="btn btn-default btn-grey btn-sm"
								aria-label="Left Align"
								style={{ margin: "1px", backgroundColor: "#C0C0C0" }}>
								<span className="fas fa-star" aria-hidden="true"></span>
							</button>
							<button
								type="button"
								className="btn btn-default btn-grey btn-sm"
								aria-label="Left Align"
								style={{ margin: "1px", backgroundColor: "#C0C0C0" }}>
								<span className="fas fa-star" aria-hidden="true"></span>
							</button>
						</div>
					</div>
					{/* Barras de progreso */}
					<div className="col-sm-3">
						<h4>Rating breakdown</h4>
						<div className="pull-left">
							<div className="pull-left" style={{ width: "35px", lineHeight: "1.5" }}>
								<div style={{ height: "9px", margin: "{5px 0}" }}>
									<span
										className="fas fa-star"
										style={{ position: "relative", left: "-20px" }}></span>
								</div>
							</div>
							<div className="pull-left" style={{ width: "180px" }}>
								<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
									<ProgressBar variant="success" now={100} style={{ width: "100%" }} />
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
									<span
										className="fas fa-star"
										style={{ position: "relative", left: "-20px" }}></span>
								</div>
							</div>
							<div className="pull-left" style={{ width: "180px" }}>
								<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
									<ProgressBar variant="info" now={80} style={{ width: "100%" }} />
								</div>
							</div>
							<div className="pull-right" style={{ marginLeft: "-35px", marginTop: "-20px" }}>
								2
							</div>
						</div>
						<div className="pull-left">
							<div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
								<div style={{ height: "9px", margin: "{5px 0}" }}>
									<span
										className="fas fa-star"
										style={{ position: "relative", left: "-20px" }}></span>
								</div>
							</div>
							<div className="pull-left" style={{ width: "180px" }}>
								<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
									<ProgressBar now={60} style={{ width: "100%" }} />
								</div>
							</div>
							<div className="pull-right" style={{ marginLeft: "-35px", marginTop: "-20px" }}>
								3
							</div>
						</div>
						<div className="pull-left">
							<div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
								<div style={{ height: "9px", margin: "{5px 0}" }}>
									<span
										className="fas fa-star"
										style={{ position: "relative", left: "-20px" }}></span>
								</div>
							</div>

							<div className="pull-left" style={{ width: "180px" }}>
								<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
									<ProgressBar variant="warning" now={40} style={{ width: "100%" }} />
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
									<span
										className="fas fa-star"
										style={{ position: "relative", left: "-20px" }}></span>
								</div>
							</div>
							<div className="pull-left" style={{ width: "180px" }}>
								<div className="progress" style={{ height: "9px", margin: "{8px 0}" }}>
									<ProgressBar variant="danger" now={20} style={{ width: "100%" }} />
								</div>
							</div>
							<div
								className="pull-right"
								style={{ marginLeft: "-35px", marginTop: "-20px", fontFamily: "Catamaran" }}>
								5
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-7">
						<hr />
						<div className="review-block">
							<div className="row">
								<div className="col-sm-3">
									<img
										src="http://dummyimage.com/60x60/666/ffffff&text=No+Image"
										className="img-rounded"
									/>
									<div className="review-block-name">
										<a href="#">Romina Fuentes</a>
									</div>
									<div className="review-block-date">
										24 Marzo 2021
										<br />
										Hoy
									</div>
								</div>

								<div className="col-sm-9">
									<div className="review-block-rate">
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-default btn-grey btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px", backgroundColor: "#C0C0C0" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
									</div>
									<div className="review-block-title">Excelente Servicio</div>
									<div className="review-block-description">
										Me encanto su trabajo, 100% recomendable. Todo lo que pedí es justo lo que
										necesitaba
									</div>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<img
										src="http://dummyimage.com/60x60/666/ffffff&text=No+Image"
										className="img-rounded"
									/>
									<div className="review-block-name">
										<a href="#">Nik Taylor</a>
									</div>
									<div className="review-block-date">
										10 Marzo 2021
										<br />
										10 días antes
									</div>
								</div>

								<div className="col-sm-9">
									<div className="review-block-rate">
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
									</div>
									<div className="review-block-title">Muy Profesional</div>
									<div className="review-block-description">
										Desde el principio de la comunicación fue una personas muy formal y cumplió con
										todos los requerimientos que hice.
									</div>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<img
										src="http://dummyimage.com/60x60/666/ffffff&text=No+Image"
										className="img-rounded"
									/>
									<div className="review-block-name">
										<a href="#">Freddy Scott</a>
									</div>
									<div className="review-block-date">
										15 Abril 2021
										<br />
										10 días atrás
									</div>
								</div>

								<div className="col-sm-9">
									<div className="review-block-rate">
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-warning btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-default btn-grey btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px", backgroundColor: "#C0C0C0" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-default btn-grey btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px", backgroundColor: "#C0C0C0" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
										<button
											type="button"
											className="btn btn-default btn-grey btn-sm"
											aria-label="Left Align"
											style={{ margin: "1px", backgroundColor: "#C0C0C0" }}>
											<span className="fas fa-star" aria-hidden="true"></span>
										</button>
									</div>
									<div className="review-block-title">Recomendable para otros trabajos</div>
									<div className="review-block-description">
										Una persona muy responsable, fue un gusto trabajar con él. Seguiré ocupando sus
										servicios en mis próximos pryoectos, Gracias por tu ayuda!!
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
