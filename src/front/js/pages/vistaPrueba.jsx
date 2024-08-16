import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const VistaPrueba = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		// actions.allWeeklyRoutine();
		// actions.allWeeklyRoutineUser();
		// actions.oneWeeklyRoutineUser(1)
		// actions.postPhysicalInformation("190", "90");
		// actions.category();


		// actions.postWeeklyRoutine("1", "SEMANA1", "MIERCOLES")
		// actions.postRoutine("Rutina de brazo")
		// actions.postExercise("elevaciones laterales","HOMBRO","ejericio de hobro", "123")
		// actions.postFollowUp("1","1")
		// actions.allRoutine();
		// actions.oneRoutine(1);
		// actions.allExercise();
		// actions.oneExercise(1);
		// actions.allExerciseRoutine();
		// actions.allExerciseRoutineOneDay(1);
		// actions.oneExerciseRoutine(2,1)
		// actions.allFollowUp();
		// actions.oneFollowUp(1);
		// actions.signup("juan", "juan@gmail.com", "11", "11");

		// actions.allWeeklyDayRoutine();
		// actions.allWeeklyDayRoutineOfOneWeek(1);

		// actions.login("juan@gmail.com", "1");
		// actions.validToken();

		// actions.postFollowUp(1, 1)
		actions.deleteFollowUp(1, 1)
	}, [])
	// console.log(store.allCategoryList);
	// console.log(Object.keys(store.allCategoryList));

	return (
		<div></div>
		// <div>
		// 	<h1>Hola</h1>
		// 	{store.allWeeklyDayRoutineOfOneWeekList.map((item, index) => (
		// 		<div key={index} className="w-2/3 mx-auto">
		// 			<p>{item.day_routine_id}</p>
		// 			{actions.allExerciseDayRoutineOneDay(item.day_routine_id)}
		// 			{console.log(store.allExerciseDayRoutineOneDayList)}
		// 			<p>{store.allExerciseDayRoutineOneDayList[0]}</p>

		// 		</div>
		// 	))}
		// </div>
	);
};