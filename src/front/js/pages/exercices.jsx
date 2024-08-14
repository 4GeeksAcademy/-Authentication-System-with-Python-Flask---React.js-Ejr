import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { Exercise } from "../component/exercise.jsx";

export const Exercises = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.allExercise()
    }, [])

    return (
        <><div className="flex flex-col gap-4">
            {store.allExerciseList.map((item, index) => {
                console.log(item);
                return <Exercise key={index} exercise={item} />
            })}
        </div>
        </>
    );
};