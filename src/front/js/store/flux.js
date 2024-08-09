import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            auth: false,
            currentUser: '',

            allWeeklyRoutineList: [],
            oneWeeklyRoutine: {},
            allRoutineList: [],
            oneRoutine: {},
            allExerciseList: [],
            oneExercise: {},
            allExerciseRoutineList: [],
            allExerciseRoutineOneDayList: [],
            allFollowUpList: [],
            allFollowUpForWeeklyRoutineList: [],
        },
        actions: {
            // Use getActions to call a function within a fuction

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            // REGISTRO
            signup: async (name, birthday, sex, email, password, confirmPassword) => {
                try {
                    let response = await axios.post(process.env.BACKEND_URL + '/register', {
                        "name": name,
                        "birthday": birthday,
                        "sex": sex,
                        "email": email,
                        "password": password,
                        "confirm_password": confirmPassword,
                    })
                    if (response.status == 200) {
                        console.log(response.data);
                        return true;
                    }
                }
                catch (error) {
                    if (error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log(error);
                        return error;
                    }
                }
            },
            // LOGIN / INICIO DE SESION
            login: async (email, password) => {
                try {
                    let response = await axios.post(process.env.BACKEND_URL + '/login', {
                        'email': email,
                        'password': password
                    })
                    if (response.status == 200) {
                        localStorage.setItem('token', response.data.access_token);
                        setStore({ auth: response.data.logged })
                        console.log(response.data);
                        return true;
                    }
                }
                catch (error) {
                    if (error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    }
                    console.log(error);
                    return error;
                }
            },
            // VALIDAR TOKEN
            validToken: async () => {
                let token = localStorage.getItem("token")
                try {
                    let response = await axios.get(process.env.BACKEND_URL + '/valid-token', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    })
                    if (response.status == 200) {
                        setStore({ auth: response.data.logged })
                        console.log(getStore().auth);
                        return true;
                    }
                }
                catch (error) {
                    if (error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    }
                    console.log(error);
                    return error;
                }
            },
            // // TRAER PERFIL
            // getUserProfile: async () => {
            //     try {
            //         let token = localStorage.getItem("token")
            //         // const token = getActions().getToken();
            //         if (!token) throw new Error("No token found");
            //         const resp = await fetch(process.env.BACKEND_URL + "/profile", {
            //             method: "GET",
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 "Authorization": `Bearer ${token}`
            //             }
            //         });
            //         if (!resp.ok) {
            //             throw new Error("Error fetching profile");
            //         }
            //         const data = await resp.json();
            //         setStore({ currentUser: data });
            //         return data;
            //     } catch (error) {
            //         console.log("Error loading user profile from backend", error);
            //         setStore({ authError: error.message });
            //     }
            // },
            // TRAER PERFIL
            getUserProfile: async () => {
                try {
                    let token = localStorage.getItem("token")
                    let response = await axios.get(process.env.BACKEND_URL + "/profile", {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    setStore({ currentUser: response.data });
                    return data;

                } catch (error) {
                    console.log(error);
                    // setStore({ authError: error.message });
                }
            },
            // CERRAR SESION
            logout: () => {
                localStorage.removeItem("token");
                setStore({ currentUser: null });
            },
            // GET ALL WeeklyRoutine / TRAER TODAS RUTINA SEMANA
            allWeeklyRoutine: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/weekly-routine");

                    if (resp.status == 200) {
                        setStore({ allWeeklyRoutineList: resp.data })
                        console.log(getStore().allWeeklyRoutineList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ONE WeeklyRoutine / TRAER UNA RUTINA SEMANA
            oneWeeklyRoutine: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/weekly-routine/${id}`);

                    if (resp.status == 200) {
                        setStore({ oneWeeklyRoutine: resp.data })
                        console.log(getStore().oneWeeklyRoutine);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ALL Routine / TRAER TODAS RUTINA
            allRoutine: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/routine");

                    if (resp.status == 200) {
                        setStore({ allRoutineList: resp.data })
                        console.log(getStore().allRoutineList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ONE Routine / TRAER UNA RUTINA
            oneRoutine: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/routine/${id}`);

                    if (resp.status == 200) {
                        setStore({ oneRoutine: resp.data })
                        console.log(getStore().oneRoutine);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // // # GET ALL DayRoutineDate / TRAER TODAS FECHA RUTINA DIA
            // allDayRoutineDate: async () => {
            //     try {
            //         const resp = await axios.get(process.env.BACKEND_URL + "/day-routine-date");

            //         if (resp.status == 200) {
            //             setStore({ allDayRoutineDateList: resp.data })
            //             console.log(getStore().allDayRoutineDateList);
            //             return true;
            //         }
            //     }
            //     catch (error) {
            //         console.log(error);
            //         return false;
            //     }
            // },
            // // # GET ONE DayRoutineDate / TRAER UNA FECHA RUTINA DIA
            // oneDayRoutineDate: async (id) => {
            //     try {
            //         const resp = await axios.get(process.env.BACKEND_URL + `/day-routine-date/${id}`);

            //         if (resp.status == 200) {
            //             setStore({ oneDayRoutineDate: resp.data })
            //             console.log(getStore().oneDayRoutineDate);
            //             return true;
            //         }
            //     }
            //     catch (error) {
            //         console.log(error);
            //         return false;
            //     }
            // },
            // GET ALL WeeklyDayRoutine / TRAER TODAS RUTINA SEMANA DIA - PIVOTE
            // allWeeklyDayRoutine: async () => {
            //     try {
            //         const resp = await axios.get(process.env.BACKEND_URL + "/weekly-day-routine");

            //         if (resp.status == 200) {
            //             setStore({ allWeeklyDayRoutineList: resp.data })
            //             console.log(getStore().allWeeklyDayRoutineList);
            //             return true;
            //         }
            //     }
            //     catch (error) {
            //         console.log(error);
            //         return false;
            //     }
            // },
            // // GET WeeklyDayRoutine OF ONE WEEK / TRAER TODAS RUTINA SEMANA DIA DE UNA SEMANA- PIVOTE

            // allWeeklyDayRoutineOfOneWeek: async (id) => {
            //     try {
            //         const resp = await axios.get(process.env.BACKEND_URL + `/weekly-day-routine/${id}`);

            //         if (resp.status == 200) {
            //             setStore({ allWeeklyDayRoutineOfOneWeekList: resp.data })
            //             console.log(getStore().allWeeklyDayRoutineOfOneWeekList);
            //             return true;
            //         }
            //     }
            //     catch (error) {
            //         console.log(error);
            //         return false;
            //     }
            // },
            // # GET ALL EXERCICE / TRAER TODOS EJERCICIO
            allExercise: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/exercise");

                    if (resp.status == 200) {
                        setStore({ allExerciseList: resp.data })
                        console.log(getStore().allExerciseList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ONE EXERCICE / TRAER UN EJERCICIO
            oneExercise: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/exercise/${id}`);

                    if (resp.status == 200) {
                        setStore({ oneExercise: resp.data })
                        console.log(getStore().oneExercise);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ALL ExerciseRoutine / TRAER TODAS RUTINA EJERCICIO
            allExerciseRoutine: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/exercise-routine");

                    if (resp.status == 200) {
                        setStore({ allExerciseRoutineList: resp.data })
                        console.log(getStore().allExerciseRoutineList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            //GET ALL ExerciseRoutine ONE DAY / TRAER TODAS RUTINA EJERCICIO DE UN DIA
            allExerciseRoutineOneDay: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/exercise-routine/${id}`);

                    if (resp.status == 200) {
                        setStore({ allExerciseRoutineOneDayList: resp.data })
                        console.log(getStore().allExerciseRoutineOneDayList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ALL FollowUp / TRAER TODOS SEGUIMIENTO
            allFollowUp: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/follow-up");
                    if (resp.status == 200) {
                        setStore({ allFollowUpList: resp.data })
                        console.log(getStore().allFollowUpList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ALL FollowUp FOR weekly_routine_id / TRAER TODOS SEGUIMIENTO POR RUITNA_SEMANA_ID
            oneFollowUp: async (id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/follow-up/${id}`);

                    if (resp.status == 200) {
                        setStore({ allFollowUpForWeeklyRoutineList: resp.data })
                        console.log(getStore().allFollowUpForWeeklyRoutineList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
        }
    };
};

export default getState;