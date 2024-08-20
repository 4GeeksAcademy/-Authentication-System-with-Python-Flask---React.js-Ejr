import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/perfil.css"
import VistaModal from "../component/vistaModal.jsx";
import Swal from 'sweetalert2'



const Perfil = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        actions.getPerfilUsuario()

        // Inicializar los popovers (sin guardar en una variable)
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popoverTriggerEl => {
            new bootstrap.Popover(popoverTriggerEl);
        });

    }, []);
    const [showModal, setShowModal] = useState(false);

    // Función para mostrar el modal
    const openModal = () => setShowModal(true);

    // Función para cerrar el modal
    const closeModal = () => setShowModal(false);
    return (
        <div className="container mt-4 col-md-8" style={{ minHeight: '73vh' }}>
            <div className="row align-items-center user-profile">
                <div className="col-md-4 text-center position-relative">
                    <img src={store.dataUser?.foto || "https://static.vecteezy.com/system/resources/thumbnails/000/495/460/small/22_Profile.jpg"}
                        alt="User Image"
                        className="img-fluid rounded-circle profile-image"
                    />
                    <button
                        className="btn btn-light position-absolute align-items-center d-flex"
                        style={{
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                            top: "15%",
                            left: "85%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#afb4b8"
                        }}
                        onClick={openModal} // Abre el modal al hacer clic en el botón
                    >
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>

                    {/* Renderiza el modal condicionalmente */}
                    {showModal && (
                        <VistaModal
                            show={showModal}
                            onClose={closeModal}
                            imageSrc={store.dataUser?.foto || null}
                            onDelete={() => {
                                // Aquí puedes agregar la lógica para eliminar la foto de perfil si es necesario.
                            }}
                        />
                    )}
                </div>
                <div className="col-md-8 text-md-start text-center mt-3 mt-md-0 profile-info">
                    <h2>{store.dataUser?.nombre_usuario+" "+store.dataUser?.apellido}</h2>
                </div>
                <div className="accordion mt-3" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Información personal
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="container mt-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <p><strong>Nombre: {store.dataUser?.nombre_usuario+" "+store.dataUser?.apellido}</strong> </p>
                                            <p><strong>Email:</strong> {store.dataUser?.correo}</p>
                                            <p><strong>Teléfono:</strong> {store.dataUser?.telefono}</p>
                                            <p><strong>Descripción:</strong> {store.dataUser?.descripcion}</p>
                                        </div>
                                        <div className="col-md-4 text-end align-self-start d-flex justify-content-end">
                                            <span className="d-inline-block" tabIndex="0" data-bs-placement="left" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Esta información solo está disponible para tí y para los profesionales con los que agendes cita, nadie más puede acceder a ella.">
                                                <button className="btn btn-outline-secondary me-2" type="button" ><i className="fa-regular fa-circle-question"></i></button>
                                            </span>
                                            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fa-regular fa-pen-to-square"></i></button>

                                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                                        </div>
                                                        <div className="modal-body">
                                                            ...
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary">Understood</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Mis agendas
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Metodos de pago
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil