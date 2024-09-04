import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const PostuladosList = () => {
    const { store, actions } = useContext(Context);
    const { oferta_id } = useParams(); 
    const [postulados, setPostulados] = useState([]);

    useEffect(() => {
        const loadPostulados = async () => {
            const response = await actions.getPostuladosByOferta(oferta_id);
            if (response) setPostulados(response);
        };
        loadPostulados();
    }, [oferta_id, actions]);

    const handleContratar = async (user_id) => {
        const result = await actions.changePostuladoStatus(oferta_id, user_id, "contratado");
        if (result.type === "success") {
            setPostulados((prev) => prev.map(p => p.user_id === user_id ? { ...p, estado: "contratado" } : p));
        }
    };

    const handleRechazar = async (user_id) => {
        const result = await actions.changePostuladoStatus(oferta_id, user_id, "rechazado");
        if (result.type === "success") {
            setPostulados((prev) => prev.map(p => p.user_id === user_id ? { ...p, estado: "rechazado" } : p));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h3 className="postulados-title text-secondary fw-bold">Lista de postulados a tu oferta</h3>
                    {postulados.length > 0 ? (
                        <div className="row mt-3">
                            {postulados.map((postulado) => (
                                <div key={postulado.user_id} className="col-md-4 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{postulado.user.name}</h5>
                                            <p className="card-text"><strong>Email:</strong> {postulado.user.email}</p>
                                            <p className="card-text"><strong>Estado:</strong> {postulado.estado}</p>
                                            <div className="d-flex justify-content-between">
                                                {postulado.estado === "pendiente" && (
                                                    <>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() => handleContratar(postulado.user_id)}
                                                        >
                                                            Contratar
                                                        </button>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => handleRechazar(postulado.user_id)}
                                                        >
                                                            Rechazar
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-3">No hay postulados para esta oferta.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
