import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
		actions.favorites();
	}, []);

    return (
        <>
            <div className="footer-view vehicles mb-5 mt-2 justify-content-center bg-light">
				<div className="container">
                    <h1 className="h1 pt-2"><strong>Favoritos</strong></h1>
					<div className="row Map Cards text-dark d-flex justify-content-center">
                        {store.favorites.length === 0 
                            ? (
                                <>
                                    <div className="fs-4 mt-4 mb-3"><strong>Crea tu primera lista de favoritos</strong></div>
                                    <div className="texto-favoritos">Pulsa en el icono del corazón para guardar los coches y las experiencias <br></br> que más te gusten en Favoritos mientras buscas.</div>
                                </>
                            )
                            : (store.favorites.map((vehicle) => (
                                    <div key={vehicle.id}>
                                        <div className="card col-md-4 mb-2 me-5 mt-4" style={{ width: "22rem", height: "27rem" }}>
                                            
                                            <Link to={`/details/${vehicle.id}`} className="text-decoration-none text-black">
                                                <div className="cardvehicles" href="#">
                                                    <img src={vehicle.url_img1} style={{width: "100%", objectFit: "cover", height: "12rem"}}/>
                                                </div>
                                                <div className="card-body p-1">
                                                    <div>
                                                        <h5 className="card-title mt-2 mb-4"><strong></strong> {vehicle.marca_modelo.toUpperCase()}</h5>
                                                        <p className="card-text mb-1"><strong>Tipo de motor:</strong> {vehicle.motor}</p>
                                                        <p className="card-text mb-1"><strong>Tipo de cambio:</strong> {vehicle.tipo_cambio}</p>
                                                        <p className="card-text mb-1"><strong>Asientos:</strong> {vehicle.asientos}</p>
                                                        <p className="card-text mb-1"><strong>Precio:</strong> {vehicle.precio} €</p>
                                                    </div>
                                                    </div>
                                            </Link>
                                            <div className="d-flex justify-content-end">
                                                <button onClick={() => actions.removeFav(vehicle.id)} className="btn-dark rounded">
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