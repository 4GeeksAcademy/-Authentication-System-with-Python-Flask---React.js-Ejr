import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const PostuladosList = () => {
    const { store, actions } = useContext(Context);
    const { oferta_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postulados, setPostulados] = useState([]);


    useEffect(() => {
        const fetchPostulados = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/oferta/${oferta_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setPostulados(data.oferta.postulados);

                } else {
                    setError(data.msg);
                }
            } catch (error) {
                setError('Error al obtener los postulados');
            } finally {
                setLoading(false);
            }
        };

        if (oferta_id) {
            fetchPostulados();
        }
    }, [oferta_id, store.token]);

    return (
        <div>
            <h2>Detalles de Postulados</h2>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            <ul>
                {postulados.map((postulado) => (
                    
                    <li key={postulado.user_id}>
                        <p>Usuario: {postulado.username}</p>
                        <p>Email: {postulado.email}</p>
                        <p>Estado: {postulado.estado}</p>
                        <p>Programador: {postulado.programador.id}</p>
                        <Link to={`/Form_Contact_Postulados/${postulado.user_id}`}>
                            <button className="btn btn-primary">Contactar</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
