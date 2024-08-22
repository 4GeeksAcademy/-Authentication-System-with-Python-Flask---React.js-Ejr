import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";

import { Exercise } from "../component/exercise.js";

export const Exercises = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.allExercise()
        actions.category()
    }, [])
    useEffect(() => {

    }, [store.allCategoryList])
    return (
        <>
            <div className="min-h-[600px]">
                <div>
                    {store.allCategoryList.map((item, index) => {

                        return <button key={index} type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95">
                            {item}
                        </button>
                    })}
                    <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95">
                        TODOS
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    {store.allExerciseList.map((item, index) => {
                        console.log(item);
                        return <Exercise key={index} exercise={item} />
                    })}
                </div>
            </div>
        </>
    );
};