import React from "react";
// import { Context } from "../store/appContext";
import Stepper from "../component/stepper";

export const Home = () => {
	return (
		<>
			<div className="contenedor">
				<div className="fondo_header">
					{/*Inicio Formulario*/}
					<div className="main">
						<div className="container">
							<form id="booking-form" className="booking-form">
								<div className="form-group">
									<div className="form-destination">
										<label>Selecciona tu Región</label>
										<input type="text" placeholder="Santiago" />
									</div>
									<div className="form-destination">
										<label>Selecciona tu Comuna</label>
										<input type="text" placeholder="Renca" />
									</div>
									<div className="form-destination">
										<label>Selecciona la cancha</label>
										<input
											type="text"
											id="destinatio"
											name="destination"
											placeholder="La Montura"
										/>
									</div>
									<div className="form-quantity">
										<label>Horario</label>
										<input type="time" id="appt" name="appt" min="09:00" max="18:00" required />
									</div>

									<div className="form-submit">
										<input type="submit" id="submit" className="submit" value="Reservar" />
									</div>
								</div>
							</form>
						</div>
					</div>
					{/*Fin Formulario*/}
				</div>
			</div>
			<Stepper />;
		</>
	);
};
