import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Prueba= () => {
	const { store, actions } = useContext(Context);

	return (
		
		<div className="">
		<h1 style={{ "display": "flex", "color": "rgb(188 191 40)", "padding": "20px" }}>Characters</h1>
			{store.comidas.map((e, i) => {
				
				return <div className="row" >
					
						
						
						
                <div className="row cajas" key={i}>
                    <div className="col-md-4">
                        <figure  >
                            <img src="https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg" ></img>
                            <div className="capa">
                                <h3> {e.name}</h3>
                                <p>Ingredientes</p>
                                <p>{e.ingredientes} <br /> <p>10<strong>.500$</strong></p>
                                </p>

                                <Link to="/">

                                    <button type="button" class="btn btn-outline-dark boton">Comprar</button>
                                </Link>
                                <button type="button" class="btn btn-outline-dark m-2 corazon"> <i class="far fa-heart"></i></button>
                            </div>
                        </figure>
                    </div>
						
							

					</div>
				</div>
			})}	
		</div>

	)
};
