import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const MisCoches = () => {
    const { store, actions } = useContext(Context);

    async function eliminarVehiculo(vehicle_id) {
        let respuesta = await actions.removeVehicle(vehicle_id)
        if (respuesta === "success") {
            swal("Vehículo eliminado correctamente", "", "success")
        }
    }

    useEffect(() => {
		actions.myVehiclesInRent();
	}, []);

    return (
        <>
            <div className="footer-view vehicles mb-5 mt-2 justify-content-center bg-light">
				<div className="container">
                    <h5 className="h5 mt-3 text-dark-50 text-decoration-underline"><strong>Mis vehículos en alquiler</strong></h5>
					<div className="row Map Cards text-dark d-flex justify-content-center">
                        {store.myVehicles.length === 0 
                            ? (
                                <>
                                    <div className="fs-4 mt-4 mb-3"><strong>Añade tu primer coche a Friendly Wheels</strong></div>
                                    <div className="texto-favoritos">Pulsa en el botón añadir que se muestra a continuación para añadir tu primer coche</div>
                                    <Link to={`/agregarvehiculo`}>
                                        <div className="mt-3">
                                            <button className="rounded">Añadir mi primer coche</button>
                                        </div>
                                    </Link>
                                </>
                            )
                            : (store.myVehicles.map((vehicle) => (
                                <div key={vehicle.id} className="card col-md-4 mb-2 me-5 mt-4 ms-2" style={{ width: "22rem"}}>
                                    <div>
                                        <a className="cardvehicles" href="#">
                                            <img src={vehicle.url_img1} style={{width: "100%", objectFit: "cover", height: "12rem", marginTop: "15px"}} />
                                        </a>
                                    </div>
                                    <div className="card-body pb-0">
                                        <h5 className="card-title mb-3"><strong>{vehicle.marca_modelo.toUpperCase()}</strong></h5>
                                        <p className="card-text"><strong>Matrícula:</strong> {vehicle.matricula.toUpperCase()}</p>
                                    </div>
                                    <div className="d-flex justify-content-end mb-3 me-3">
                                        <button onClick={() => eliminarVehiculo(vehicle.id)} className="btn-success rounded">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            )))
                        }
                    </div>
                </div>
            </div>
                    
        </>
    );
};