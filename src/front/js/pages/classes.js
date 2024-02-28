import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import { JivamuktiCard } from "../component/JivamuktiCard.js";
import { VinyasaCard } from "../component/VinyasaCard.js";
import { HathaCard } from "../component/HathaCard.js";
import { AshtangaCard } from "../component/AshtangaCard.js";
import { RocketCard } from "../component/RocketCard.js";
import { MeditationCard } from "../component/MeditationCard.js";
import { HarmoniumCard } from "../component/HarmoniumCard.js";
import imagenClases from "../../img/fotonavacerrada.jpeg"
import imagenThePractices from "../../img/thepracticescentro.png"


export const Sessions = () => {
	const [state, setState] = useState({
   		
	});


	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.getAllJivamukti();
		// actions.getAllPlanets();
		// actions.getAllSpecies();
		// actions.getFavorites();
	}, []);

	console.log(store.jivamuktiYoga)


	return (
		<div className="container-fluid p-0 overflow-auto col-lg-12 col-md-12 col-sm-12">
            <div>   
                <img id="imagenClases" src={imagenClases} className="card-img-top mx-auto" alt="Imagen Clases" style={{width: "100%"}}/>
            </div> 
            <div className="card-img-overlay d-block justify-content-start align-items-center">
                <div className="mt-5 pt-5 ms-4 text-start col-lg-12 col-md-6 col-sm-6">
					
					<div className="mt-5 pt-5">
						<h1 className="text-light text-start">
						Practice and all is coming...
						</h1>
                        <span className="text-light fs-5 text-start mt-3">
						Find any class and practice as you were in a yoga studio.
						</span>
					<div className="d-block align-items-center justify-content-start mt-5">
						<button type="button" className="btn btn-outline-light btn-lg">
							{/* <Link className={`btn ${styleStartNow}`}> */}
                            	Try now for free
                       	 	{/* </Link> */}
						</button>
					</div>	
				
				</div>
            </div>
            </div>
		{/* Desde the practices hasta abajo */}

			<div className="d-flex justify-content-center">
				<img src={imagenThePractices} className="card-img-top mt-4" style={{width: "20%"}}/>
			</div>
		
			<div className="container-fluid mt-3">
				<div className="ms-3 d-flex align-items-center">
					<i className="fa-solid fa-star fa-xl" style={{color: "#74C0FC"}}></i>
					<span className="ms-2">Jivamukti Yoga</span>
				</div>
				<div className="container-fluid d-flex flex-row">
						<ul className="d-flex flex-nowrap flex-row overflow-scroll gap-3 px-0 mx-2">
							{store.jivamuktiYoga.map(item => (
							<li className="col-4 px-0 w-auto my-2" key={item.id}>
							<JivamuktiCard 
								id={item.id}
								name={item.name}
								instructor={item.instructor}
								asana_focus={item.asana_focus}
								url_imagen={item.url_imagen}
						/>
						</li>
						))}
					</ul>
				</div> 
			</div>

			


		

			{/* <div className="container-fluid mt-5">
				<h1 className="text-danger mx-3">Characters</h1>
					<div className="container-fluid d-flex flex-row">
						<ul className="d-flex flex-nowrap flex-row overflow-scroll gap-3 px-0 mx-2">
							{store.characters.map(item => (
							<li className="col-4 px-0 w-auto my-2" key={item.uid}>
							<CharactersCard 
								id={item.uid}
								name={item.name}
						/>
						</li>
						))}
					</ul>
				</div>
			</div>
			<div className="container-fluid mt-5">
				<h1 className="text-danger mx-3">Planets</h1>
					<div className="container-fluid d-flex flex-row">
						<ul className="d-flex flex-nowrap flex-row overflow-scroll gap-3 px-0 mx-2">
							{store.planets.map(item => (
							<li className="col-4 px-0 w-auto my-2" key={item.uid}>
								<PlanetsCard 
								id={item.uid}
								name={item.name}
								
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="container-fluid mt-5">
				<h1 className="text-danger mx-3">Species</h1>
					<div className="container-fluid d-flex flex-row">
						<ul className="d-flex flex-nowrap flex-row overflow-scroll gap-3 px-0 mx-2">
							{store.species.map(item => (
							<li className="col-4 px-0 w-auto my-2" key={item.uid}>	
								<SpeciesCard 
								id={item.uid}
								name={item.name}
								/>
							</li>
						))}
					</ul>
				</div>
			</div> */}
		</div>
	);
 };
