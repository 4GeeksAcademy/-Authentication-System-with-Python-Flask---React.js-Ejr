import React, { useContext } from "react";
/* import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Proyect } from "./proyect"; */
import { CompanyProyects } from "./companyProyects";

/* "company_id": self.company_id,
            "title": self.title,
            "address": self.address,
            "comuna": self.comuna,
            "ciudad": self.ciudad,
            "size": self.size,
            "sale_type": self.sale_type,
            "bathrooms": self.bathrooms, 
            'rooms': self.rooms,
            'monto_reserva': self.monto_reserva,
            'bono_pie': self.bono_pie,
            'parking_spots': self.parking_spots,
            'bodega': self.bodega,
            'total_price': self.total_price,
            'pictures': self.pictures,
            'body': self.body,
            'perks': self.perks */

export const CompanyDashboard = () => {
	const handleSubmit = (e) => {
		console.log("hola");
	};

	return (
		<>
			<h1>Estos son tus proyectos ya publicados:</h1>
			<br />
			<CompanyProyects />

			<h1>Formulario para subir un proyecto:</h1>
			<div className="container">
				<form className="row" onSubmit={handleSubmit}>
					<div className="col-6">
						<div className="form-group">
							<label>Nombre del Proyecto</label>
							<input
								type="text"
								className="form-control"
								id="InputNombre"
								aria-describedby="emailHelp"
								placeholder="Ingresa tu nombre"
							/>
							<label>Direccion</label>
							<input
								type="text"
								className="form-control"
								id="Rut"
								aria-describedby="emailHelp"
								placeholder="Ingresa tu rut"
							/>
							<label>Mt2</label>
							<input
								type="telephone"
								className="form-control"
								id="InputTelefono"
								aria-describedby="emailHelp"
								placeholder="Ingresa tu telefono"
							/>
							<label>Tipo de Venta</label>
							<input
								type="text"
								className="form-control"
								id="InputTipoVenta"
								placeholder="Ingresa el tipo de venta"
							/>
							<label>Numero de Baños:</label>
							<input
								type="text"
								className="form-control"
								id="InputBaños"
								placeholder="Cantidad de Baños"
							/>
							<label>Tipo de Venta</label>
							<input
								type="text"
								className="form-control"
								id="InputTipoVenta"
								placeholder="Ingresa el tipo de venta"
							/>
							<label>Numero de Habitaciones</label>
							<input
								type="number"
								className="form-control"
								id="InputHabitaciones"
								placeholder="Ingrese cantidad de habitaciones"
							/>
							{/* <Link to="/user_profile_setup"> */}
							<button type="submit" className="btn btn-primary mt-3">
								Publicar
							</button>
							{/* </Link> */}
						</div>
					</div>
					{/* de aqui para abajo, la columna derecha del fromulairo */}
					<div className="col-6">
						<div className="form-group">
							<label>Monto de Reserva</label>
							<input
								type="number"
								className="form-control"
								id="InputMontoReserva"
								placeholder="Ingresa el Monto"
							/>
							<label>Bono Pie</label>
							<input
								type="number"
								className="form-control"
								id="InputBonoPie"
								placeholder="Ingrese si cuenta con un bono"
							/>
							<label>Numero de Estacionamientos</label>
							<input
								type="number"
								className="form-control"
								id="InputEstacionamiento"
								placeholder="Ingrese el numero de estacionamientos"
							/>
							<label>Bodega</label>
							<input
								type="text"
								className="form-control"
								id="InputBodega"
								placeholder="Cuenta con Bodega?"
							/>
							<label>Descripcion</label>
							<input
								type="text"
								className="form-control"
								id="InputDescripcion"
								placeholder="Ingrese una descripcion"
							/>
							<label>Precio</label>
							<input
								type="email"
								className="form-control"
								id="InputEmail1"
								aria-describedby="emailHelp"
								placeholder="Ingresa tu email"
							/>
							<label>Foto</label>
							<input
								type="password"
								className="form-control"
								id="InputPassword1"
								placeholder="Ingresa tu contraseña"
							/>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
