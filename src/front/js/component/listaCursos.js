// Este componente extrae los cursos del estado global y los muestra en una lista.

import React, { useContext } from "react";
import { Context } from '../store/appContext'; // Importa el contexto global
import "../../styles/listaCursos.css";

const ListaCursos = () => {
    // Obtiene el store desde el contexto
    const { store } = useContext(Context); 

    return (
        <div className="lista-cursos my-4"> {/* Agrega un margen vertical */}
            {store.cursosConFiltros.length > 0 ? (  /* Verifica si hay cursos filtrados */
                <div className="row row-cols-1 row-cols-md-3 g-4"> {/* Cursos en una cuadrícula y g-4 agrega un espaciado entre los elementos */}
                    {store.cursosConFiltros?.map(curso => ( /* Mapea los cursos filtrados y genera un elemento para cada curso */
                        <div className="col" key={curso.id}> {/* Columna para cada tarjeta y usa el id del curso como la clave única */}
                            <div className="card h-100">
                                <img 
                                    src={curso.imagen ? `${process.env.BACKEND_URL}${curso.imagen}` : "https://via.placeholder.com/150"} /* direccion del models.py donde aparezca cursos y sus imagenes*/
                                    className="card-img-top" 
                                    alt={curso.nombre} 
                                /> {/* Muestra la imagen del curso, o una imagen por defecto si no hay imagen */}
                                <div className="card-body-ListaCurso">
                                    <h5 className="card-title">{curso.nombre}</h5> {/* Muestra el nombre del curso en el título de la tarjeta */}
                                    <p className="card-text">
                                        <strong>Categoría:</strong> {curso.categoria}<br />
                                        <strong>Subcategoría:</strong> {curso.subcategoria}<br />
                                        <strong>Valoración:</strong> {curso.valoracion} estrellas<br />
                                        <strong>Nivel:</strong> {curso.nivel}<br />
                                        <strong>Precio:</strong> €{curso.precio}<br />
                                        <strong>Fecha de Inicio:</strong> {new Date(curso.fecha).toLocaleDateString()}<br />
                                        <strong>Idioma:</strong> {curso.idioma}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <a href={`/curso/${curso.id}`} className="btn btn-primary">Informacion del curso</a> {/* Enlace para ir al detalle del curso */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="noCursos">Filtre para encontrar el curso deseado</p> /* Mensaje cuando no hay cursos filtrados */
            )}
        </div>
    );
};

export default ListaCursos;
