import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store/appContext";
import Loader from "../User/loader.jsx";

import "../../../styles/User-styles/showRutine.css";

const UserRoutine = () => {
    const { store, actions } = useContext(Context);
    const [routine, setRoutine] = useState(store.routine);
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        const fetchRoutine = async () => {
            if (!store.routine) {
                await actions.fetchDataRoutine();
            }
            setRoutine(store.routine);
        };

        fetchRoutine();
    }, [store.routine]);

    if (!routine) {
        return (
            <>
                <h4>Loading routine...</h4>
                <Loader />
            </>
        );
    }

    return (
        <div className='routine-container'>
            <h2 className='routine-title'>Your Current Routine</h2>
            {weekDays.map((day) => (
                <div key={day}>
                    <h3 className='day-title'>{day}</h3>
                    <ul className='exercise-list'>
                        {routine[day] && routine[day].length > 0 ? (
                            routine[day].map((exercise, index) => (
                                <li key={index} className='exercise-list-item'>{exercise}</li>
                            ))
                        ) : (
                            <li>Rest Day</li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default UserRoutine;