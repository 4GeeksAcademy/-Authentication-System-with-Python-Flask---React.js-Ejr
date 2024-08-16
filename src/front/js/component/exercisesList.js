import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


export const ExercisesList = ({ weeklyRoutine, day }) => {
  const { store, actions } = useContext(Context);
  // const [isChecked, setIsChecked] = useState(null);
  const [exercise, setExercise] = useState({});
  // const [percentage, setPercentage] = useState();

  const handleChange = async (e, excersice) => {
    if (e.target.checked == true) {
      await actions.oneExerciseRoutine(weeklyRoutine.routine.id, excersice);
      const excersiceRoutine = await store.oneExerciseRoutine;
      await actions.postFollowUp(weeklyRoutine.id, excersiceRoutine.id)
    }
    if (e.target.checked == false) {
      await actions.oneExerciseRoutine(weeklyRoutine.routine.id, excersice);
      const excersiceRoutine = await store.oneExerciseRoutine;
      await actions.deleteFollowUp(weeklyRoutine.id, excersiceRoutine.id)
    }
  }

  useEffect(() => {
    console.log(exercise);
    // actions.oneExerciseRoutine(weeklyRoutine.routine.id, exercise.exercise.id);
  }, [exercise]);

  // useEffect(() => {
  //   setTotal(weeklyRoutine.routine.exercises.length);
  // }, [weeklyRoutine.routine.exercises]);

  // useEffect(() => {
  //   // console.log(total);
  // }, [total]);

  // useEffect(() => {
  //   // console.log(done);
  // }, [done]);

  // useEffect(() => {
  //   console.log("done:", done);
  //   console.log("total:", total);
  //   if (total > 0) {
  //     setPercentage((done / total) * 100)
  //     // console.log(percentage);
  //   }
  // }, [done]);

  // useEffect(() => {
  //   actions.updateElementAtIndex(day - 1, percentage)
  //   // console.log(percentage);
  //   // console.log(store.porcentajes);

  // }, [percentage]);

  return (
    <>
      <label
        htmlFor='exerciseDay'
        className="flex flex-row-reverse justify-between items-center cursor-pointer gap-4 p-4"
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            className="size-4 text-green-600 bg-gray-100 border-gray-300 rounded ring-offset-gray-800 focus:ring-2border-gray-600"
            id='exerciseDay'
          // value={item.i}
          />
        </div>
        <div>
          <p className="font-bold text-white">{weeklyRoutine.day}</p>
        </div>
      </label>
      <ul className="bg-neutral-900 p-3 space-y-3">

        {weeklyRoutine.routine.exercises.map((item, index) => {

          return (
            < label
              key={index}
              htmlFor={`option ${index}`}
              className="flex items-center cursor-pointer gap-4 rounded-lg border p-4 transition border-gray-700 bg-gradient-to-r from-neutral-800 to-neutral-900"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.exercise.done}
                  className="myCheckbox size-4 rounded border-gray-300 bg-gray-800 ring-offset-gray-900"
                  id={`option ${index}`}
                  name="name"
                  onChange={(e) => {
                    item.exercise.done = !item.exercise.done
                    handleChange(e, item.exercise.id)
                  }}
                />
                {/* {`option ${index}` == false ? setDone(done + 1) : null} */}
              </div>
              <div>
                <p className="font-medium text-white">{item.exercise.name}</p>
              </div>
            </label>
          )
        })}
      </ul >
    </>
  );
};