import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext'
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2'



const Profesionales = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()


    useEffect(() => {
        actions.obtenerEspecialidadesPorProfesional();
        // Cargar el script de Calendly
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        const checkLoggedStatus = async () => {
            try {
                const logged = await actions.validToken(); // Esperar a que la promesa se resuelva

                if (!logged) {
                    Swal.fire({
                        title: 'Sesión expirada',
                        text: 'Debes logearte nuevamente',
                        icon: 'error',
                        timer: 4000
                    })
                    navigate('/vista-login');
                }
            } catch (error) {
                console.error('Error al validar token:', error);
                navigate('/vista-login'); // Redirigir en caso de error
            }
        };

        checkLoggedStatus();

        return () => {
            // Limpiar el script al desmontar el componente
            document.body.removeChild(script);
        };
    }, []);


    const openCalendly = (profesional) => {

        switch (profesional) {
            case 'Dr. Juan Pérez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuy1234/dr-juan-perez');
                break;
            case 'Dr. Luis Rodríguez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuy1234/dr-luis-rodriguez');
                break;
            case 'Dra. María García':
                Calendly.showPopupWidget('https://calendly.com/hablemosuy1234/dra-maria-garcia');
                break;
            case 'Dra. Ana Martínez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuy1234/dra-ana-martinez');
                break;
            case 'Dr. Carlos Gómez':
                Calendly.showPopupWidget('https://calendly.com/hablemosuy1234/dr-carlos-gomez');
                break;
            default:
                break;
        }
    };

    return (
        <div className="mt-5">
            {store.psicologos.map((elm, index) => (
                <div className='d-flex justify-content-center' key={index}>
                    <div className="card profesional mb-3 text-start col-10 col-md-8">
                        <div className="row g-0 h-100">
                            <div className="col-12 col-md-4">
                                <img
                                    src={elm.foto}
                                    className="img-fluid rounded-start"
                                    alt={elm.nombre}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                />
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="card-body position-relative">
                                    <h5 className="card-title my-3 text-inicio">{elm.nombre_usuario} {elm.apellido}</h5>
                                    <p className="card-text">
                                        <small className="text-body-secondary">{elm.descripcion}</small>
                                    </p>
                                </div>
                                <div >
                                    <p className="card-text">
                                        <ul className="d-flex flex-row gap-3">
                                            {Array.isArray(elm.especialidades) && elm.especialidades.length > 0 ? (
                                                elm.especialidades.map((especialidad) => (
                                                    <li id="nombreEspecialidad1"key={especialidad.id}>
                                                        {especialidad.nombre}
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No hay especialidades disponibles.</li>
                                            )}
                                        </ul>
                                    </p>
                                    <div className="button-container mt-5">
                                        <button
                                            type="button"
                                            onClick={() => openCalendly(`${elm.nombre_usuario} ${elm.apellido}`)}
                                            className="btn custom-btn"
                                        >
                                            Reservar agenda
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Profesionales