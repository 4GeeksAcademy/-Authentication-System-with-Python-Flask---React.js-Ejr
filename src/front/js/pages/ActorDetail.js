import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ActorDetail.css";
import { useParams, Link } from "react-router-dom";
import no_image from "../../img/no_image.png";

export const ActorDetail = () => {
    const { store, actions } = useContext(Context);
    const { actorId, movieId } = useParams();
    const [actorDetail, setActorDetail] = useState(null);
    const [actorMovies, setActorMovies] = useState([]);

    const newDate = new Date(actorDetail?.birthday);
    const formatDate = newDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
    
    const imageUrl = actorDetail?.profile_path
        ? `https://image.tmdb.org/t/p/w500${actorDetail?.profile_path}`
        : no_image;
    
        useEffect(() => {
            actions.getActorById(actorId).then(actor => {
                setActorDetail(actor);
                actions.getMoviesByActor(actorId).then(movies => {
                    setActorMovies(movies);
                });
            });
        }, [actorId, actions]);
    
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mb-1">
                        <h3>{actorDetail?.name}</h3>
                        <h6>Character: {actorDetail?.character}</h6>
                        <Link to={`/movie/${movieId}`}>GO BACK</Link>
                        
                    </div>
                    
            
                </div>
    
                <div className="row">
                 
                    <div className="col-md-4 d-flex flex-column top-aligned">
                        <div className="card mt-2">
                            <img
                                className="card-img-top"
                                src={imageUrl}
                                alt={actorDetail?.name}
                            />
                        </div>
                    </div>
    
                    <div className="col-md-6">
                        <h4>{formatDate}</h4>
                        <h4>{actorDetail?.place_of_birth}</h4>
                        <h4>{actorDetail?.deathday}</h4>
                    </div>
    
                
    
                </div>
                     <div className="col-md-12 mt-2 d-flex flex-column text-justify">
                        <p>{actorDetail?.biography}</p>
                    </div>
                <div className="row">
    
                </div>
               
            </div>
        );
    };
    