import React, { Component } from "react";
import { Media, Jumbotron, Container } from "react-bootstrap";
import titulo from "../../img/titulo.png";
import jumbo from "../../img/jumbo.png";
import uno from "../../img/uno.png";
import dos from "../../img/dos.png";
import tres from "../../img/tres.png";
import cuatro from "../../img/cuatro.png";
import about from "../../img/about.png";

export const ComponenteInf = () => {
	return (
		<div style={{ marginTop: 100 }}>
			<img src={titulo} height="300px" className="mt-5" />
			<br />
			<br />
			<br />
			<Jumbotron fluid id="jumbo">
				<Container>
					<img src={jumbo} height="300px" width="1080px" />
					<p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
				</Container>
			</Jumbotron>
			<br />
			<Media id="caja">
				<img src={uno} height="300px" width="300px" className="mr-3 rounded-circle" alt="Generic placeholder" />
				<Media.Body>
					<h2>
						<span>TIQUICIA</span>
					</h2>
					<p>
						Costa Rica, un pequeño paraíso ubicado en Centroamérica, conocido también como La Suiza
						Centroamericana. Costar Rica cuenta con una extensión de 51100 km cuadrados, recorrido de Norte
						a Sur por 7 provincias (Guanacaste, Heredia, Alajuela, San José, Cartago, Puntarenas y Limón).
						Cuenta con una población aproximada de 5 000 000 de habitantes y es reconocido por contar con el
						5% de la biodiversidad mundial. Costa Rica es reconocido también por sus acuerdos de paz ya que
						es de los pocos países del mundo sin ejército. El Colón costarricense, llamado así en honor al
						Almirante Cristóbal Colón, es la moneda oficial de la República de Costa Rica en América
						Central. Su símbolo es una letra C atravesada por dos barras inclinadas verticales ₡. El clima
						de Costa Rica es casi ideal la mayor parte del año, oscilando de lo tropical en la costa a lo
						templado en las tierras altas. El promedio anual de temperaturas va de los 31.7° C (89° F) en la
						costa hasta los 16.7° C (62° F) tierra adentro. Las noches en San José son frescas y libres de
						humedad. Por tierra, limita hacia la zona norte con la república de Nicaragua y en la parte sur,
						limita con la República de Panamá. Actualmente, esta es una posición muy codiciada para el
						comercio y el turismo.
					</p>
				</Media.Body>
			</Media>
			<br />
			<Media id="caja">
				<Media.Body>
					<h2>
						<span>GASTRONOMÍA</span>
					</h2>
					<p>
						Costa Rica goza de diversas condiciones climáticas, suelo fértil e idóneo para el cultivo de un
						gran número de diferentes frutas y verduras, cuenta con dos costas, el Pacífico y el Caribe, lo
						que facilita la práctica de la pesca, así como espacio para la cría de ganado. Todos estos
						factores son la base para que el país disponga de una gastronomía sana, variada y sostenible.
						Los elementos básicos que componen los platillos costarricenses son el arroz y los frijoles
						negros, que se comen hasta tres veces al día. Por la mañana, el arroz y los frijoles se mezclan
						para convertirse en lo que se conoce como “Gallo Pinto” y se sirven con huevos, queso y pan.
						Para el almuerzo y la cena, el Casado, es un plato típico que consiste en arroz, frijoles, carne
						o pescado, Picadillo (verduras picadas), plátano y ensalada.
					</p>
				</Media.Body>
				<img src={dos} height="300px" width="300px" className="mr-3 rounded-circle" alt="Generic placeholder" />
			</Media>
			<br />
			<Media id="caja">
				<img
					src={tres}
					height="300px"
					width="300px"
					className="mr-3 rounded-circle"
					alt="Generic placeholder"
				/>
				<Media.Body>
					<h2>
						<span>AVENTURAS</span>
					</h2>
					<p>
						Hay tantas cosas que hacer en Costa Rica que es difícil elegir. Entre sus selvas exuberantes,
						sus volcanes impresionantes y sus playas paradisiacas tampoco importa mucho lo que hagas,
						tendrás unas vacaciones inolvidables. Con niños, sin niños, con pareja, con amigos… sea cual sea
						tu plan, Costa Rica es un destino perfecto. El país está muy preparado para los viajeros y su
						espectacular entorno natural hace que las actividades sean increíbles. Entre las actividades
						para hacer encontramos desove de las tortugas, tour por los canales de Tortuguero, buceo, surf,
						rafting, senderismo, visita a Parques Nacionales, yoga, entre muchos otro,
					</p>
				</Media.Body>
			</Media>
			<br />
			<Media id="caja">
				<Media.Body>
					<h2>
						<span>CULTURA</span>
					</h2>
					<p>
						Costa Rica ofrece maravillas culturales con declaratorias reconocidas mundialmente, entre ellas
						se encuentran: El boyero y la carreta -Obra Maestra del Patrimonio Oral e Intangible de la
						Humanidad-, los Asentamientos cacicales de las esferas de piedra del sur de Costa Rica, el
						Monumento Arqueológico Nacional de Guayabo. Existen otras manifestaciones y tradiciones
						culturales galardonadas nacionalmente como el baile del swing criollo, el calipso limonense, la
						tradición de la fabricación cerámica chorotega, la Fiesta de los diablitos borucas, el arte, las
						artesanías, la música, la gastronomía, entre otras, las cuales se comparten con los visitantes.
					</p>
				</Media.Body>
				<img
					src={cuatro}
					height="300px"
					width="300px"
					className="mr-3 rounded-circle"
					alt="Generic placeholder"
				/>
			</Media>
			<br />
			<img src={about} height="600px" />
		</div>
	);
};
