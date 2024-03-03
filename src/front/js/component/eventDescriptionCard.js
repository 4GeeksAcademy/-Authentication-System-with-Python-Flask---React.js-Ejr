import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignUpModal";
export const EventDescriptionCard = (props) => {
    const { store, actions } = useContext(Context);
    // const [asist_event, setAsist_event] = useState([]);
    const [isJoinedEvent, setIsJoinedEvent] = useState(store.user.id_eventos?.includes(parseInt(props.id_evento)));
    console.log(isJoinedEvent);
    const [modalState, setModalState] = useState({
        showModal: false,
        showModalUpdate: false,
    });
    function updateModalState() {
        setModalState({ showModal: true });
    }
    useEffect(() => {

        const fetchUser = async () => {
            await actions.obtenerInfoUsuario()
            setIsJoinedEvent(store.user.id_eventos?.includes(parseInt(props.id_evento)));


        }

        if (store.auth) {
            fetchUser()
            console.log("entramos");
        }



    }, []);

    const fechaString = props.fecha;
    const fechaObjeto = new Date(fechaString);
    const fechaFormateada = fechaObjeto.toLocaleDateString();



    const handleInscription = async () => {

        await actions.inscripcionEvento(props.id_evento)


        setIsJoinedEvent(store.user.id_eventos?.includes(parseInt(props.id_evento)));



    }

    return (
        <div className="d-flex  flex-column" style={{ maxWidth: "840px" }}>
            <div className="card  ms-5 " style={{ maxWidth: "840px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://th.bing.com/th/id/OIP.vQVUl7GC7E0qEtKUgS1m4AHaEo?rs=1&pid=ImgDetMain" className="img-fluid rounded-start" alt="..." />
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

            <div className="d-flex justify-content-center mb-3 gap-1" >
                <div className="p-2 flex-grow-1  ms-5" >{store.auth ? <button onClick={handleInscription} type="button" className={isJoinedEvent ? 'btn btn-primary btn-lg disabled' : 'btn btn-primary btn-lg'}>
                    {isJoinedEvent ? "Joined this event" : "JOIN EVENT"}
                </button> : <button className="btn btn-primary " onClick={updateModalState}  >loggin</button>}

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
    fecha: PropTypes.string
}
