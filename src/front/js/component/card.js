import React from "react";
import "../../styles/card.css";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Card = (props) => {
  const { store, actions } = useContext(Context)
  const { title, description, imgurl, genre, id, game_id } = props
  const navigate = useNavigate()
  return (
    <div className="card bg-dark text-white" style={{ width: "15rem" }}>
      {/* onClick={() => { navigate(`/game/${id}`) }} */}
      <Link to={`/game/${id}`}>
        <img
          src={imgurl}
          className="card-img-top"
          alt="..."
        />
      </Link>
      <div className="card-body">
        <Link to={`/game/${id}`}>
          <h5 className="card-title">
            {title}
          </h5>
        </Link>
        <p className="game-genre">
          {genre}
        </p>
        <p className="card-text">
          {description}
        </p>
        {/* Render trash can if user already has it favorited */}
        
        <button onClick={() => { actions.addFavorites(game_id, store.user) }}>
          Favorite
        </button>
      </div>
    </div>
  );
};

