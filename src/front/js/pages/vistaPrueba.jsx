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
		// actions.postFollowUp(10,7)
		// actions.allRoutine();
		// actions.oneRoutine(11);
		// store.oneRoutine();
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

		// actions.allFollowUpWeek(1)
		// actions.postFollowUp(1, 1)
		// actions.deleteFollowUp(1, 1)
		// actions.get_last_physical_user_information()
		// actions.allSets()
		// actions.postSets("2", "10")
		// actions.postExerciseRoutine("4", "1", "1")
		// actions.putWeeklyRoutine("JUEVES",7,"DOMINGO")
		// actions.putRoutine(7, "Dia de Hombros")
		// actions.putExercise(6, "Remoss", "ESPALDA", "Ejercicio de Espalda", "011")
		// actions.putExerciseRoutine(7, 8, 7, 2, 1)
		// actions.putFollowUp(10, 7, "2024-06-01", 10, 7, "2022-06-01")
		// actions.putSets(1, 1, 4, 12)
		// actions.deleteWeeklyUserRoutine("DOMINGO")
		// actions.deleteRoutine(12)
		// actions.deleteExerciseRoutine(11, 1)
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