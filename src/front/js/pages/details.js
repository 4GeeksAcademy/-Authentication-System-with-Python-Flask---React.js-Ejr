import React, {useEffect, useContext} from "react";
import {useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js";

export const Details = () => {
    const {store, actions} = useContext(Context);
	const  params  = useParams();
		
	useEffect (() => {
		actions.getDetails(params.id)
	}, []);

    return (
		<div className="principal bg-dark">
			<div className="d-flex ms-3 me-1">
				<div className="mt-3">
					<img className="imageDetails border-end border-danger border-2 rounded-start"
						src={noImageUrl !== "" ? noImageUrl : `https://starwars-visualguide.com/assets/img/${category}/${params.uid}.jpg`}
						alt="image"
					/>
				</div>
				<div className="w-75 mt-3 bg-secondary bg-opacity-25 me-2 text-white rounded-end">
					<h1 className="ms-3">{store.details.name?.toUpperCase()}</h1>
					<p className="ms-3">{store.details.description}</p>
				</div>
			</div>
			<div className="d-flex d-flex text-danger text-primary text-opacity-50 pb-2">
				<div className="mt-4 border-end border-secondary border-2 ps-4 pe-5">
					<h6 className="text-white">
					    MATRICULA
					</h6>
					<p> 
						params.category == "people" ? store.details.matricula:
					</p>
				</div>
                <div className="mt-4 border-end border-secondary border-2 ps-4 pe-5">
					<h6 className="text-white">
					    Tipo de motor
					</h6>
					<p> 
						params.category == "people" ? store.details.matricula:
					</p>
				</div>
                <div className="mt-4 border-end border-secondary border-2 ps-4 pe-5">
					<h6 className="text-white">
					    Tipo de cambio
					</h6>
					<p> 
						params.category == "people" ? store.details.matricula:
					</p>
				</div>
                <div className="mt-4 border-end border-secondary border-2 ps-4 pe-5">
					<h6 className="text-white">
					    N° de asientos
					</h6>
					<p> 
						params.category == "people" ? store.details.matricula:
					</p>
				</div>
                <div className="mt-4 ps-3 pe-5">
					<h6 className="text-white">
					    Precio por día
					</h6>
					<p> 
						params.category == "people" ? store.details.matricula:
					</p>
				</div>
			</div>
		</div>
    );
};