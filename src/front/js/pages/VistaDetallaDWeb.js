//VistaDetallada:Frontend (VistaDetallada.js): El usuario selecciona un curso y hace clic en "Ir a pagar".

import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';



const VistaDetallada = () => {
    const { id } = useParams(); // Obtiene el id del curso desde la URL
    const { store, actions } = useContext(Context); // Obtiene el estado global
    const navigate = useNavigate(); // Hook para navegación

    // Convierte el id de la URL a un número entero
    const cursoId = parseInt(id, 10);

    console.log('ID desde la URL:', cursoId); // Verifica el ID obtenido de la URL

    // Encuentra el curso por ID en el estado global
    const curso = store.cursos.find(curso => curso.id === cursoId);

    useEffect(() => {
        console.log(curso);
       
    }, [curso]);
    
    console.log('Cursos en store:', store.cursosConFiltros); // Verifica los cursos en el estado global
    console.log('Curso encontrado:', curso); // Verifica el curso encontrado

    // Al hacer clic en el botón "Ir a pagar", el usuario es redirigido a la vista de pago (VistaPago)
    const handleGoToPayment = () => {
        navigate('/vistaPago', { state: { curso } }); // Pasa información del curso a VistaPago
    };

    // Cargar cursos cuando el componente se monta
    useEffect(() => {
        console.log('Cargando cursos...');
        actions.cargarCursos();
    }, []);
    


    if (!curso) {
        return <p>Curso no encontrado</p>; // Mensaje si el curso no existe
    }

    return (
        <div className="curso-vistaDetallada">
            <h1>{curso.nombre}</h1>
            <p><strong>Descripción Curso:</strong> {curso.descripcion}</p>
            <p><strong>Precio:</strong> €{curso.precio}</p>
            <button onClick={handleGoToPayment} className="btn btn-primary_pagar">Ir a pagar</button>
        </div>
    );
};

export default VistaDetallada;

