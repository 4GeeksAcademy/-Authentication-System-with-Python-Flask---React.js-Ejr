import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Progress } from "./progress";
import { MinusIcon } from "./icons";

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
      console.log(weeklyRoutine.routine.id);
      console.log(exerciseId);
      setDone(done + 1)
      await actions.oneExerciseRoutine(weeklyRoutine.routine.id, exerciseId);
      const exerciseRoutine = await store.oneExerciseRoutine;
      console.log(weeklyRoutine.id);
      console.log(exerciseRoutine);

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
  }, [done, total])
  console.log(weeklyRoutine?.routine.exercises[0])

  return (
    <>
      <div className="flex w-full gap-6">
        <div className="mx-auto w-[80%] flex flex-col gap-4">
          <p className="font-bold text-lg md:text-xl text-white text-center">{weeklyRoutine.routine.name.toUpperCase()} | {weeklyRoutine.day}</p>
          <div className="flex">
            <div className="w-1/2 space-y-3 rounded-lg h-96 overflow-y-scroll pr-4">
              {weeklyRoutine?.routine.exercises.map((item, index) => {

                return (
                  < label
                    key={index}
                    htmlFor={`option ${index}`}
                    className="flex items-center cursor-pointer gap-4 rounded-lg border p-4 transition border-emerald-700 bg-neutral-700 "
                  >
                    <div className="flex items-center">
                      <input
                        disabled={currentDay !== day}
                        type="checkbox"
                        defaultChecked={item.exercise.done}
                        className="myCheckbox size-4 rounded border-emerald-300 bg-gray-800 ring-offset-emerald-900"
                        id={`option ${index}`}
                        name="name"
                        onChange={(e) => {
                          item.exercise.done = !item.exercise.done
                          handleChange(item.exercise.done, item.exercise.id)
                        }}
                      />
                      {/* {`option ${index}` == false ? setDone(done + 1) : null} */}
                    </div>
                    <div className="flex gap-3">
                      <p className="font-medium text-white">{item.exercise.name}</p>
                      <MinusIcon />
                      <span className="font-medium text-neutral-400">{item?.sets.sets} / {item?.sets.repetitions}</span>
                    </div>
                  </label>
                )
              })}
            </div >
            <div className="w-1/2 flex flex-col justify-center">
              <Progress percentage={percentage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};