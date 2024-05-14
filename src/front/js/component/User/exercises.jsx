import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import ExerciseCard from "./exerciseCard.jsx";

import "../../../styles/User-styles/exercises.css";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await actions.fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          store.exerciseOptions
        );
      } else {
        exercisesData = await actions.fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          store.exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

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
