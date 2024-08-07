import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const VistaPrueba = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		// actions.allWeeklyRoutine();
		// actions.oneWeeklyRoutine(1);
		// actions.allDayRoutine();
		// actions.oneDayRoutine(1);
		// actions.allDayRoutineDate();
		// actions.oneDayRoutineDate(1);
		// actions.allExercise();
		// actions.oneExercise(1);
		// actions.allExerciseDayRoutine();
		// actions.allExerciseDayRoutineOneDay(1);
		// actions.allCategory();
		// actions.oneCategory(1);
		// actions.signup("juan", "juan@gmail.com", "11", "11");
		actions.login("juan@gmail.com", "1");
		actions.validToken();

	}, [])
	return (
		<h1>Hola</h1>
	);


};