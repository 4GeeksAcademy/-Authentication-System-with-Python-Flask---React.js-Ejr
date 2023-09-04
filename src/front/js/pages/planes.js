import React from "react";
import "../../styles/home.css";
import Pricing from "../component/princing";

const Planes = () => {
	return (
		<div className="App">

			<div className="row">
				<div style={{ textAlign: "center" }} className="col-12">

					<h1 > <div style={{
						borderBottom: "6px solid orange",
						paddingBottom: "5px",
						width: "119px",
						marginLeft: "41%"
					}}
					>Planes</div></h1>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<Pricing
						planes="Basic"
						price="$5"
						pack="2 Eventos al año"
						event="10 equipos por evento"
						admi="Administración de personal"
						control="Control de ingresos"
					/>
				</div>
				<div className="col">
					<Pricing
						planes="Advance"
						price="$10"
						pack="5 Eventos al año"
						event="20 equipos por evento"
						admi="Administración de personal"
						control="Control de ingresos"
					/>
				</div>
				<div className="col">
					<Pricing
						planes="Premium"
						price="$15"
						pack="Eventos ilimitados"
						event="Equipos ilimitados"
						admi="Administración de personal"
						control="Control de ingresos"
					/>
				</div>

			</div>

		</div>


	);
}
export default Planes;