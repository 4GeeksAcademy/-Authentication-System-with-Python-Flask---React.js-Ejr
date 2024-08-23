import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";
import VistaModal from "../component/vistaModal.jsx";
import defaultAvatar from "../../img/avatar.jpg";
import Loader from "../component/loader.jsx";
import FormSolicitudProf from "../component/formSolicitudProf.jsx";

const Perfil = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getPerfilUsuario();

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
        <div className="container mt-4 col-11 col-md-10 col-lg-8" style={{ minHeight: '73vh' }}>
            <div className="row align-items-center user-profile">
                <div className="col-md-4 text-center position-relative">
                    <div className="profile-image-container">
                        <img src={store.dataUser?.foto || defaultAvatar}
                            alt="User Image"
                            className="profile-image"
                        />
                    </div>
                    <button
                        className="btn btn-secondary position-absolute align-items-center d-flex"
                        style={{
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                            top: "15%",
                            left: "85%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#c1b4c3"
                        }}
                        onClick={openModal}
                    >
                        <i className="fa-regular text-secondary fa-pen-to-square"></i>
                    </button>
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
                    <h2 className="text-inicio">
                        {store.dataUser?.nombre_usuario && store.dataUser?.apellido
                            ? `${store.dataUser.nombre_usuario} ${store.dataUser.apellido}`
                            : <Loader width="300px" height="35px" />}
                    </h2>
                    <div className="personal-info text-start mt-3 mb-2">
                        <p className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Nombre: </strong>{" "}
                            {store.dataUser?.nombre_usuario && store.dataUser?.apellido
                                ? `${store.dataUser.nombre_usuario} ${store.dataUser.apellido}`
                                : <Loader width="200px" height="15px" />}
                        </p>
                        <p className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Email: </strong>
                            {store.dataUser?.correo
                                ? store.dataUser.correo
                                : <Loader width="350px" height="15px" />}
                        </p>
                        <p className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Teléfono: </strong>
                            {store.dataUser?.telefono
                                ? store.dataUser.telefono
                                : <Loader width="200px" height="15px" />}
                        </p>
                        <p className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Descripción: </strong>
                            {store.dataUser?.descripcion
                                ? store.dataUser.descripcion
                                : <Loader width="300px" height="15px" />}
                        </p>
                    </div>
                </div>

            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link active nav-perfil" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Mis agendas</button>
                            <button className="nav-link nav-perfil" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Métodos de pago</button>
                            {store.dataUser && !store.dataUser.is_psicologo && (
                                <button className="nav-link nav-perfil" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Solicitud de perfil profesional</button>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <p><strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNames that we use to style each element. These classNames control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <p><strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNames that we use to style each element. These classNames control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
                            </div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <div className="container mt-3">
                                   <FormSolicitudProf />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
