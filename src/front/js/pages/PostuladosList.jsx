import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const PostuladosList = () => {
    const { store, actions } = useContext(Context);
    const { oferta_id } = useParams(); // Obtén el ID de la oferta desde los parámetros de la URL
    const [loading, setLoading] = useState(true); // Estado para la carga
    const [error, setError] = useState(null); // Estado para el manejo de errores
    const [postulados, setPostulados] = useState([]); // Estado para almacenar los postulados

    useEffect(() => {
        const fetchPostulados = async () => {
            setLoading(true);
            setError(null);

            // Llama a la acción para cargar los postulados
            const response = await actions.loadUserPostulaciones(oferta_id);
            console.log('Response de loadUserPostulaciones:', response); // Verifica lo que llega aquí
            
            if (response.type === "success") {
                setPostulados(response.postulados); // Almacena los postulados en el estado
            } else {
                setError(response.msg); // Maneja el error
            }

            setLoading(false);
        };

        fetchPostulados();
    }, [oferta_id, actions]); // Reejecuta cuando cambian oferta_id o actions

    return (
        <div className="container mt-5">
            <h2>Lista de Postulados</h2>
            {loading ? (
                <p>Cargando postulados...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : postulados.length > 0 ? (
                <ul className="list-group">
                    {postulados.map((postulado, index) => (
                        <li key={index} className="list-group-item">
                            <strong>Nombre:</strong> {postulado.user.name} <br />
                            <strong>Email:</strong> {postulado.user.email} <br />
                            <strong>Estado:</strong> {postulado.estado}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay postulados para esta oferta.</p>
            )}
        </div>
    );
};

