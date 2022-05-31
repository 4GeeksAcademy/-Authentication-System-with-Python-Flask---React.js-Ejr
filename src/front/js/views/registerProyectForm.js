import React from "react";
import "../../styles/login.css";

export const RegisterProyectForm = ({
	minimum_value,
	setMinimumValue,
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
	setBody,
}) => {
	return (
		<>
			<div className="container my-5">
				<form
					className="animate__animated animate__fadeInRightBig row"
					onSubmit={handleSubmit}
				>
					<div className="col-6">
						<div className="form-group">
							<label className="fw-bold">Nombre del Proyecto</label>
							<input
								type="text"
								className="form-control"
								name="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Ingresa tu nombre"
							/>
							<label className="fw-bold">Comuna</label>
							<input
								type="text"
								className="form-control"
								name="comuna"
								value={comuna}
								onChange={(e) => setComuna(e.target.value)}
								placeholder="Ingresa la comuna"
							/>
							<label className="fw-bold">Ciudad </label>
							<input
								type="text"
								className="form-control"
								name="ciudad"
								value={ciudad}
								onChange={(e) => setCiudad(e.target.value)}
								placeholder="Ingresa tu nombre"
							/>
							<label className="fw-bold">Direccion</label>
							<input
								type="text"
								className="form-control"
								name="address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								placeholder="Ingresa tu rut"
							/>
							<label className="fw-bold">Tamaño Mt2</label>
							<input
								type="number"
								className="form-control"
								name="size"
								value={size}
								onChange={(e) => setSize(e.target.value)}
								placeholder="Ingrese los Mt2"
							/>
							<label className="fw-bold">Tipo de Venta (Verde o Blanco)</label>
							<input
								type="text"
								className="form-control"
								name="sale_type"
								value={sale_type}
								onChange={(e) => setSale_type(e.target.value)}
								placeholder="Ingresa el tipo de venta"
							/>
							<label className="fw-bold">Numero de Baños:</label>
							<input
								type="number"
								className="form-control"
								name="bathrooms"
								value={bathrooms}
								onChange={(e) => setBathrooms(e.target.value)}
								placeholder="Cantidad de Baños"
							/>
							<label className="fw-bold">Ventajas</label>
							<input
								type="text"
								className="form-control"
								name="perks"
								value={perks}
								onChange={(e) => setPerks(e.target.value)}
								placeholder="Que Ventajas ofrece?"
							/>
							<label className="fw-bold">Numero de Habitaciones</label>
							<input
								type="number"
								className="form-control"
								name="rooms"
								value={rooms}
								onChange={(e) => setRooms(e.target.value)}
								placeholder="Ingrese cantidad de habitaciones"
							/>
							{/* <Link to="/user_profile_setup"> */}
							<button
								type="submit"
								className="btn btn-primary mt-3 boton-publicar"
							>
								Publicar
							</button>
							{/* </Link> */}
						</div>
					</div>
					{/* de aqui para abajo, la columna derecha del fromulairo centrado */}
					<div className="col-6">
						<div className="form-group">
							<label className="fw-bold">Monto de Reserva </label>
							<input
								type="number"
								className="form-control"
								name="monto_reserva"
								value={monto_reserva}
								onChange={(e) => setMonto_reserva(e.target.value)}
								placeholder="Ingresa el Monto"
							/>
							<label className="fw-bold">Bono Pie (%)</label>
							<input
								type="number"
								className="form-control"
								name="bono_pie"
								value={bono_pie}
								onChange={(e) => setBono_pie(e.target.value)}
								placeholder="Ingrese si cuenta con un bono"
							/>
							<label className="fw-bold">Numero de Estacionamientos</label>
							<input
								type="number"
								className="form-control"
								name="parking_spots"
								value={parking_spots}
								onChange={(e) => setParking_spots(e.target.value)}
								placeholder="Ingrese el numero de estacionamientos"
							/>
							<label className="fw-bold">Bodega</label>
							<input
								type="text"
								className="form-control"
								name="bodega"
								value={bodega}
								onChange={(e) => setBodega(e.target.value)}
								placeholder="Cuenta con Bodega?"
							/>
							<label className="fw-bold">Precio (en UF)</label>
							<input
								type="number"
								className="form-control"
								name="total_price"
								value={total_price}
								onChange={(e) => setTotal_price(e.target.value)}
								placeholder="Ingresa tu email"
							/>
							<label className="fw-bold">Descripcion</label>
							<input
								type="text"
								className="form-control"
								name="body"
								value={body}
								onChange={(e) => setBody(e.target.value)}
								placeholder="Ingrese una descripcion"
							/>
							<label className="fw-bold">Renta minima</label>
							<input
								type="number"
								className="form-control"
								name="minimum_value"
								value={minimum_value}
								onChange={(e) => setMinimumValue(e.target.value)}
								placeholder="Ingrese la renta minima requerida"
							/>
							<label className="fw-bold">Foto</label>
							<input
								type="file"
								onChange={(e) => setPictures(e.target.files[0])}
								className="form-control"
							/>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
