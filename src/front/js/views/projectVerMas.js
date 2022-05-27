import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserHomeList } from "../component/userHomeList";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/project.css";
export const ProjectVerMas = () => {
	// console.log(useParams());
	const { id } = useParams();
	const { store, actions } = useContext(Context);

	const [proyecto, setProject] = React.useState([]);

	useEffect(() => {
		const obtenerProyecto = async () => {
			const data = await fetch(
				`https://3001-xetnal-finalproject-kainuymmez4.ws-us46.gitpod.io/api/projects/${id}`
			);
			const project = await data.json();
			setProject(project);
		};
		obtenerProyecto();
	}, [id]);

	useEffect(() => {
		console.log(proyecto.id);
		actions.getPostulacionesByProject(proyecto.id);
		console.log(store.projectPostulaciones);
	}, [proyecto]);

	return (
		<div className="container mt-4 p-0">
			<h2>{proyecto.address}</h2>
			<div className="row">
				<div className="col-12 col-lg-8 p-0">
					<div className="card">
						<div id="demo" className="carousel slide" data-bs-ride="carousel">
							<div className="carousel-indicators">
								<button
									type="button"
									data-bs-target="#demo"
									data-bs-slide-to={0}
									className="active"
								/>
								<button
									type="button"
									data-bs-target="#demo"
									data-bs-slide-to={1}
								/>
								<button
									type="button"
									data-bs-target="#demo"
									data-bs-slide-to={2}
								/>
							</div>
							{/* The slideshow/carousel */}
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img
										src={proyecto.pictures}
										alt="Los Angeles"
										className="d-block w-100"
									/>
								</div>
								<div className="carousel-item">
									<img
										src={proyecto.pictures}
										alt="Chicago"
										className="d-block w-100"
									/>
								</div>
								<div className="carousel-item">
									<img
										src={proyecto.pictures}
										alt="New York"
										className="d-block w-100"
									/>
								</div>
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-bs-target="#demo"
								data-bs-slide="prev"
							>
								<span className="carousel-control-prev-icon" />
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#demo"
								data-bs-slide="next"
							>
								<span className="carousel-control-next-icon" />
							</button>
						</div>
					</div>
				</div>
				<div className="col-12 col-lg-4">
					<h2>Detalles: </h2>
					<div className="row">
						<div className="col-6 ">
							<p>Venta: </p>
							<p>Precio desde: </p>
							<p>Ciudad:</p>
							<p>Dormitorios desde: </p>
							<p>Baños desde: </p>
							<p>Superficie desde:</p>
							<p>Estacionamientos: </p>
							<p>Bodega: </p>
							<p>Renta minima: </p>
						</div>
						<div className="col-6 ">
							<p>{proyecto.sale_type} </p>
							<p>UF {proyecto.total_price}</p>
							<p> {proyecto.ciudad} </p>
							<p>{proyecto.rooms}</p>
							<p>{proyecto.bathrooms}</p>
							<p>
								{proyecto.size} m<sup>2</sup>
							</p>
							<p>{proyecto.parking_spots}</p>
							<p>{proyecto.bodega}</p>
							<p>{proyecto.minimum_value}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid p-0">
				<h4>Ubicación</h4>
				<p>{proyecto.address}</p>
				<h4>Descripción</h4>
				<p>{proyecto.body}</p>
				<h4>Equipamiento</h4>
				<p>{proyecto.perks}</p>
			</div>

			<div className="container-fluid p-0 d-flex justify-content-center mt-4">
				<Link to="/company_dashboard">
					<button type="button" className="btn btn-primary">
						volver
					</button>
				</Link>
			</div>
		</div>
	);
};

{
	/* <Link to="/company_dashboard">
				<button type="button" className="btn btn-primary">
					volver
				</button>
			</Link> */
}
