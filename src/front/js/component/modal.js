import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export function Modal1(props) {
	const { store, actions } = useContext(Context);

	//Agregar a favoritos por evento---------------------------------------------------------------->//

	const OnClickEvent = e => {
		const Id_Producto = props.id;
		console.log(store.favorites.filter(Dif_Id_Producto => Dif_Id_Producto === Id_Producto));
		if (store.favorites.filter(Dif_Id_Producto => Dif_Id_Producto === Id_Producto).length > 0) {
			//
			//Al ser Dif_Id_Producto distinto de Id_Producto, find no lo retorna.
			console.log("No se agrega");
		} else {
			actions.AgregarFavoritos(Id_Producto, props.product_name);
			//De lo contrario, agregar producto.
			console.log("Se agrega" + props.id);
			var myHeaders = new Headers();
			myHeaders
				.append
				//"Authorization", Sacar de sesion storage
				//"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMTMwOTEwOCwianRpIjoiZjM1ZmE3OTItM2JhYS00Mzg5LTk1MTQtOGFkMGY4YTg5NzI0IiwibmJmIjoxNjIxMzA5MTA4LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxMjMsImV4cCI6MTYyMTMxMDAwOH0.8DCZM72VIfAg1Chwz6ghco-WtD1RP3FlDLmYK-o4uXk"
				();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				//username: "123", tiene que salir del sesion storage
				product: props.id
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};

			fetch("BACKEND_URL", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
		}
	};

	//Inicio codigo de modal React-Bootstrap//

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	let elemento = props.location;
	return (
		<>
			<Button variant="btn btn-outline-success float-right" onClick={handleShow}>
				Ver detalles
			</Button>
			<button type="button" className="btn btn-outline-success float-right">
				<i className="fas fa-heart" onClick={e => OnClickEvent(e)} />
			</button>

			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>
						<img src={props.image} className="card-img-top" alt="..." />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table responsive="sm">
						<thead>
							<tr>
								<th>Nombre del producto:</th>
								<th>{props.product_name}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Supermercado:</td>
								<td>{props.market_name}</td>
							</tr>
							<tr>
								<td>Localización:</td>
								<td>{elemento}</td>
							</tr>
							<tr>
								<td>Unidades:</td>
								<td>1 ud</td>
							</tr>
							<tr>
								<td>Categoría:</td>
								<td>{props.category}</td>
							</tr>
							<tr>
								<td>Precio:</td>
								<td>{props.price}</td>
							</tr>
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
					<Link to={"/products"}>
						<Button variant="warning">Regresar a listado de productos</Button>
					</Link>
				</Modal.Footer>
			</Modal>
		</>
	);
}
Modal1.propTypes = {
	image: PropTypes.string,
	product_name: PropTypes.string,
	market_name: PropTypes.string,
	location: PropTypes.string,
	category: PropTypes.string,
	price: PropTypes.number,
	id: PropTypes.number
};
