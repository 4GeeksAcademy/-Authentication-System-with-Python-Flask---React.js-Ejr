import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { EventDescriptionCard } from "../component/eventDescriptionCard";


export const EventDescription = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div>
            
            <EventDescriptionCard/>
			
			
		</div>
	);
};

EventDescription.propTypes = {
	
};
