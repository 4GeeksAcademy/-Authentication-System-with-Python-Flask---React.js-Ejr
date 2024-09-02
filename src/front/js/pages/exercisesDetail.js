import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import BackButton from "../component/backButton";

export const ExercisesDetail = props => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        if (store.allExerciseList.length === 0) {
            actions.allExercise();
        }
        if (store.allCategoryList.length === 0) {
            actions.category();
        }
    }, [actions, store.allExerciseList.length, store.allCategoryList.length]);

    useEffect(() => {
        const fetchedExercise = store.allExerciseList.find(ex => ex.id === parseInt(id));
        if (fetchedExercise) {
            document.title = `${fetchedExercise.name} | GYMTRACK`;
        }
        setExercise(fetchedExercise);
    }, [id, store.allExerciseList]);

    if (!exercise) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-11/12 md:w-2/3 bg-white rounded-lg shadow dark:bg-neutral-800 p-4 md:p-6 mx-auto min-h-[60vh] flex flex-col relative">
            <div className="absolute left-0 -top-[6px]">
                <BackButton />
            </div>



            {/* form title */}
            <span className="relative flex justify-center w-full sm:w-3/4 mx-auto">
                <div
                    className="absolute inset-x-0 top-1/2 h-px -translate-y-3/4 bg-red bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
                ></div>
                <span className="relative z-10 text-white font-bold px-2 sm:px-6 bg-neutral-800 sm:text-xl">{exercise.name}</span>
            </span>

            <div className="flex h-full w-11/12 md:w-full  m-auto justify-center flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 flex items-center justify-center" >
                    <p
                        id="exercise-description"
                        className="text-neutral-50 text-pretty"
                        dangerouslySetInnerHTML={{ __html: exercise.description }}
                    /></div>
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div className="w-96 h-96 bg-white rounded border-emerald-500 border" style={{ filter: "drop-shadow(2px 2px 10px rgba(16, 185, 129, 0.3))" }}>
                        <img className={`object-scale-down rounded w-full h-full ${exercise.image ? ' p-4' : 'scale-105'
                            }`} src={
                                exercise.image
                                    ? exercise.image
                                    : "https://placehold.jp/303031/878787/384x384.png?text=No%20disponible"
                            } alt={exercise.name} />
                    </div>
                </div>

            </div>

        </div >
    );
};

ExercisesDetail.propTypes = {
    match: PropTypes.object
};
