import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Progress } from "./progress";

export const ExercisesList = ({ weeklyRoutine }) => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [day, setDay] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    setDay(weeklyRoutine.day_num)
    setCurrentDay(new Date().getDay())
  }, []);

  const handleChange = async (isDone, exerciseId) => {
    // e.persist()
    if (isDone == true) {
      setDone(done + 1)
      await actions.oneExerciseRoutine(weeklyRoutine.routine.id, exerciseId);
      const exerciseRoutine = await store.oneExerciseRoutine;
      await actions.postFollowUp(weeklyRoutine.id, exerciseRoutine.id)
    }
    if (isDone == false) {
      setDone(done - 1)
      console.log(done);
      await actions.oneExerciseRoutine(weeklyRoutine.routine.id, exerciseId);
      const exerciseRoutine = await store.oneExerciseRoutine;
      await actions.deleteFollowUp(weeklyRoutine.id, exerciseRoutine.id)
    }
  }

  useEffect(() => {
    setTotal(weeklyRoutine.routine.exercises.length);
  }, [weeklyRoutine.routine.exercises]);

  useEffect(() => {
    setDone(weeklyRoutine.routine.exercises.filter(item => item.exercise.done === true).length);
  }, [weeklyRoutine.routine.exercises]);

  useEffect(() => {
    if (total > 0) {
      setPercentage((done / total) * 100)
    }
  }, [done, total]);

  return (
    <>
      <div>
        <p className="font-bold text-white text-center">{weeklyRoutine.day}</p>
      </div>
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
                  disabled={currentDay !== day}
                  type="checkbox"
                  defaultChecked={item.exercise.done}
                  className="myCheckbox size-4 rounded border-gray-300 bg-gray-800 ring-offset-gray-900"
                  id={`option ${index}`}
                  name="name"
                  onChange={(e) => {
                    item.exercise.done = !item.exercise.done
                    handleChange(item.exercise.done, item.exercise.id)
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
      <Progress percentage={percentage} />
    </>
  );
};