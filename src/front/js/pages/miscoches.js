import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const MisCoches = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
		actions.myVehiclesInRent();
	}, []);

    return (
        <>
            <div className="footer-view vehicles mb-5 mt-2 justify-content-center bg-light">
				<div className="container">
                    <h1 className="h1 pt-2"><strong>Mis Coches en renta</strong></h1>
					<div className="row Map Cards text-dark d-flex justify-content-center">
                        {store.myVehicles.length === 0 
                            ? (
                                <>
                                    <div className="fs-4 mt-4 mb-3"><strong>Añade tu primer coche a Friendly Wheels</strong></div>
                                    <div className="texto-favoritos">Pulsa en el botón añadir que se muestra a continuación para añadir tu primer coche</div>
                                    <Link to={`/agregarvehiculo`}>
                                        <div className="mt-3">
                                            <button className="rounded">Añadir mi primer Coche</button>
                                        </div>
                                    </Link>
                                </>
                            )
                            : (store.myVehicles.map((vehicle) => (
                                    <div key={vehicle.id}>
                                        <div className="card col-md-4 mb-2 me-4 mt-4" style={{ width: "22rem"}}>
                                            <div>
                                                <a className="cardvehicles" href="#">
                                                    <img src="https://somoselectricos.com/wp-content/uploads/modelos/Audi-e_tron.png" />
                                                </a>
                                            </div>
                                            <div className="card-body pb-0">
                                                <h5 className="card-title"><strong>{vehicle.marca_modelo.toUpperCase()}</strong></h5>
                                                <p className="card-text"><strong>Matrícula:</strong> {vehicle.matricula.toUpperCase()}</p>
                                            </div>
                                            <div className="d-flex justify-content-end mb-2">
                                                <button onClick={() => actions.removeVehicle(vehicle.id)} className="btn-dark rounded">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
            </div>
                    
        </>
    );
};