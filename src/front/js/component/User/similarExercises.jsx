import React from "react";
import HorizontalScrollbar from "../User/horizontalScrollbar.jsx"
import Loader from "./loader.jsx";


const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <div >
      <h3 >
        Similar <span style={{ color: '#02b532', textTransform: 'capitalize' }}>Target Muscle</span> exercises
      </h3>
      <div >
        {targetMuscleExercises.length !== 0 ? <HorizontalScrollbar data={targetMuscleExercises} /> : <Loader />}
      </div>
      <h3 >
        Similar <span style={{ color: '#02b532', textTransform: 'capitalize' }}>Equipment</span> exercises
      </h3>
      <div >
        {equipmentExercises.length !== 0 ? <HorizontalScrollbar data={equipmentExercises} /> : <Loader />}
      </div>
    </div>);
};

export default SimilarExercises;
