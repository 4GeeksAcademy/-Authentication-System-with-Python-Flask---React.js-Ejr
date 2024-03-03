import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { EventDescriptionCard } from "../component/eventDescriptionCard";

export const EventDescription = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		async function getEvents() {
			await actions.obtenerInfoUsuario()
			await actions.obtenerOneEvento(params.theid)
		}
		getEvents()
	}, [])

	return (
		<div>
			<EventDescriptionCard id_evento={params.theid} evento={store.eventInfo?.result?.evento} descripcion={store.eventInfo?.result?.descripcion} asistentes={store.eventInfo?.asistentes} maximo={store.eventInfo?.result?.max_personas} fecha={store.eventInfo?.result?.fecha} />
		</div>
	);
};

EventDescription.propTypes = {

};
