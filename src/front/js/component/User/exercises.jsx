import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import HorizontalScrollbar from "./horizontalScrollbar.jsx";

import "../../../styles/User-styles/exercises.css";

const Exercises = ({}) => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await actions.fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        store.exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await actions.fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/",
        store.exerciseOptions
      );
      const searchedExercises = exerciseData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <section className="exercise-container">
      <h2 className="title-exercise">Search exercises for more info</h2>
      <div className="input-container">
        <input
          className="search-input"
          value={search}
          type="text"
          placeholder="Search Exercise"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        ></input>
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="body-part-container">
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart} 
          setBodyPart={setBodyPart}
        />
      </div>
    </section>
  );
};

export default Exercises;
