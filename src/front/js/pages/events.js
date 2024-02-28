import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import {Card} from "../component/card.js";
import { useNavigate } from 'react-router-dom';

export const Events = () => {
    const params = useParams();
	const navigate = useNavigate();
	const {store, actions} = useContext(Context)
    const [titulo, setTitulo] = useState("")
	useEffect(() => {
		async function ini(){
			
			if(params.category=="ALL"){
				setTitulo("TODOS LOS EVENTOS")
				await actions.obtenerEventosCategoria(params.category)
			}
			else{
				setTitulo(`EVENTOS DE ${params.category}`)
				await actions.obtenerEventosCategoria(params.category)
			}
		}
        ini()
    }, [navigate])

	function handleClickAll() {
		navigate('/events/ALL');
	  }
	function handleClickDeporte() {
	navigate('/events/DEPORTE');
	}
	function handleClickArte() {
	navigate('/events/ARTE');
	}
	function handleClickOcio() {
	navigate('/events/OCIO');
	}

        
	return (
		<div className="container">

			<div className="4-botones py-5 d-flex justify-content-center row m-1">
				<button type="button" onClick={handleClickAll} className="btn btn-lg m-1 bg-400 text-white col-sm-8 col-md-12 col-lg-2">EVENTS</button>
				<button type="button" onClick={handleClickDeporte} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Sports</button>
				<button type="button" onClick={handleClickArte} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Art</button>
				<button type="button" onClick={handleClickOcio} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Leisure</button>
			</div>

			<h1>{titulo}</h1>
            <div className="row m-1">
				<ul className="list-group d-flex flex-row  mb-5" id="contact-list">
					{store.events.map((item) => (
						<li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2" key={item.id}>
							<Card evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha}/>
						</li>
				))}
				</ul>
			</div>

		</div>
	);
};
