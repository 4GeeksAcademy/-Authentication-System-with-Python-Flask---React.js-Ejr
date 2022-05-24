import React from "react";
import { Link } from "react-router-dom";

export const CompanyProyects = (
	handleSubmit,
	title,
	setTitle,
	address,
	setAddress,
	size,
	setSize,
	sale_type,
	setSale_type,
	bathrooms,
	setBathrooms,
	perks,
	setPerks,
	rooms,
	setRooms,
	monto_reserva,
	setMonto_reserva,
	bono_pie,
	setBono_pie,
	parking_spots,
	setParking_spots,
	bodega,
	setBodega,
	total_price,
	setTotal_price,
	/* pictures, */
	setPictures,
	comuna,
	setComuna,
	ciudad,
	setCiudad,
	body,
	setBody
) => {
	return (
		<div className="card text-bg-light mb-3" style={{ maxWidth: "30rem" }}>
			<h5 className="card-header">Proyecto</h5>
			<div className="card-body">
				<div className="row">
					<div className="col-12">
						<p className="card-text m-0 fw-bold">Nombre: </p>
						<p className="card-text" value={title}>
							{setTitle}
						</p>
						<p className="card-text m-0 fw-bold">Direccion:</p>
						<p className="card-text" value={address}>
							{setAddress}
						</p>
						<p className="card-text m-0 fw-bold">Comuna:</p>
						<p className="card-text" value={comuna}>
							{setComuna}
						</p>
						<p className="card-text m-0 fw-bold">Ciudad:</p>
						<p className="card-text" value={ciudad}>
							{setCiudad}
						</p>
						<p className="card-text m-0 fw-bold">Tamaño:</p>
						<p className="card-text" value={size}>
							{setSize}
						</p>
						<p className="card-text m-0 fw-bold">Reserva:</p>
						<p className="card-text" value={monto_reserva}>
							{setMonto_reserva}
						</p>
						<p className="card-text m-0 fw-bold">Bono Pie:</p>
						<p className="card-text" value={bono_pie}>
							{setBono_pie}
						</p>
						<p className="card-text m-0 fw-bold">Estacionamientos:</p>
						<p className="card-text" value={parking_spots}>
							{setParking_spots}
						</p>
						<p className="card-text m-0 fw-bold">Bodega:</p>
						<p className="card-text" value={bodega}>
							{setBodega}
						</p>
						<p className="card-text m-0 fw-bold">Precio Total:</p>
						<p className="card-text" value={total_price}>
							{setTotal_price}
						</p>
						<p className="card-text m-0 fw-bold">Foto:</p>
						<p className="card-text" value={pictures}>
							{setPictures}
						</p>
						<p className="card-text m-0 fw-bold">Descripcion:</p>
						<p className="card-text" value={body}>
							{setBody}
						</p>
						<p className="card-text m-0 fw-bold">Ventajas:</p>
						<p className="card-text" value={perks}>
							{setPerks}
						</p>
						<p className="card-text m-0 fw-bold">Baños:</p>
						<p className="card-text" value={bathrooms}>
							{setBathrooms}
						</p>
						<p className="card-text m-0 fw-bold">Habitaciones:</p>
						<p className="card-text" value={rooms}>
							{setRooms}
						</p>
						<p className="card-text m-0 fw-bold">Tipo de Venta:</p>
						<p className="card-text" value={sale_type}>
							{setSale_type}
						</p>
						<button className="btn btn-danger">Eliminar</button>
					</div>
				</div>
			</div>
		</div>
	);
};
