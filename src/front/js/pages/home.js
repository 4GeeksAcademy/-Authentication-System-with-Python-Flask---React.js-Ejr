import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Home = () => {
  const { store, actions } = useContext(Context);

  // Obtener datos de la película desde el store
  const { title, overview, poster_path, release_date } = store.movie|| {};

  const handleGetMovie = () => {
	console.log(poster_path)
	actions.getMovie()

  }

  return (
    <div className="text-center mt-5">
	  <Card title={title} overview={overview} poster_path={poster_path} release_date={release_date} />
      <button onClick={() => handleGetMovie()}>Get movie</button>
    </div>
  );
};