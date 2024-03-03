import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignUpModal";
import { useNavigate } from 'react-router-dom';
export const EventDescriptionCard = (props) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);;
    const [modalState, setModalState] = useState({
        showModal: false,
        showModalUpdate: false,
    });
    function updateModalState() {
        setModalState({ showModal: true });
    }
    useEffect(() => {
        const fetchUser = async () => {
            if(store.auth){
                await actions.obtenerInfoUsuario()
            }                    
        }
        fetchUser()
    }, []);

    const fechaString = props.fecha;
    const fechaObjeto = new Date(fechaString);
    const fechaFormateada = fechaObjeto.toLocaleDateString();

    const handleInscription = async () => {
        if(store.user.id_eventos?.includes(parseInt(props.id_evento))){
            await actions.dejarDeAsistirEvento(props.id_evento);
        }
        else{
            await actions.inscripcionEvento(props.id_evento)
            
        }
        
    }

    const handleDelete = async () => {
        await actions.eliminarEvento(props.id_evento);
        navigate('/');
    }

    const updateEvent = async () =>{
        await actions.obtenerOneEvento(props.id_evento);
        navigate(`/event/${props.id_evento}`);
    }


    return (
        <div className="d-flex  flex-column" style={{ maxWidth: "840px" }}>
            <div className="card  ms-5 " style={{ maxWidth: "840px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={props.img} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.evento}</h5>
                            <p className="card-text">{props.fecha}</p>
                            <p className="card-text"><small className="text-body-secondary">{fechaFormateada}</small></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center mb-3 gap-1" >
                <div className="p-2 flex-grow-1  ms-5" >{store.auth ? <button onClick={handleInscription} type="button" className={store.user.id_eventos?.includes(parseInt(props.id_evento))  ? 'btn btn-danger btn-lg' : 'btn btn-primary btn-lg'}>
                    {store.user.id_eventos?.includes(parseInt(props.id_evento)) ? "UNJOIN EVENT" : "JOIN EVENT"} </button> : <button className="btn btn-primary " onClick={updateModalState}  >loggin</button>}
                </div>
                <div className="p-2">
                    <button type="button" className="btn btn-primary ">
                        <span className="badge text-bg-secondary">{props.asistentes}</span>
                    </button>
                </div>
                <div className="p-2">
                    <p>of</p>
                </div>
                <div className="p-2">
                    <button type="button" className="btn btn-primary ">
                        <span className="badge text-bg-secondary">{props.maximo}</span>
                    </button>
                </div>
                <div className="p-2">
                    <p>To complete</p>
                </div>
                <div className="d-flex flex-column gap-1 p-2">
                <button className={props.user_creador == store.user?.id ? "btn btn-danger": "d-none"} onClick={handleDelete}>Delete Event</button>
                <button className={props.user_creador == store.user?.id ? "btn btn-400": "d-none"} onClick={updateEvent}>Update Event</button>
                </div>
            </div>
            <div className="ms-5" >
                <h3>Description</h3>
                <p>{props.descripcion}</p>
            </div>

            <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })} />
            <SignUpModal show={modalState.showModalUpdate} onClose={() => setModalState({ showModalUpdate: false })} />
        </div>
    );
}

EventDescriptionCard.propTypes = {
    evento: PropTypes.string,
    descripcion: PropTypes.string,
    asistentes: PropTypes.number,
    maximo: PropTypes.number,
    fecha: PropTypes.string,
    img: PropTypes.string
}
