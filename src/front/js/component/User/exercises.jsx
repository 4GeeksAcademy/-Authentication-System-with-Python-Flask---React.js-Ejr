import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import ExerciseCard from "./exerciseCard.jsx";

import "../../../styles/User-styles/exercises.css";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const { store, actions } = useContext(Context);

  return (
    <div id="exercises" className="exercises-container">
      <h3 className="exercises-title">Showing Results</h3>
      <div className="exercises-result-container">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default Exercises;
