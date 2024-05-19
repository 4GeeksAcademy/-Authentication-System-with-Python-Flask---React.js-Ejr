import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";
import TrainerExercise from "../../component/Trainer/trainerExercise.jsx";

export const Trainer = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <TrainerExercise />
        </div>
    );
};