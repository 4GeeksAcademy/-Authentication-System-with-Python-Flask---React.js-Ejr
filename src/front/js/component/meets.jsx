import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Loader from "./loader.jsx";

const Meets = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.dataUser) {
            console.log(store.dataUser)
            if (!store.dataUser.is_psicologo) {
                actions.getMeetsUser(store.dataUser.correo)
            } else {
                let namePsicologo = `${store.dataUser.nombre_usuario} ${store.dataUser.apellido}`
                console.log(namePsicologo)
                actions.getMeetsPsicologo(namePsicologo)
            }
        }
    }, [store.dataUser])

    if (!store.dataUser) {
        return (<div>
            <div className="card mb-4 mb-4w-100 d-flex justify-content-center align-items-center row"><div className="my-1 mt-2 d-flex justify-content-center align-items-center"><Loader width="150px" height="15px" /></div><div className="my-1 d-flex justify-content-center align-items-center"><Loader width="500px" height="15px" /></div><div className="my-1 mb-2 d-flex justify-content-center align-items-center"><Loader width="200px" height="15px" /></div></div>
            <div className="card mb-4 mb-4w-100 d-flex justify-content-center align-items-center row"><div className="my-1 mt-2 d-flex justify-content-center align-items-center"><Loader width="150px" height="15px" /></div><div className="my-1 d-flex justify-content-center align-items-center"><Loader width="500px" height="15px" /></div><div className="my-1 mb-2 d-flex justify-content-center align-items-center"><Loader width="200px" height="15px" /></div></div>
            <div className="card mb-4 mb-4w-100 d-flex justify-content-center align-items-center row"><div className="my-1 mt-2 d-flex justify-content-center align-items-center"><Loader width="150px" height="15px" /></div><div className="my-1 d-flex justify-content-center align-items-center"><Loader width="500px" height="15px" /></div><div className="my-1 mb-2 d-flex justify-content-center align-items-center"><Loader width="200px" height="15px" /></div></div>
        </div>);
    }

    // Ordena los eventos: primero los pendientes, luego los completados
    const sortedMeets = store.meets?.sort((a, b) => {
        const startTimeA = new Date(a.start_time);
        const startTimeB = new Date(b.start_time);
        return startTimeA > startTimeB ? -1 : 1;
    });

    return (
        <div>
            {sortedMeets && sortedMeets.map((event, index) => {
                const startTime = new Date(event.start_time);
                const currentTime = new Date();
                const isPending = startTime > currentTime;

                return (
                    <div key={index} className="card mb-4" style={{ width: '100%' }}>
                        <div className="row g-0">
                            {/* Columna 1: Nombre y Etiqueta */}
                            <div className={`col-md-${isPending ? '7' : '12'} col-12 d-flex align-items-center`}>
                                <div className="card-body p-0 m-2 d-flex flex-column align-items-center justify-content-center">
                                    <h5 className="card-title mb-1 text-center">{event.name}</h5>
                                    <span
                                        className={`badge ${isPending ? 'bg-success' : 'bg-secondary'} text-uppercase`}
                                    >
                                        {isPending ? 'Pendiente' : 'Completada'}
                                    </span>
                                    <p className="card-text mb-1 text-center">
                                        Duración: {(new Date(event.end_time) - new Date(event.start_time)) / (1000 * 60)} minutos
                                    </p>
                                    <p className="card-text text-center">
                                        Inicio: {startTime.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Columna 2: Duración y Inicio */}

                            {/* Columna 3: Botón */}
                            {isPending &&
                                <div className="col-md-5 col-12 my-3 my-lg-auto d-flex align-items-center justify-content-center">
                                    <a href={event.location.join_url} target="_blanck" className="btn btn-primary mx-2">
                                        <i className="fa-solid fa-video me-2"></i> Unirse a la reunión
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Meets;
