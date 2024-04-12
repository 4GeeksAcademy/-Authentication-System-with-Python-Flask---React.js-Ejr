import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import portada from "../../img/pngwing.com.png"
import imgMundi from "../../img/cropped-footer-foto1.png"
import imgLugares2 from "../../img/pngwing.com (2).png"
 
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 ">
			<h1 className="titulo">Adivina la Nacionalidad</h1>
			<p>
				<img src={portada} className="w-100" />
			</p>
			<div className="row m-5 align-items-center">
				<div className="col-6 p-5">
					<h1 className="cambria negrita">¿Que es Spot-IT?</h1>
					<p className="cambria negrita texto">"Spot-IT" es un juego de trivia geográfica en el que los jugadores deben adivinar la ubicación de lugares icónicos del mundo. El juego presenta a los jugadores una serie de imágenes de lugares famosos, como monumentos, edificios históricos, paisajes naturales y sitios turísticos de renombre mundial.</p>
				</div>
				<div className="col-6">
					<img src={imgMundi} className="w-100" />
				</div>
			</div>
			<div className="row m-5 align-items-center">
				<div className="col-6 p-5">
					<img src={imgLugares2} className="w-100" />
				</div>
				<div className="col-6">
					<h1 className="cambria negrita">¿Como Jugar?</h1>
					<p className="cambria negrita texto">El juego comienza con la presentación de una imagen de un lugar icónico del mundo. Esta imagen puede ser de un monumento famoso, una ciudad reconocible, una maravilla natural, etc.<br/>
					Junto con la imagen, se proporcionan varias opciones de respuesta, que consisten en diferentes países o regiones del mundo. Los jugadores deben seleccionar la opción que creen que corresponde a la ubicación del lugar mostrado en la imagen.<br/>
					Una vez que los jugadores hayan revisado la imagen y las opciones de respuesta, deben seleccionar la respuesta que consideren correcta. Pueden elegir entre las diferentes opciones proporcionadas.<br/>
					Después de que los jugadores hayan seleccionado su respuesta, el juego verifica si la respuesta es correcta o incorrecta. Si la respuesta es correcta, los jugadores obtienen puntos y pasan a la siguiente imagen. Si la respuesta es incorrecta, se muestra la ubicación correcta y se pasa a la siguiente imagen.<br/>
					El juego continúa presentando nuevas imágenes y opciones de respuesta hasta que los jugadores decidan terminar la partida. En ese momento, se muestra la puntuación final de los jugadores y pueden compararla con la de otros jugadores para ver quién ha obtenido la puntuación más alta.<br/>
					</p>
				</div>
			</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
