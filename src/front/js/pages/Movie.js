import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/Movie.css";
import { useParams } from "react-router-dom";
import no_trailer2 from "../../img/no_trailer2.png";
import no_image from "../../img/no_image.png";
import { Link } from 'react-router-dom';
import { Spinner } from "../component/Spinner";

export const Movie = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const imageUrl = movie?.image ? `https://image.tmdb.org/t/p/w500${movie?.image}` : no_image;
    const trailerUrl = movie?.trailer_key ? `https://www.youtube.com/embed/${movie.trailer_key}` : null;

    console.log(movieId)


    useEffect(() => {
        console.log("actions");
        actions.getMovieById(movieId).then(movie => {
            console.log(movieId, movie);
            setMovie(movie);
            setLoading(false)
        });
    }, [movieId]);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mb-3">
                            <h3>{movie?.name}</h3>

                        </div>
                        {/* <button className="mostrar-mas">Agregar a los favoritos</button> */}
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <div className="card mt-1">
                                <img className="card-img-top" src={imageUrl} alt="Poster" />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex flex-column top-aligned">
                            <div>
                                {movie?.genres?.map((genre, index) => (
                                    <button key={index} className="gender">{genre.name}</button>
                                ))}
                                <i className="fa fa-star star-icon"></i>
                                <span className="ranking">{movie?.ranking}/10</span>
                            </div>
                            <div className="description">
                                <p>{movie?.description}</p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-right">
                            {trailerUrl ? (
                                <div className="video-container">
                                    <iframe
                                        width="640"
                                        height="360"
                                        src={trailerUrl}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            ) : (
                                <div className="image-container">
                                    <img src={no_trailer2} alt="No trailer available" className="trailer-size" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="container-crew">
                        <div className="d-flex  align-items-center">
                            <h4 className="act_direct">Actors and Directors</h4>
                            <button className="mostrar-mas">Show more</button>
                        </div>



                        <div className="row">
                            {movie?.actors?.map((actor) => (
                                <div className="col-md-2" key={actor.id}>
                                    <Link to={`/actors/${actor.id}`}>
                                        <div className="card">
                                            <img
                                                className="profile_path"
                                                src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : no_image}
                                                alt={actor.name} />
                                        </div>
                                        <p className="card-name">{actor.name}</p>
                                        <p className="card-character">{actor.character}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
