import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../../styles/Trainer-styles/trainer.css";

import { Context } from "../../store/appContext";
import TrainerCalendar from "../../component/Trainer/trainerCalendar.jsx";
import TrainerView from "../../component/Trainer/trainerView.jsx";
import TrainerExercise from "../../component/Trainer/trainerExercise.jsx";

export const Trainer = () => {
    const { store, actions } = useContext(Context);
// el trainer exercise tiene que ir en la vista individual del usuario dentro de la card 
    return (
        <div className="trainer-container">
            <TrainerCalendar />
            <TrainerView />
            <TrainerExercise />
        </div>
    );
};