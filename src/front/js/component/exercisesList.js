import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


export const ExercisesList = ({ routine, day }) => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [percentage, setPercentage] = useState();


  const handleChange = (e) => (e.target.checked == true ? setDone(done + 1) : setDone(done - 1));

  useEffect(() => {
    setTotal(routine.exercises.length);
  }, [routine.exercises]);

  useEffect(() => {
    // console.log(total);
  }, [total]);

  useEffect(() => {
    // console.log(done);
  }, [done]);

  useEffect(() => {
    console.log("done:", done);
    console.log("total:", total);
    if (total > 0) {
      setPercentage((done / total) * 100)
      // console.log(percentage);
    }
  }, [done]);

  useEffect(() => {
    actions.updateElementAtIndex(day - 1, percentage)
    // console.log(percentage);
    // console.log(store.porcentajes);
    
  }, [percentage]);

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
          <p className="font-bold text-white">{routine.name}</p>
        </div>
      </label>
      <ul className="bg-neutral-900 p-3 space-y-3">


        {routine.exercises.map((item, index) => {
          return (
            < label
              key={index}
              htmlFor={`option ${index}`}
              className="flex items-center cursor-pointer gap-4 rounded-lg border p-4 transition border-gray-700 bg-gradient-to-r from-neutral-800 to-neutral-900"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="myCheckbox size-4 rounded border-gray-300 bg-gray-800 ring-offset-gray-900"
                  id={`option ${index}`}
                  onChange={handleChange}
                />
                {/* {`option ${index}` == false ? setDone(done + 1) : null} */}
              </div>
              <div>
                <p className="font-medium text-white">{item.name}</p>
              </div>
            </label>
          )
        })}
      </ul >
    </>
  );
};
