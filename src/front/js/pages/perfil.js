import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css"
import VistaModal from "../component/vistaModal.jsx";
import defaultAvatar from "../../img/avatar.jpg"


const Perfil = () => {

    const { store, actions } = useContext(Context)

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
                    <img src={store.dataUser?.foto || defaultAvatar}
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
                    <h2>{store.dataUser?.nombre_usuario + " " + store.dataUser?.apellido}</h2>
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
                                            <p><strong>Nombre: {store.dataUser?.nombre_usuario + " " + store.dataUser?.apellido}</strong> </p>
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
                    {store.dataUser && !store.dataUser.is_psicologo && <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePsicologo" aria-expanded="false" aria-controls="collapsePsicologo">
                                Solicitud de perfil profesional
                            </button>
                        </h2>
                        
                        <div id="collapsePsicologo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="container mt-3">
                                    <h4 className="mb-3 text-inicio">Formulario de Solicitud de Perfil Profesional</h4>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="nombreCompleto" className="form-label text-inicio"><strong>Nombre Completo</strong></label>
                                            <input type="text" className="form-control" id="nombreCompleto" placeholder="Ingrese su nombre completo" required />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="cedula" className="form-label text-inicio"><strong>Cédula</strong></label>
                                            <input type="text" className="form-control" id="cedula" placeholder="Ingrese su cédula" required />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="correo" className="form-label text-inicio"><strong>Correo Electrónico</strong></label>
                                            <input type="email" className="form-control" id="correo" placeholder="Ingrese su correo electrónico" required />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="direccion" className="form-label text-inicio"><strong>Dirección</strong></label>
                                            <input type="text" className="form-control" id="direccion" placeholder="Ingrese su dirección" required />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="escolaridad" className="form-label text-inicio"><strong>Escolaridad que Acredite Conocimientos</strong></label>
                                            <input type="file" className="form-control" id="escolaridad" multiple required />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="motivacion" className="form-label text-inicio"><strong>¿Por qué quieres trabajar con nosotros?</strong></label>
                                            <textarea className="form-control" id="motivacion" rows="4" placeholder="Cuéntanos tus motivaciones" required></textarea>
                                        </div>
                                        <div className="d-flex justify-content-center row mt-3">
                                            <small className="text-inicio text-center">En el caso de que el equipo de RRHH te considere un buen candidato para itegrar nuesto equipo de profesionales, se pondrán en contacto a la brevedad para coordinar una entrevista</small>
                                            <button type="submit" className="btn btn-primary btn-login-registro mt-3">Enviar Solicitud</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {store.dataUser && !store.dataUser.is_psicologo && <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInfoProfesional" aria-expanded="false" aria-controls="collapseInfoProfesional">
                                Información del profesional
                            </button>
                        </h2>
                        <div id="collapseInfoProfesional" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="container mt-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <p><strong>Nombre: {store.dataUser?.nombre_usuario + " " + store.dataUser?.apellido}</strong> </p>
                                            <p><strong>Email:</strong> {store.dataUser?.correo}</p>
                                            <p><strong>Teléfono:</strong> {store.dataUser?.telefono}</p>
                                            <p><strong>Descripción:</strong> {store.dataUser?.descripcion}</p>
                                        </div>
                                        <div className="col-md-4 text-end align-self-start d-flex justify-content-end">
                                            <span className="d-inline-block" tabIndex="0" data-bs-placement="left" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Esta información es visible para los usuarios que buscan profesionales en nuestra web, es lo primero que saben de tí; tu nombre, tu descripcion y las especialidades que tratas.">
                                                <button className="btn btn-outline-secondary me-2" type="button" ><i className="fa-regular fa-circle-question"></i></button>
                                            </span>
                                            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalInfoPsicologo"><i className="fa-regular fa-pen-to-square"></i></button>

                                            <div className="modal fade" id="modalInfoPsicologo" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalInfoPsicologoLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="modalInfoPsicologoLabel">Modificar información de profesional</h1>
                                                        </div>
                                                        <div className="modal-body">
                                                            ...
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                            <button type="button" className="btn btn-primary">Confirmar edición</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Perfil