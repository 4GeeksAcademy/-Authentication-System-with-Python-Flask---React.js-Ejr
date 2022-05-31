import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserHomeList } from "../component/userHomeList";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/project.css";
import Swal from 'sweetalert2'
export const Project = () => {
	// console.log(useParams());
	const { id } = useParams();
	const { store, actions} = useContext(Context)

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

	React.useEffect(() => {
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
		getUf();
	}, []);

	const [ufs, setUfs] = useState("");

	const getUf = async () => {
		const url =
			"https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=a8423be05204c1cb12e2d950d772c7018d0947ee&formato=json";
		const respuesta = await fetch(url);
		const info = await respuesta.json();
		const objetoUf = info.UFs;
		const valor = objetoUf[0]; 
		console.log(valor);   
		const pesos = valor.Valor;
		console.log(pesos);
		setUfs(pesos);
		console.log(typeof ufs);
	};

	const createPostulacion = ()=>{
		actions.createPostulation(proyecto.id)
		Swal.fire(
			'Felicidades!',
			'La postulacion se realizo con exito!',
			'success'
		  )

	} 

	return (
		<div className="animate__animated animate__fadeIn container mt-4 p-0 ">
			<h2>{proyecto.address}</h2>
			<div className="row">
				<div className="col-12 col-lg-8 p-0">
					<div className="card">
					<img
										src={proyecto.pictures}
										alt="Los Angeles"
										className="d-block w-100"
									/>
					</div>
				</div>
				<div className="col-12 col-lg-4">
					<h2>Detalles: </h2>
					<div className="row">
						<div className="col-6 ">
							<p>Venta: </p>
							<p>Precio desde: </p>
							<p>Valor Uf de hoy :</p>
							<p>Dormitorios desde: </p>
							<p>Baños desde: </p>
							<p>Superficie desde:</p>
							<p>Empresa: </p>
						</div>
						<div className="col-6 ">
							<p>{proyecto.sale_type} </p>
							<p>UF {proyecto.total_price}</p>
							<p> $ {ufs} </p>
							<p>{proyecto.rooms}</p>
							<p>{proyecto.bathrooms}</p>
							<p>
								{proyecto.size} m<sup>2</sup>
							</p>
							<p>{proyecto.title}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid p-0 d-flex justify-content-center mt-4">
				{
					actions.getMinimumValue (proyecto.minimum_value) ?
					(
					<button type="button mx-auto" className="btn btn-primary" onClick={createPostulacion}>
					Postula Acá
				</button>)	
				:
				(<p className="text-danger">Lo sentimos, tu perfil no coincide con los requisitos de este proyecto. </p>)
				}
				
			</div>

			<div className="container-fluid p-0">
				<h4>Ubicación</h4>
				<p>
					A pasos de la estación de metro Los Quillayes Ciclovía al exterior que
					conecta con red de ciclovías Rápido acceso a Autopistas.
				</p>
				<h4>Descripción</h4>
				<p>{proyecto.body}</p>
				<h4>Equipamiento</h4>
				<p>{proyecto.perks}</p>
			</div>

			<div className="container p-0 mt-4 d-flex justify-content-center">
				<Link to={"/user_home"}>
					<button type="button" className="btn btn-primary mb-4">
						Volver
					</button>
				</Link>
    		</div>
		</div>
	);
};
