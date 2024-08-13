import React, { useContext, useState, useEffect } from "react";
import { Context } from '../store/appContext'
import ReactStars from 'react-rating-stars-component';



const Profesionales = () => {
    const { store, actions } = useContext(Context)


    useEffect(() => {

        // Cargar el script de Calendly
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Limpiar el script al desmontar el componente
            document.body.removeChild(script);
        };
    }, []);

    const openCalendly = (profesional) => {
        console.log(profesional)
        switch (profesional) {
            case 'Dr. Juan Pérez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuysaludmental/dr-juan-perez');
                break;
            case 'Dr. Luis Rodríguez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuysaludmental/dr-luis-rodriguez');
                break;
            case 'Dra. María García':
                Calendly.showPopupWidget('https://calendly.com/hablemosuysaludmental/dra-maria-garcia');
                break;
            case 'Dra. Ana Martínez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuysaludmental/dra-ana-martinez');
                break;
            case 'Dr. Carlos Gómez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuysaludmental/dr-carlos-gomez');
                break;
            default:
                break;
        }
    };

    
    return (<div className="mt-5">
        {
            store.psicologos.map((elm, index) => {
                return (
                    // console.log(elm)
                    <div className='d-flex justify-content-center' key={index}>

                        <div className="card mb-3 text-start col-10 col-md-8 bg-ligth" style={{ minHeight: '300px' }}>
                            <div className="row g-0 h-100">
                                <div className="col-md-4">
                                    <img src={elm.foto} className="img-fluid rounded-start" alt="..." style={{
                                        minHeight: '300px',
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title my-3">{elm.nombre_usuario} {elm.apellido}</h5>
                                        {/* {elm.especialidades.map((esp, inx) => {
                                            return <h6 className="card-text" key={inx}>{esp}</h6>
                                        })} */}
                                        <p className="card-text"><small className="text-body-secondary">{elm.descripcion}</small></p>
                                        <div className="d-flex justify-content-between align-items-center col-12">
                                            <div className=" col-4">
                                                {/* <ReactStars
                                                count={5}
                                                value={elm.calificacion}
                                                size={40}  // Tamaño de las estrellas
                                                isHalf={true}  // Permite calificación en medio punto
                                                activeColor="#ffd700"  // Color de las estrellas activas
                                                edit={false}  // Desactiva la edición
                                            /> */}
                                            </div>
                                            <div className="col-8 d-flex justify-content-end">
                                                <button type="button" onClick={() => openCalendly(`${elm.nombre_usuario} ${elm.apellido}`)} className="btn btn-outline-success me-5 h-75">Reservar agenda</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
    )
}

export default Profesionales