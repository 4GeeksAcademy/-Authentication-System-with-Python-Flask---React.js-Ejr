import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
/*import { Link } from "react-router-dom";
import { Proyect } from "./proyect"; */
import { CompanyProyects } from "./companyProyects";
import { RegisterProyectForm } from "./registerProyectForm";
import "../../styles/login.css";

export const CompanyDashboard = () => {
	const { store } = useContext(Context);
	const [proyectos, setProyectos] = useState([]);
	const [title, setTitle] = useState("");
	const [address, setAdress] = useState("");
	const [size, setSize] = useState(0);
	const [sale_type, setSale_type] = useState("");
	const [bathrooms, setBathrooms] = useState(0);
	const [perks, setPerks] = useState("");
	const [rooms, setRooms] = useState("");
	const [monto_reserva, setMonto_reserva] = useState(0);
	const [bono_pie, setBono_pie] = useState(0);
	const [parking_spots, setParking_spots] = useState(0);
	const [bodega, setBodega] = useState("");
	const [total_price, setTotal_price] = useState(0);
	const [pictures, setPictures] = useState(
		"https://imgclasificados3.emol.com/Proyectos/imagenes/proyecto/PR_FOTO_5116_LivingDepto%20304V2.jpg"
	);
	//agregar las siguientes
	const [comuna, setComuna] = useState("");
	const [ciudad, setCiudad] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const objetoProyecto = {
			title: title,
			comuna: comuna,
			ciudad: ciudad,
			body: body,
			address: address,
			size: size,
			sale_type: sale_type,
			bathrooms: bathrooms,
			perks: perks,
			rooms: rooms,
			monto_reserva: monto_reserva,
			bono_pie: bono_pie,

			parking_spots: parking_spots,

			bodega: bodega,
			total_price: total_price,
			pictures: pictures,
		};

		setProyectos([...proyectos, objetoProyecto]);

		const formData = new FormData();
		formData.append("company_id", store.currentUser?.company?.id);
		formData.append("tittle", title);
		formData.append("comuna", comuna);
		formData.append("ciudad", ciudad);
		formData.append("body", body);
		formData.append("address", address);
		formData.append("size", size);
		formData.append("sale_type", sale_type);
		formData.append("bathrooms", bathrooms);
		formData.append("perks", perks);
		formData.append("rooms", rooms);
		formData.append("monto_reserva", monto_reserva);
		formData.append("bono_pie", bono_pie);

		formData.append("parking_spots", parking_spots);

		formData.append("bodega", bodega);
		formData.append("total_price", total_price);
		formData.append("pictures", pictures);

		const info = await registerFetch(formData);
		if (info.id) {
			listProyectos();
		}
	};

	const registerFetch = async (data) => {
		const respuesta = await fetch(
			"https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/projects",
			{
				method: "POST",
				body: data,
			}
		);
		const info = await respuesta.json();
		return info;
	};

	/* const registerFetch = async () => {
		try {
			let config = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(info),
			};
			let res = await fetch(
				"https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/projects",
				config
			);
			let json = await res.json();
			console.log(json);
		} catch (error) {}
	}; */

	const listProyectos = async () => {
		const respuesta = await fetch(
			"https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/projects"
		);
		const info = await respuesta.json();
		setProyectos(info);
	};

	useEffect(() => {
		listProyectos();
	}, []);

	return (
		<>
			<h1>Estos son tus proyectos ya publicados:</h1>
			<br />
			<div className="container">
				<div className="row row-cols-1 row-cols-md-3 g-4">
					{proyectos.map((proyecto) => {
						return (
							<div className="col" >
								<div
									className="card text-bg-light mb-3"
									style={{ maxWidth: "30rem" }}
								>
									<h5 className="card-header">Proyecto: {proyecto.title}</h5>
									<div className="card-body">
										<div className="row">
											<div className="col-12">
												<p className="card-text m-0 fw-bold">Nombre: </p>
												<p className="card-text">{proyecto.title}</p>
												<p className="card-text m-0 fw-bold">Direccion:</p>
												<p className="card-text">{proyecto.address}</p>
												<p className="card-text m-0 fw-bold">Comuna:</p>
												<p className="card-text">{proyecto.comuna}</p>
												<p className="card-text m-0 fw-bold">Ciudad:</p>
												<p className="card-text">{proyecto.ciudad}</p>
												<p className="card-text m-0 fw-bold">Tamaño:</p>
												<p className="card-text">{proyecto.size}</p>
												<p className="card-text m-0 fw-bold">Reserva:</p>
												<p className="card-text">{proyecto.monto_reserva}</p>
												<p className="card-text m-0 fw-bold">Bono Pie:</p>
												<p className="card-text">{proyecto.bono_pie}</p>
												<p className="card-text m-0 fw-bold">
													Estacionamientos:
												</p>
												<p className="card-text">{proyecto.parking_spots}</p>
												<p className="card-text m-0 fw-bold">Bodega:</p>
												<p className="card-text">{proyecto.bodega}</p>
												<p className="card-text m-0 fw-bold">Precio Total:</p>
												<p className="card-text">{proyecto.total_price}</p>
												<p className="card-text m-0 fw-bold">Descripcion:</p>
												<p className="card-text">{proyecto.body}</p>
												<p className="card-text m-0 fw-bold">Ventajas:</p>
												<p className="card-text">{proyecto.perks}</p>
												<p className="card-text m-0 fw-bold">Baños:</p>
												<p className="card-text">{proyecto.bathrooms}</p>
												<p className="card-text m-0 fw-bold">Habitaciones:</p>
												<p className="card-text">{proyecto.rooms}</p>
												<p className="card-text m-0 fw-bold">Tipo de Venta:</p>
												<p className="card-text">{proyecto.sale_type}</p>
												<img
													className="imagen-dashboard"
													src={proyecto.pictures}
												></img>
												<button className="btn btn-danger">Eliminar</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<h1>Formulario para subir un proyecto:</h1>
			<RegisterProyectForm
				handleSubmit={handleSubmit}
				title={title}
				setTitle={setTitle}
				address={address}
				setAddress={setAdress}
				size={size}
				setSize={setSize}
				sale_type={sale_type}
				setSale_type={setSale_type}
				bathrooms={bathrooms}
				setBathrooms={setBathrooms}
				perks={perks}
				setPerks={setPerks}
				rooms={rooms}
				setRooms={setRooms}
				monto_reserva={monto_reserva}
				setMonto_reserva={setMonto_reserva}
				bono_pie={bono_pie}
				setBono_pie={setBono_pie}
				parking_spots={parking_spots}
				setParking_spots={setParking_spots}
				bodega={bodega}
				setBodega={setBodega}
				total_price={total_price}
				setTotal_price={setTotal_price}
				pictures={pictures}
				setPictures={setPictures}
				comuna={comuna}
				setComuna={setComuna}
				ciudad={ciudad}
				setCiudad={setCiudad}
				body={body}
				setBody={setBody}
			/>
		</>
	);
};
