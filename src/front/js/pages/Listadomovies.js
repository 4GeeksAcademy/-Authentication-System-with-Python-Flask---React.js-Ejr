import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/Listadomovies.css";


export const Listadomovies = () => {
	const { store, actions } = useContext(Context);
	const [movies, setMovies] = useState([]);


	useEffect(() => {
		actions.getMovies().then(() => {
			setMovies(store.movies);
		});
	}, []);

	console.log(movies)
	

	return (
		<div className="container">
			<div className="row">
				{movies.map((movie, i) => (
					<div className="col-md-2" key={i}>
						<div className="card mt-5">
							<div className="star-ranking">
								<i className="fa fa-star star-icon"></i>
								<span className="ranking">{movie.ranking}</span>
							</div>
							<img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt="Poster Movie" />
						</div>
						<p className="title">{movie.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};
