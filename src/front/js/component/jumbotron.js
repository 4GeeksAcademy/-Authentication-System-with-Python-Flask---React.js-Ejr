import React from "react";

const Playa = () => {
	return (
		<>
			<h1 className="display-4">Playa</h1>
			<p className="lead">
				Costa Rica ocupa un lugar privilegiado en el corazón de Centroamérica por la riqueza de sus playas,
				comprende 1.228 km de litoral, de los cuales 1.016 km son de la costa del Pacífico y 212 km en el mar
				Caribe, estas separadas por apenas tres horas en vehículo o 45 minutos vía aérea desde San José.
			</p>
			<hr className="my-4" />
			<p>Se estima que 600 playas rodean todo el territorio nacional.</p>
		</>
	);
};

const Montana = () => {
	return (
		<>
			<h1 className="display-4">Montaña</h1>
			<p className="lead">
				Costa Rica es una tierra de volcanes, bosques húmedos y nubosos, enormes cataratas y ríos caudalosos.
				Esta naturaleza generosa hace difícil decidir entre la variada oferta de actividades, que incluye
				rafting, senderismo, canyoning, tirolesa, puntes colgantes, entre muchos más.
			</p>
			<hr className="my-4" />
			<p>Hermosos paisajes, atrevidas rutas y mucha diversión es lo puedes esperar.</p>
		</>
	);
};

export const Jumbotron = () => <div className="jumbotron text-left shadow">{true ? <Playa /> : <Montana />}</div>;
