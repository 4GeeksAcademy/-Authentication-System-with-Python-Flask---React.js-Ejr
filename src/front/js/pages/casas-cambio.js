import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import cambioSuiza from "../../img/cambios-suiza.png";
import "../../styles/casas-cambio.css";


export const CasasCambio = () => {
	const { store, actions } = useContext(Context);
	const [seleccionMapa, setSeleccionMapa] = useState("cambios-suiza");
	const mapa = (evento) => {
		setSeleccionMapa(evento.target.value)
	}

	return (
		<div className="d-flex justify-content-around">
			<div>
				<div id="globo-info" className="d-flex">
					<div id="logo-casa">
						<img id="suiza" src={cambioSuiza} alt="logo casa de cambio" />
					</div>
					<div id="info-casa">
						<p> Agustinas 1036, SANTIAGO</p>
						<p>+56-226990811 / +56-226973875</p>
						<p>info@inversionessuiza.cln</p>
						<button id="boton-casa"><a href="http://www.cambiossuiza.com/" target="blank">Ir a casa</a></button>
					</div>
				</div>
				<div id="globo-info" className="d-flex">
					<div id="logo-casa">
						imagen
					</div>
					<div id="info-casa">
						<p>texto, información</p>
						<button id="boton-casa"><a href="http://www.moreexchange.cl/" target="blank">Ir a casa</a></button>

					</div>
				</div>
				<div id="globo-info" className="d-flex">
					<div id="logo-casa">
						imagen
					</div>
					<div id="info-casa">
						<p>texto, información</p>
						<button id="boton-casa"><a href="https://www.cambiosantiago.cl/" target="blank">Ir a casa</a></button>
					</div>
				</div>
				<div id="globo-info" className="d-flex">
					<div id="logo-casa">
						imagen
					</div>
					<div id="info-casa">
						<p>texto, información</p>
						<button id="boton-casa"><a href="http://www.cambiocostero.cl/" target="blank">Ir a casa</a></button>
					</div>
				</div>
			</div>
			<div id="maps">
				<div id="dropdown">
					<select name="casas" id="casas-cambio" onChange={(evento) => mapa(evento)}>
						<option value="cambios-suiza">Cambios Suiza</option>
						<option value="more-exchange">More Exchange</option>
						<option value="cambios-santiago">Cambios Santiago</option>
						<option value="cambio-costero">Cambio Costero</option>
					</select>
				</div>

				{(seleccionMapa == "cambios-suiza")
					?
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.3222058941647!2d-70.65355328426506!3d-33.44091110440973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a154609d6b%3A0x7e08b90ce4e278ce!2sInversiones%20Suiza%20ltda!5e0!3m2!1ses-419!2scl!4v1662910027055!5m2!1ses-419!2scl" width="500" height="600" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
					:
					(seleccionMapa == "more-exchange")
						?
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.500896220115!2d-70.65311982315025!3d-33.435492951555574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5937be7de53%3A0x593260354e02f529!2sMore%20Exchange%20Casa%20de%20Cambios%20-%20Sucursal%20Santiago%20Centro%20(Mall%20Vivo%20El%20Centro)!5e0!3m2!1ses-419!2scl!4v1662820113645!5m2!1ses-419!2scl" width="500" height="600" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
						:
						(seleccionMapa == "cambios-santiago")
							?
							<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6658.893396260464!2d-70.64992263011463!3d-33.437666824310135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scambios%20santiago%20!5e0!3m2!1ses-419!2scl!4v1662820191256!5m2!1ses-419!2scl" width="500" height="600" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
							:
							(seleccionMapa == "cambio-costero") && <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.2593125877843!2d-70.65406968426508!3d-33.44255000449414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a1c6dc8fab%3A0x6bf7312a25cad455!2sCambio%20Costero%20-%20Money%20exchange%20-%20Casa%20de%20Cambio!5e0!3m2!1ses-419!2scl!4v1662820229590!5m2!1ses-419!2scl" width="500" height="600" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
				}


			</div>
		</div>

	);
};
