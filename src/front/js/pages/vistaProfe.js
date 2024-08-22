import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaProfe = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // hook para manejar redirecciones.
    
    // VistaProfe: Debe centrarse en mostrar la información del profesor y los cursos. 
    //La lógica de redirección y autenticación y la protección de ruta ya está gestionada por PrivateRoute (privadaProfe.js)
    // Carga y mostrar datos.
    useEffect(() => {
        if (store.autentificacion && store.usuarioPr?.is_teacher) {
            actions.obtenerCursosTutor(store.usuarioPr.id); // Si el usuario está autenticado y es profesor, obtenemos los cursos del profesor del store.
        }
    }, [store.autentificacion, store.usuarioPr]); //useEffect se ejecutará cada vez que cualquiera de estos valores cambie

    return (
        <div className="contenedorProfe mt-5">
            <div className="perfilProfe">
                <img src={store.usuarioPr?.photo} alt="Foto del Profesor" className="foto-perfil" />
                <h3>{store.usuarioPr?.name}</h3>
            </div>
            <div className="cursos mt-4">
                <h4>Mis cursos</h4>
                <ul className="lista-grupo">
                    {store.cursosProfe.map(cursoProfe => (
                        <li key={cursoProfe.id} className="lista-grupo-item" onClick={() => navigate(`/curso/${cursoProfe.id}`)}>  
                            {cursoProfe.name} {/* Cada elemento de lista tiene un identificador único (key)y permite navegar a la página de detalles del curso cuando se hace clic*/}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VistaProfe;
