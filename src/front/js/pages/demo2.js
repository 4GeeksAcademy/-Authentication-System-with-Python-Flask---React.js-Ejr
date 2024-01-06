import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo2 = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getMovieListFromApi2();
    }, []);

    const handleGetMovieApi = () => {
        actions.getMovieListFromApi2();
    };

    return (
        <>
        <div className="container">
            <ul className="list-group">
            {store.movies_from_api_2.map((movie, index) => (
                    <li key={index} className="list-group-item">
                        <h2>{movie.name}</h2>
                        <p>{movie.description}</p>
                        <img src={movie.poster} alt={movie.name} />
                        <p>Fecha de lanzamiento: {movie.relese_date}</p>
                    </li>
                ))} 
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
            <button onClick={()=>handleGetMovieApi()}>Click me</button>
        </div>
        <div>
                <select>
                    <option value={"funny"}>Funny</option>
                    <option value={"sad"}>Sad</option>
                </select>
                <button onClick={()=>actions.getRecommendation()}>Una peli!</button>
                {store.recommendedMovie && (
                    <div>
                        <h2>{store.recommendedMovie.name}</h2>
                        <p>{store.recommendedMovie.description}</p>
                        <img src={store.recommendedMovie.poster} alt={store.recommendedMovie.name} />
                        <p>Fecha de lanzamiento: {store.recommendedMovie.relese_date}</p>
                    </div>
                )}
        </div>
        </>
    );
};