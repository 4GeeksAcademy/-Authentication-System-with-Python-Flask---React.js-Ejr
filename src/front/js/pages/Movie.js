import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/Movie.css";
import { useParams } from "react-router-dom";


export const Movie = () => {
    const { store, actions } = useContext(Context);
	const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie?.image || "/path/to/default/image"}`;
 

    useEffect(() => {
        actions.getMovieById(movieId).then(movie => {
            setMovie(movie); 
        });
    }, []);

    console.log(movie)


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5">
                    <h3>{movie?.name}</h3>
                
                    <h6>Harry Potter and the Philosopher's Stone</h6>
                </div>
                {/* <button className="mostrar-mas">Agregar a los favoritos</button> */}
            </div>

            <div className="row align-items-center">
                <div className="col-md-2">
                    <div className="card mt-1">
                        <img className="card-img-top" src={imageUrl} alt="Card image cap" />
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
                    
                    <div className="col-md-2">
                        <div className="card">
                            <img className="card-img-top" src="https://m.media-amazon.com/images/M/MV5BZmE0NzNiNzQtYTVlYS00MjljLWE4MTgtYzYxNjU2NjZkM2M4XkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg" alt="Daniel Radcliffe" />
                        </div>
                        <p class="card-title">Daniel Radcliffe</p>
                        <p class="card-detail">Harry Potter</p>
                    </div>

                    <div className="col-md-2">
                        <div className="card">
                            <img className="card-img-top" src="https://m.media-amazon.com/images/M/MV5BZmE0NzNiNzQtYTVlYS00MjljLWE4MTgtYzYxNjU2NjZkM2M4XkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg" alt="Daniel Radcliffe" />
                        </div>
                        <p class="card-title">Daniel Radcliffe</p>
                        <p class="card-detail">Harry Potter</p>
                    </div>

                    <div className="col-md-2">
                        <div className="card">
                            <img className="card-img-top" src="https://m.media-amazon.com/images/M/MV5BZmE0NzNiNzQtYTVlYS00MjljLWE4MTgtYzYxNjU2NjZkM2M4XkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg" alt="Daniel Radcliffe" />
                        </div>
                        <p class="card-title">Daniel Radcliffe</p>
                        <p class="card-detail">Harry Potter</p>
                    </div>

                    
                </div>

              



            </div>
        </div>
    );
};
