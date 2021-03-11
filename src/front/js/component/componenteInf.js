import React, { Component } from "react";
import { Media } from "react-bootstrap";
export const ComponenteInf = () => {
	return (
		<ul className="list-unstyled">
			<Media as="li">
				<img
					width={64}
					height={64}
					className="mr-3 rounded-circle"
					src="https://st4.depositphotos.com/2610779/22764/v/600/depositphotos_227641426-stock-illustration-costa-rica-flag-bright-icon.jpg "
					alt="Generic placeholder"
				/>
				<Media.Body>
					<h5>Informacion General</h5>
					<p>
						El Colón costarricense, llamado así en honor al Almirante Cristóbal Colón, es la moneda oficial
						de la República de Costa Rica en América Central. Su símbolo es una letra C atravesada por dos
						barras inclinadas verticales ₡. El clima de Costa Rica es casi ideal la mayor parte del año,
						oscilando de lo tropical en la costa a lo templado en las tierras altas. El promedio anual de
						temperaturas va de los 31.7° C (89° F) en la costa hasta los 16.7° C (62° F) tierra adentro. Las
						noches en San José son frescas y libres de humedad. Por tierra, limita hacia la zona norte con
						la república de Nicaragua y en la parte sur, limita con la república de Panamá. Actualmente,
						esta es una posición muy codiciada para el comercio y el turismo.
					</p>
				</Media.Body>
			</Media>

			<Media>
				<Media.Body>
					<h5>Comidas Tipicas</h5>
					<p>
						Gallo pinto. Conocido como el plato nacional de Costa Rica, el gallo pinto es esencialmente
						frijoles cocidos y arroz, mezclados juntos. ... Casado. El Casado, es uno de los principales
						platos tradicionales de Costa Rica, no es un plato singular, sino un plato compuesto por varios
						alimentos. ... Olla de Carne. Tamales, Casado.
					</p>
				</Media.Body>
				<img
					width={64}
					height={64}
					className="ml-3 rounded-circle"
					src="https://149478393.v2.pressablecdn.com/wp-content/uploads/2016/08/75e53b8036759421d27f2c1dad2a06b9.jpg"
					alt="Generic placeholder"
				/>
			</Media>

			<Media as="li">
				<img
					width={64}
					height={64}
					className="mr-3 rounded-circle"
					src="https://conozcasucanton.com/wp-content/uploads/sites/11/2016/01/Isla-Tortuga-Puntarenas1.jpg"
					alt="Generic placeholder"
				/>
				<Media.Body>
					<h5>Actividades al Aire libre</h5>
					<p>
						Tours de Canopy, Surf y Rafting en aguas claras,Pesca Deportiva,Volcanes,Unas vacaciones en
						Costa Rica no están completas hasta que usted visite uno de sus muchos bosques tropicales.
					</p>
				</Media.Body>
			</Media>

			<Media>
				<Media.Body>
					<h5>Actividades Culturales</h5>
					<p>
						Una de las formas más seguras de experimentar la cultura de Costa Rica es sin duda aprender el
						idioma, tambien puedes visitar nuestros museos por ejemplo el museo de los niños, el museo del
						Delito. Algunos de los museos más populares son el Museo de Arte Nacional, el Museo del Oro y el
						Museo de Jade.
					</p>
				</Media.Body>
				<img
					width={64}
					height={64}
					className="ml-3 rounded-circle"
					src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Fachada_del_Museo_Nacional_de_Costa_Rica.JPG"
					alt="Generic placeholder"
				/>
			</Media>
		</ul>
	);
};
