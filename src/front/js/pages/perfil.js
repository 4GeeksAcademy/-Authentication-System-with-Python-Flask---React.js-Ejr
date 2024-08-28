import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/perfil.css";
import VistaModal from "../component/vistaModal.jsx";
import defaultAvatar from "../../img/avatar.jpg";
import Loader from "../component/loader.jsx";
import FormSolicitudProf from "../component/formSolicitudProf.jsx";
import Swal from 'sweetalert2'
import Meets from "../component/meets.jsx";
// ID cliente: RrLt2R0t0jbTXChSFJLFIPaSMniKYriRIi6kxAszsWA
// Secreto de cliente: qdg4iNfaJf7ihnst8Ln4rbtDP3DTBLXl7Q6ZOmC9g_g
// Clave de firma WebHook: wxCO2fVy0HgDGrihAZuw4y8pZWunAu27OS5ghje2_M8
// Token: eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI0Njk1NjU3LCJqdGkiOiI1MTg5ZmExNC00YWVhLTQ2YjktYTQzOS1hOGQzZTY5MGUxYmMiLCJ1c2VyX3V1aWQiOiI2NzZiNTI3NS01NWYzLTRlODgtOTk0ZC00MjQxMzA3YWE0YzgifQ.0tCtUEuUVaMdIACWrxeIWkh6q6ssHOLperR4Yp4_J11rPwITlcDeerMws6PpuT0aAsHLVWOI7gf8WQmuH_L9cQ
// URI user hablemosuy : https://api.calendly.com/users/676b5275-55f3-4e88-994d-4241307aa4c8

const Perfil = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    useEffect(() => {
        actions.getPerfilUsuario();
        actions.fetchEspecialidades();
        actions.obtenerEspecialidadesPorProfesional();

        const fetchPerfil = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire({
                    title: 'No puede acceder a ésta sección!',
                    text: 'Token inválido o inexistente',
                    icon: 'warning',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    navigate("/vista-login")
                });
                return;
            }

            try {
                const isPerfilObtenido = await actions.getPerfilUsuario();
                if (!isPerfilObtenido) {
                    Swal.fire({
                        title: 'Error al obtener el perfil',
                        text: 'Hubo un problema al cargar sus datos. Por favor, intente de nuevo.',
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    }).then(() => {
                        navigate("/vista-login")
                    });
                }
            } catch (error) {
                console.error("Error al obtener el perfil del usuario:", error);
                Swal.fire({
                    title: 'Error inesperado',
                    text: 'Ocurrió un error inesperado. Por favor, intente de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    navigate("/vista-login")
                });
            }
        };
        // Inicializar los popovers (sin guardar en una variable)
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popoverTriggerEl => {
            new bootstrap.Popover(popoverTriggerEl);
        });
    }, []);

    

    const [showModal, setShowModal] = useState(false);
    const [selectedEspecialidades, setSelectedEspecialidades] = useState([]);

    // Función para mostrar el modal

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Manejar la selección de especialidades
    const handleEspecialidadChange = (id) => {
        setSelectedEspecialidades(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    // Guardar las especialidades seleccionadas
    const saveEspecialidades = () => {
        actions.saveEspecialidades(selectedEspecialidades);
    };

    // Mostrar las especialidades ya guardadas para el usuario
    const userEspecialidades = store.dataUser?.especialidades || [];
    
   
    console.log(store.especialidades);
    console.log(store.obtenerEspecialidadesPorProfesional);
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
                        <div className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Nombre: </strong>{" "}
                            {store.dataUser?.nombre_usuario && store.dataUser?.apellido
                                ? `${store.dataUser.nombre_usuario} ${store.dataUser.apellido}`
                                : <Loader width="200px" height="15px" />}
                        </div>
                        <div className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Email: </strong>
                            {store.dataUser?.correo
                                ? store.dataUser.correo
                                : <Loader width="350px" height="15px" />}
                        </div>
                        <div className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Teléfono: </strong>
                            {store.dataUser?.telefono
                                ? store.dataUser.telefono
                                : <Loader width="200px" height="15px" />}
                        </div>
                        <div className="d-flex align-items-center">
                            <strong className="text-inicio me-2">Descripción: </strong>
                            {store.dataUser?.descripcion
                                ? store.dataUser.descripcion
                                : <Loader width="300px" height="15px" />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link active nav-perfil" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">{store.dataUser && store.dataUser.is_psicologo ? 'Agendas de pacientes': 'Mis agendass'}</button>
                            <button className="nav-link nav-perfil" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Métodos de pago</button>
                            {store.dataUser && store.dataUser.is_psicologo && (
                                <button className="nav-link nav-perfil" id="v-pills-especialidad-tab" data-bs-toggle="pill" data-bs-target="#v-pills-especialidad" type="button" role="tab" aria-controls="v-pills-especialidad" aria-selected="false">Mis especialidades</button>
                            )}
                            {store.dataUser && !store.dataUser.is_psicologo && (
                                <button className="nav-link nav-perfil" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Solicitud de perfil profesional</button>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <Meets />
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <p><strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNames that we use to style each element. These classNames control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
                            </div>
                            <div className="tab-pane fade" id="v-pills-especialidad" role="tabpanel" aria-labelledby="v-pills-especialidad-tab">
                                <h4>Especialidades</h4>
                                <div className="form-group">
                                    <ul>
                                        {Array.isArray(store.especialidadesPorProfesional) && store.especialidadesPorProfesional.length > 0 ? (
                                            store.especialidadesPorProfesional.map((especialidad) => (
                                                <li id="nombreEspecialidad" key={especialidad.id}>
                                                    {especialidad.nombre}
                                                    <i
                                                        className="fas fa-times"
                                                        style={{paddingLeft :"20px"}}
                                                        onClick={() => actions.eliminarEspecialidadPorProfesional(especialidad.id)} 
                                                    />
                                                </li>
                                            ))
                                        ) : (
                                            <li>No hay especialidades disponibles.</li>
                                        )}
                                    </ul>
                                    {Array.isArray(store.especialidades) && Array.isArray(store.especialidadesPorProfesional) && store.especialidades
                                        .filter(especialidad =>
                                            !store.especialidadesPorProfesional.some(especialidadProfesional => especialidadProfesional.id === especialidad.id)
                                        )
                                        .map(especialidad => (
                                            <div key={especialidad.id} className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`especialidad-${especialidad.id}`}
                                                    checked={selectedEspecialidades.includes(especialidad.id)}
                                                    onChange={() => handleEspecialidadChange(especialidad.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`especialidad-${especialidad.id}`}>
                                                    {especialidad.nombre}
                                                </label>
                                            </div>
                                        ))}

                                </div>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={saveEspecialidades}
                                >
                                    Guardar Especialidades
                                </button>
                            </div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <div className="container mt-3">

                                </div>
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
