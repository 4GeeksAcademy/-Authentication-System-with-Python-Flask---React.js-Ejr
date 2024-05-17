import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/User-styles/exerciseCard.css";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <div className="card exercise-card-container">
        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
        <div className="card-body">
          <button className="primary-muscle">{exercise.bodyPart}</button>
          <button className="primary-muscle">{exercise.target}</button>
          <p className="card-text part-name">{exercise.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
