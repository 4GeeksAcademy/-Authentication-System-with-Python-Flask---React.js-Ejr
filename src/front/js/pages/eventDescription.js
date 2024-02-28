import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { EventDescriptionCard } from "../component/eventDescriptionCard";


export const EventDescription = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.obtenerOneEvento(params.theid)


	}, [])
	console.log(store.eventInfo);





	return (
		<div>

			<EventDescriptionCard evento={store.eventInfo?.result?.evento} descripcion={store.eventInfo?.result?.descripcion} asistentes={store.eventInfo?.asistentes} maximo={store.eventInfo?.result?.max_personas} fecha={store.eventInfo?.result?.fecha}/>


		</div>
	);
};

EventDescription.propTypes = {

};
