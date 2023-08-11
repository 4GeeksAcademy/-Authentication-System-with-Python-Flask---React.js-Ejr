import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/Movie.css";
import { useParams } from "react-router-dom";


export const Movie = () => {
    const { store, actions } = useContext(Context);
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie?.image || "/path/to/default/image"}`;


    useEffect(() => {
        console.log("actions");
        actions.getMovieById(movieId).then(movie => {
            console.log(movieId, movie);
            setMovie(movie);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5">
                    <h3>{movie?.name}</h3>

                </div>
                {/* <button className="mostrar-mas">Agregar a los favoritos</button> */}
            </div>

            <div className="row align-items-center">
                <div className="col-md-2">
                    <div className="card mt-1">
                        <img className="card-img-top" src={imageUrl} alt="Poster" />
                    </div>
                </div>
                <div className="col-md-5 d-flex flex-column">
                    <div>
                        <button className="gender">Cine de Aventura</button>
                        <button className="gender">Fantasía</button>
                        <i className="fa fa-star star-icon"></i>
                        <span className="ranking">8</span>
                    </div>
                    <div>
                        <p>{movie?.description}</p>
                    </div>
                </div>
                <div className="col-md-5 d-flex flex-column align-items-right">
                    <div className="video-container">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/WE4AJuIvG1Y"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>

            <div className="container-crew">
                <div className="d-flex justify-content-left title-container">
                    <h5>Actores y Directores</h5>
                    <button className="mostrar-mas">Mostrar más</button>
                </div>

                <div className="row">
                    {movie?.actors?.filter((actor) => actor.profile_path).map((actor) => (
                        <div className="col-md-2" key={actor.id}>
                            <div className="card">
                                <img className="profile_path" src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                            </div>
                            <p className="card-name">{actor.name}</p>
                            <p className="card-character">{actor.character}</p>
                        </div>
                    ))}
                </div>




            </div>
        </div>
    );
};
