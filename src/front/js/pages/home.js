import React, { useContext, useEffect } from "react";
import { LoginModal } from "../component/LoginModal.js"
import "../../styles/home.css";

import {Card} from "../component/card.js";
import {Navbar} from "../component/navbar.js";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";
import Jumbotron from "../component/jumbotron.js";
import {Footer} from "../component/footer.js";
import { Context } from "../store/appContext.js";

export const Home = () => {

	const {store, actions} = useContext(Context)

	useEffect(() => { // // cada vez que quiera ejecutar una funcion ni bien se cargue el componente debo hacer un useEffect, React dice esto va asi! siempre antes del return
       actions.obtenerEventos()

    }, [])

	return (
		<div className="container">
			<Jumbotron />
			<div className="4-botones py-5 d-flex justify-content-center row m-1">
				<button type="button" className="btn btn-lg m-1 bg-400 text-white col-sm-8 col-md-12 col-lg-2">EVENTS</button>
				<button type="button" className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Sports</button>
				<button type="button" className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Music</button>
				<button type="button" className="btn btn-lg m-1 bg-400 text-white col-sm-8 col-md-12 col-lg-2">and a lot of fun</button>
			</div>

			<div className="Don't forget to see the events row py-5">
				<p className="fs-2 col-sm-12 col-md-6 col-lg-5"><strong>Don't forget to see the events!</strong></p>

				{/* <div className="col-sm-12 col-md-6 col-lg-2">
					<label className="visually-hidden" for="inlineFormSelectPref">Preference</label>
					<select className="form-select" id="inlineFormSelectPref">
						<option selected>Choose...</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>

				<p className="d-flex justify-content-end col-sm-12 col-md-6 col-lg-3"><strong>or took all the events today!</strong></p> */}

			</div>
			<div className="row m-1">
				<ul className="list-group d-flex flex-row overflow-auto mb-5" id="contact-list">
					{store.events.map((item) => (
						<li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2" key={item.id}>
							<Card evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha}/>
						</li>
				))}
				</ul>
			</div>
			{/* <div className="row m-1">
				<div className="col-sm-12 col-md-6 col-lg-4">
					<Card />
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card />
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card />
				</div>
			</div> */}
			<p className="fs-2 col-sm-12 col-md-6 col-lg-12 d-flex justify-content-center py-5"><strong>If you don't have the time to travel, we bring the plans for you!</strong></p>

		</div>
	);
};
