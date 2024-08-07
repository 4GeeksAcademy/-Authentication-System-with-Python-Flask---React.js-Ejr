import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            allWeeklyRoutineList: [],
            oneWeeklyRoutine: {},
            allDayRoutineList: [],
            oneDayRoutine: {},
            allDayRoutineDateList: [],
            oneDayRoutineDate: {},
            allExerciseList: [],
            oneExercise: {},
            allExerciseDayRoutineList: [],
            allExerciseDayRoutineOneDayList: [],
            allCategoryList: [],
            oneCategory: {},


        },
        actions: {
            // Use getActions to call a function within a fuction

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },

            // GET ALL WeeklyRoutine / TRAER TODAS RUTINA SEMANA
            allWeeklyRoutine: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/weekly-routine");

                    if (resp.status = 200) {
                        setStore({ allWeeklyRoutineList: resp.data })
                        console.log(getStore().allWeeklyRoutineList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // GET ONE WeeklyRoutine / TRAER UNA RUTINA SEMANA
            oneWeeklyRoutine: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/weekly-routine/${id}`);

                    if (resp.status = 200) {
                        setStore({ oneWeeklyRoutine: resp.data })
                        console.log(getStore().oneWeeklyRoutine);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // GET ALL DayRoutine / TRAER TODAS RUTINA DIA
            allDayRoutine: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/day-routine");

                    if (resp.status = 200) {
                        setStore({ allDayRoutineList: resp.data })
                        console.log(getStore().allDayRoutineList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // GET ONE DayRoutine / TRAER UNA RUTINA DIA
            oneDayRoutine: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/day-routine/${id}`);

                    if (resp.status = 200) {
                        setStore({ oneDayRoutine: resp.data })
                        console.log(getStore().oneDayRoutine);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // # GET ALL DayRoutineDate / TRAER TODAS FECHA RUTINA DIA
            allDayRoutineDate: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/day-routine-date");

                    if (resp.status = 200) {
                        setStore({ allDayRoutineDateList: resp.data })
                        console.log(getStore().allDayRoutineDateList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // # GET ONE DayRoutineDate / TRAER UNA FECHA RUTINA DIA
            oneDayRoutineDate: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/day-routine-date/${id}`);

                    if (resp.status = 200) {
                        setStore({ oneDayRoutineDate: resp.data })
                        console.log(getStore().oneDayRoutineDate);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // # GET ALL EXERCIE / TRAER TODOS EJERCICIO
            allExercise: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/exercise");

                    if (resp.status = 200) {
                        setStore({ allExerciseList: resp.data })
                        console.log(getStore().allExerciseList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // GET ONE EXERCIE / TRAER UN EJERCICIO
            oneExercise: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/exercise/${id}`);

                    if (resp.status = 200) {
                        setStore({ oneExercise: resp.data })
                        console.log(getStore().oneExercise);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // GET ALL ExerciseDayRoutine / TRAER TODAS RUTINA DIA EJERCICIO
            allExerciseDayRoutine: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/exercise-day-routine");

                    if (resp.status = 200) {
                        setStore({ allExerciseDayRoutineList: resp.data })
                        console.log(getStore().allExerciseDayRoutineList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            //GET ALL ExerciseDayRoutine BY DAY / TRAER TODAS RUTINA DIA EJERCICIO DE UN DIA
            allExerciseDayRoutineOneDay: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/exercise-day-routine/${id}`);

                    if (resp.status = 200) {
                        setStore({ allExerciseDayRoutineOneDayList: resp.data })
                        console.log(getStore().allExerciseDayRoutineOneDayList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
            // GET ALL Category / TRAER TODAS CATEGORIA
            allCategory: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/category");
                    if (resp.status = 200) {
                        setStore({ allCategoryList: resp.data })
                        console.log(getStore().allCategoryList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response);
                    return false;
                }
            },
            // GET ONE CATEGORY / TRAER UNA CATEGORIA
            oneCategory: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/category/${id}`);

                    if (resp.status = 200) {
                        setStore({ oneCategory: resp.data })
                        console.log(getStore().oneCategory);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error.response.data);
                    return false;
                }
            },
        }
    };
};

export default getState;