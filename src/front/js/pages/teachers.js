import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { TeachersCard } from "../component/TeachersCard.js";


import imagenClases from "../../img/fotonavacerrada.jpeg"
import imagenThePractices from "../../img/thepracticesSINFONDO.png"


export const Teachers = () => {
	const [state, setState] = useState({
   		
	});


	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.getAllSessions();
	}, []);

	console.log(store.jivamuktiYoga)


	return (
   

		<div className="container-fluid">
            <div className="justify-content-center">   
                <h1>The Teachers</h1>
            </div> 
            
		

			<div className="container-fluid d-flex flex-row">
				<ul className="d-flex flex-nowrap flex-row overflow-scroll gap-3 px-0 mx-2">
					{store.teachers.map(item => (
						<li className="col-4 px-0 w-auto my-2" key={item.id}>
							<TeachersCard 
								id={item.id}
								name={item.name}
								instructor={item.instructor}
								asana_focus={item.asana_focus}
								level={item.level}
								url_imagen={item.url_imagen}
						    />
						</li>
						))}
				</ul>
			</div>
			
			

			
		</div>

		
		
	);
 };
