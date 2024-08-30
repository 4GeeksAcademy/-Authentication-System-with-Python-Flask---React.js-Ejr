//VistaDetallada.js: Muestra la información del curso y tiene un botón para "Ir a pagar". Cuando el usuario hace clic en este botón, debería redirigir a VistaPago.js.
//VistaPago.js: Se encarga de preparar y mostrar la información de pago y luego redirige al componente de formulario de pago (FormularioPago.js), donde se procesará el pago usando Stripe.

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

    // Función para manejar la navegación a la vista de pago
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
            <p><strong>Descripción:</strong> {curso.descripcion}</p>
            <p><strong>Precio:</strong> €{curso.precio}</p>
            <button onClick={handleGoToPayment} className="btn btn-primary_pagar">Ir a pagar</button>
        </div>
    );
};

export default VistaDetallada;

