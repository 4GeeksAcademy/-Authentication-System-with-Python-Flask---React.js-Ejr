import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ActorDetail.css";
import { useParams, Link } from "react-router-dom";
import no_image from "../../img/no_image.png";
import { Spinner } from "../component/Spinner";

export const ActorDetail = () => {
    const { store, actions } = useContext(Context);
    const { actorId } = useParams();
    const [loading, setLoading] = useState(true);
    const [actorDetail, setActorDetail] = useState(null); // Corrección aquí
    const imageUrl = actorDetail?.profile_path
        ? `https://image.tmdb.org/t/p/w500${actorDetail?.profile_path}`
        : no_image;

    useEffect(() => {
        actions.getActorById(actorId).then(actor => {
            setActorDetail(actor); // Usar setActorDetail aquí
            setLoading(false)
        });
    }, [actorId, actions]);

    
    return (
        <div className="container">
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className="row">
                        <div className="col-md-6 mt-5 mb-1">
                            <h3>{actorDetail?.name}</h3>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-4 mx-6">
                            <div className="card mt-4">
                                <img
                                    className="card-img-top"
                                    src={imageUrl}
                                    alt={actorDetail?.name}
                                />
                            </div>
    
                            <div>
                                <p>{/* Contenido del párrafo */}</p>
                            </div>
                        </div>

                    </div>
                <div className="row">
    
                </div>

            )}
        </div>
    );
};
