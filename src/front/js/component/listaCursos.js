// Este componente extrae los cursos del estado global y los muestra en una lista.

import React from "react";
import { Context } from '../store/appContext'; // Importa el contexto global

const ListaCursos = () => {
    const { store } = useContext(Context); // Obtiene el store desde el contexto

    return (
        <div className="lista-cursos">
            {store.cursosConFiltros.length > 0 ? ( /* Verifica los cursos después de aplicar los filtros */
                <ul> {/* Lista desordenada para mostrar los cursos */}
                    {store.cursosConFiltros.map(curso => ( /* mapea y busca sobre los cursos filtrados y genera un elemento para cada curso */
                        <li key={curso.id}> {/* Cada elemento (curso) de la lista tiene un identificador único (key) */}
                            <h3>{curso.nombre}</h3>
                            <p><strong>Categoría:</strong> {curso.categoria}</p>
                            <p><strong>Subcategoría:</strong> {curso.subcategoria}</p>
                            <p><strong>Valoración:</strong> {curso.valoracion} estrellas</p>
                            <p><strong>Nivel:</strong> {curso.nivel}</p>
                            <p><strong>Precio:</strong> ${curso.precio}</p>
                            <p><strong>Fecha de Inicio:</strong> {new Date(curso.fecha).toLocaleDateString()}</p> {/*convertir un objeto Date en una cadena de texto que representa la fecha en un formato legible */}
                            <p><strong>Idioma:</strong> {curso.idioma}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay cursos disponibles</p> /* Mensaje que se muestra si no hay cursos disponibles después de aplicar los filtros */
            )}
        </div>
    );
};

export default ListaCursos;






