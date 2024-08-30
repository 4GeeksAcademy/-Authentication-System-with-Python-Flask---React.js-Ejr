import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/perfil.css";
import VistaModal from "../component/vistaModal.jsx";
import defaultAvatar from "../../img/avatar.jpg";
import Loader from "../component/loader.jsx";
import FormSolicitudProf from "../component/formSolicitudProf.jsx";
import MercadoPagoComponent from "../component/MercadoPago.jsx";
import Swal from 'sweetalert2'
import Meets from "../component/meets.jsx";
import EditarInformacion from "../component/editarInformacion.jsx";
// ID cliente: RrLt2R0t0jbTXChSFJLFIPaSMniKYriRIi6kxAszsWA
// Secreto de cliente: qdg4iNfaJf7ihnst8Ln4rbtDP3DTBLXl7Q6ZOmC9g_g
// Clave de firma WebHook: wxCO2fVy0HgDGrihAZuw4y8pZWunAu27OS5ghje2_M8
// Token: eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI0Njk1NjU3LCJqdGkiOiI1MTg5ZmExNC00YWVhLTQ2YjktYTQzOS1hOGQzZTY5MGUxYmMiLCJ1c2VyX3V1aWQiOiI2NzZiNTI3NS01NWYzLTRlODgtOTk0ZC00MjQxMzA3YWE0YzgifQ.0tCtUEuUVaMdIACWrxeIWkh6q6ssHOLperR4Yp4_J11rPwITlcDeerMws6PpuT0aAsHLVWOI7gf8WQmuH_L9cQ
// URI user hablemosuy : https://api.calendly.com/users/676b5275-55f3-4e88-994d-4241307aa4c8

const Perfil = () => {
    const { store, actions } = useContext(Context);
    const [perfil, setPerfil] = useState({})
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        actions.fetchEspecialidades();

        const fetchPerfil = async () => {
            const isPerfilObtenido = await actions.getPerfilUsuario(id);
            console.log(isPerfilObtenido);

            if (isPerfilObtenido) {
                setPerfil(isPerfilObtenido)
            } else {
                Swal.fire({
                    title: 'Error al obtener el perfil',
                    text: 'Hubo un problema al cargar sus datos. Por favor, intente de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    navigate("/vista-login")
                });
            }
        };
        fetchPerfil();
  
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popoverTriggerEl => {
            new bootstrap.Popover(popoverTriggerEl);
        });
    }, []);



    const [showModal, setShowModal] = useState(false);

    // Función para mostrar el modal

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Guardar las especialidades seleccionadas
    const saveEspecialidad = async (id) => {
        let resp = await actions.saveEspecialidad(id);
        if (resp) {
            setPerfil({ ...perfil, especialidades: [...perfil.especialidades, resp] })
        }
    };
    const deleteEspecialidad = async (id) => {
        let resp = await actions.eliminarEspecialidadPorProfesional(id);
        if (resp) {
            setPerfil({ ...perfil, especialidades: perfil.especialidades.filter(item => item.especialidad_id != id) })
        }
    };


    return (
        <div className="container mt-4 col-11 col-md-10 col-lg-8" style={{ minHeight: '73vh' }}>
            <div className="row align-items-center user-profile">
                <div className="col-md-4 text-center position-relative">
                    <div className="profile-image-container">
                        <img src={perfil?.foto || defaultAvatar}
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
                            imageSrc={perfil?.foto || null}
                            onDelete={() => {
                            }}
                        />
                    )}
                </div>

                <div className="col-md-8 text-md-start text-center mt-3 mt-md-0 profile-info">
                    <h2 className="text-inicio">
                        {perfil?.nombre_usuario && perfil?.apellido
                            ? `${perfil.nombre_usuario} ${perfil.apellido}`
                            : <Loader width="300px" height="35px" />}
                    </h2>
                    <div className="personal-info text-start mt-3 mb-2">
                       
                        <div className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Email: </strong>
                            {perfil?.correo
                                ? perfil.correo
                                : <Loader width="350px" height="15px" />}
                        </div>
                        <div className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Teléfono: </strong>
                            {perfil?.telefono
                                ? `${perfil?.codigo_de_area} ${perfil.telefono}` 
                                : <Loader width="200px" height="15px" />}
                        </div>
                        {perfil && perfil.is_psicologo && (
                            <div className="d-flex">
                                <strong className="text-inicio me-2">Descripción profesional: </strong>
                                {perfil?.descripcion
                                    ? perfil.descripcion
                                    : <Loader width="300px" height="15px" />}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link active nav-perfil" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">{perfil && perfil.is_psicologo ? 'Agendas de pacientes' : 'Mis agendass'}</button>
                            <button className="nav-link nav-perfil" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Métodos de pago</button>
                            {perfil && perfil.is_psicologo ==true ? (
                                <button className="nav-link nav-perfil" id="v-pills-especialidad-tab" data-bs-toggle="pill" data-bs-target="#v-pills-especialidad" type="button" role="tab" aria-controls="v-pills-especialidad" aria-selected="false">Mis especialidades</button>
                            ) : perfil.is_psicologo==false && (
                                <button className="nav-link nav-perfil" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Solicitud de perfil profesional</button>
                            )
                            }
                            <button className="nav-link nav-perfil" id="vi-pills-edit-info-tab" data-bs-toggle="pill" data-bs-target="#vi-pills-edit-info" type="button" role="tab" aria-controls="vi-pills-edit-info" aria-selected="false">Editar mi información</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <Meets />
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <MercadoPagoComponent/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-especialidad" role="tabpanel" aria-labelledby="v-pills-especialidad-tab">
                                <h4>Especialidades</h4>
                                <div className="form-group">
                                    <ul>
                                        {Array.isArray(perfil.especialidades) && perfil.especialidades.length > 0 ? (
                                            perfil.especialidades.map((especialidad) => (
                                                <li id="nombreEspecialidad" key={especialidad.id}>
                                                    {especialidad.nombre}
                                                    <i
                                                        className="fas fa-times"
                                                        style={{ paddingLeft: "20px" }}
                                                        onClick={() => deleteEspecialidad(especialidad.especialidad_id)}
                                                    />
                                                </li>
                                            ))
                                        ) : (
                                            <li>No hay especialidades disponibles.</li>
                                        )}
                                    </ul>
                                    {Array.isArray(store.especialidades) && Array.isArray(perfil.especialidades) && store.especialidades
                                        .filter(especialidad =>
                                            !perfil.especialidades.some(especialidadProfesional => especialidadProfesional.especialidad_id === especialidad.id)
                                        )
                                        .map(especialidad => (
                                            <div key={especialidad.id} className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`especialidad-${especialidad.id}`}
                                                    onChange={() => saveEspecialidad(especialidad.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`especialidad-${especialidad.id}`}>
                                                    {especialidad.nombre}
                                                </label>
                                            </div>
                                        ))}

                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <div className="container mt-3">
                                    <FormSolicitudProf />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="vi-pills-edit-info" role="tabpanel" aria-labelledby="vi-pills-edit-info-tab">
                                <div className="container mt-3">
                                    <EditarInformacion perfil={(perfil)} setPerfil={setPerfil} />
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
