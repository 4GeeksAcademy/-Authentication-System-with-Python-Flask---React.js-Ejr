import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";

import "../../../styles/User-styles/exercises.css";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const { store, actions } = useContext(Context);
  console.log(exercises);

  return (
    <div id="exercises" className="exercises-container">
      <h3 className="exercises-title">Showing Results</h3>
      <div className="exercises-result-container">
        {exercises.map((exercise, index) => (
          <p>{exercise.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
