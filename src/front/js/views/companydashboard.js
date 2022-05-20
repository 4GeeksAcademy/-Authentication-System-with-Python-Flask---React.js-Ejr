import React, { useContext, useState } from "react";
/* import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Proyect } from "./proyect"; */
import { CompanyProyects } from "./companyProyects";
import { RegisterProyectForm } from "./registerProyectForm";

export const CompanyDashboard = () => {
	const [title, setTitle] = useState("");
	const [address, setAdress] = useState("");
	const [size, setSize] = useState(0);
	const [sale_type, setSale_type] = useState("");
	const [bathrooms, setBathrooms] = useState(0);
	const [perks, setPerks] = useState("");
	const [rooms, setRooms] = useState("");
	const [monto_reserva, setMonto_reserva] = useState(0);
	const [bono_pie, setBono_pie] = useState(0);
	const [parking_spot, setParking_spot] = useState(0);
	const [bodega, setBodega] = useState("");
	const [total_price, setTotal_price] = useState(0);
	const [pictures, setPictures] = useState("sin-foto.png");
	//agregar las siguientes
	const [comuna, setComuna] = useState("");
	const [ciudad, setCiudad] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
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
		formData.append("parking_spot", parking_spot);
		formData.append("bodega", bodega);
		formData.append("total_price", total_price);
		formData.append("pictures", pictures);

		const info = await registerFetch(formData);
		console.log(info);
	};

	const registerFetch = async (data) => {
		const respuesta = await fetch(
			"https://3001-xetnal-finalproject-rjwnejuo77t.ws-us45.gitpod.io/api/projects",
			{ method: "POST", body: data }
		);
		const info = await respuesta.json();
		return info;
	};

	return (
		<>
			<h1>Estos son tus proyectos ya publicados:</h1>
			<br />

			<CompanyProyects />

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
				parking_spots={parking_spot}
				setParking_spots={setParking_spot}
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
