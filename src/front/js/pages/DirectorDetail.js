import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
// import "../../styles/DirectorDetail.css";
import { useParams, Link } from "react-router-dom";
import no_image from "../../img/no_image.png";
import { Spinner } from "../component/Spinner";

export const DirectorDetail = () => {
    const { store, actions } = useContext(Context);
    const { directorId, movieId } = useParams();
    const [loading, setLoading] = useState(true);
    const [directorDetail, setDirectorDetail] = useState(null);
    const [directorMovies, setDirectorMovies] = useState([]);
    const imageUrl = directorDetail?.profile_path
        ? `https://image.tmdb.org/t/p/w500${directorDetail?.profile_path}`
        : no_image;

    useEffect(() => {
        actions.getDirectorById(directorId).then(director => {
            setDirectorDetail(director);
            return actions.getMoviesByDirector(directorId);
        }).then(movies => {
            setDirectorMovies(movies);
        }).catch(error => {
            console.error("Hubo un error al cargar los datos:", error);
        });
        setLoading(false)
    }, [directorId, actions]);

    return (
        <div>
              {loading ? (
                <Spinner />
            ) : (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mb-1">
                        <h3>{directorDetail?.name}</h3>
                        <Link to={`/movie/${movieId}`}>GO BACK</Link>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-4 d-flex flex-column top-aligned">
                        <div className="card mt-2">
                            <img
                                className="card-img-top"
                                src={imageUrl}
                                alt={directorDetail?.name}
                            />
                        </div>
                    </div>

                    <div className="col-md-6 d-flex flex-column top-aligned">
                        <h2>{directorDetail?.birthday}</h2>
                        <h2>{directorDetail?.place_of_birth}</h2>
                        <h2>{directorDetail?.deathday}</h2>
                    </div>
                </div>
                <div className="col-md-12 mt-2 d-flex flex-column text-justify">
                    <p>{directorDetail?.biography}</p>
                </div>
                <div className="row">
                </div>
            </div>
            )}
        </div>
    );
};
