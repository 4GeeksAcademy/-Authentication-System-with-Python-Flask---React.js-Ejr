import axios from 'axios';
import { useLocation } from 'react-router-dom';
import translations from '../utils/translations';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            auth: false,
            currentUser: '',

            allWeeklyRoutineList: [],
            allWeeklyRoutineUserList: [],
            oneWeeklyRoutineUserList: [],
            onePhysicalUserInformationList: [],
            lastOnePhysicalUserInformation: '',
            allPhysicalUserInformationList: [],
            lastPhysicalUserInformationList: [],
            allRoutineList: [],
            oneRoutine: {},
            allExerciseList: [],
            oneExercise: {},
            allExerciseRoutineList: [],
            allExerciseRoutineOneDayList: [],
            oneExerciseRoutine: {},
            allFollowUpList: [],
            allFollowUpForWeeklyRoutineList: [],
            allCategoryList: [],
            routineData: '',
            setId: '',
            completeRoutine: false,
            allSetsList: [],


            exercisesWithImages: [],
            exercisesWithoutImages: [],

        },
        actions: {
            // Use getActions to call a function within a fuction
            translateCategory: (categoryId) => {
                return translations.categories[categoryId] || translations.categories['Unknown'];
            },

            fetchExercisesWithImages: async () => {
                try {
                    // Obtener ejercicios
                    const exercisesUrl = 'https://wger.de/api/v2/exercise?language=4&limit=999';
                    const exercisesResponse = await axios.get(exercisesUrl);
                    const exercisesData = exercisesResponse.data.results.map(exercise => ({
                        id: exercise.id,
                        name: exercise.name,
                        exercise_base: exercise.exercise_base,
                        description: exercise.description,
                        category: getActions().translateCategory(exercise.category),
                    }));

                    // Obtener imágenes asociadas al exercise_base
                    const imagesUrl = 'https://wger.de/api/v2/exerciseimage/?limit=100&offset=20&language=4';
                    const imagesResponse = await axios.get(imagesUrl);
                    const imagesData = imagesResponse.data.results.reduce((acc, image) => {
                        const baseId = image.exercise_base;
                        if (!acc[baseId]) {
                            acc[baseId] = [];
                        }
                        acc[baseId].push(image.image);
                        return acc;
                    }, {});

                    // Procesar los ejercicios, agregando solo los campos requeridos
                    const processedExercises = exercisesData.map(exercise => {
                        const images = imagesData[exercise.exercise_base] || [];
                        const selectedImage = images.length > 0 ? images[0] : null;  // Seleccionar solo la primera imagen

                        return {
                            id: exercise.id,
                            name: exercise.name,
                            description: exercise.description,
                            images: selectedImage,  // Guardar solo la URL de la primera imagen
                            category: exercise.category,  // Categoría en español en mayúsculas
                        };
                    });

                    console.log("Ejercicios procesados:", processedExercises);

                    // Guardar en el store
                    setStore({
                        exercisesWithImages: processedExercises.filter(exercise => exercise.images !== null),
                        exercisesWithoutImages: processedExercises.filter(exercise => exercise.images === null),
                    });
                    return true;
                } catch (error) {
                    console.log('Error fetching exercises with images and categories:', error);
                    return false;
                }
            },


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
                    const payload = {
                        name: name,
                        birthday: birthday,
                        sex: sex,
                        email: email,
                        password: password,
                        confirm_password: confirmPassword,
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.post(process.env.BACKEND_URL + '/register', payload);

                    if (response.status === 200) {
                        console.log('Registration successful:', response.data);
                        return { success: true, data: response.data };
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log('Error response data:', error.response.data);

                        // Manejo de errores específico para la contraseña
                        const errorMessage = error.response.data.error;
                        if (errorMessage.includes("password")) {
                            if (errorMessage.includes("no blank spaces")) {
                                return { success: false, error: 'La contraseña no puede contener espacios en blanco.' };
                            } else if (errorMessage.includes("at least one number")) {
                                return { success: false, error: 'La contraseña debe contener al menos un número.' };
                            } else if (errorMessage.includes("at least one uppercase and one lowercase letter")) {
                                return { success: false, error: 'La contraseña debe tener al menos una letra mayúscula y una minúscula.' };
                            } else if (errorMessage.includes("at least one special character")) {
                                return { success: false, error: 'La contraseña debe tener al menos un carácter especial.' };
                            } else if (errorMessage.includes("must be between 6 and 12 characters long")) {
                                return { success: false, error: 'La contraseña debe tener entre 6 y 12 caracteres.' };
                            } else if (errorMessage.includes("confirm_password")) {
                                return { success: false, error: 'La contraseña y la confirmación de la contraseña deben coincidir.' };
                            }
                        }

                        return { success: false, error: errorMessage };
                    } else {
                        console.log('Error:', error);
                        return { success: false, error: 'Unexpected error' };
                    }
                }
            },
            // LOGIN / INICIO DE SESION
            login: async (email, password) => {
                try {
                    let response = await axios.post(process.env.BACKEND_URL + '/login', {
                        email: email,
                        password: password
                    });

                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.access_token);
                        setStore({ auth: response.data.logged });
                        console.log(response.data);
                        return { success: true, data: response.data };
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log('Error response data:', error.response.data);
                        return { success: false, error: error.response.data.error };
                    } else {
                        console.log('Error:', error);
                        return { success: false, error: 'Unexpected error' };
                    }
                }
            },
            // VALIDAR TOKEN
            validToken: async () => {
                let token = localStorage.getItem("token")
                try {
                    let response = await axios.get(process.env.BACKEND_URL + '/valid-token', {
                        headers: {
                            "Content-Type": "application/json",
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
            // TRAER PERFIL
            getUserProfile: async () => {
                try {
                    let token = localStorage.getItem("token")
                    // const token = getActions().getToken();
                    if (!token) throw new Error("No token found");
                    const resp = await fetch(process.env.BACKEND_URL + "/profile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (!resp.ok) {
                        throw new Error("Error fetching profile");
                    }
                    const data = await resp.json();
                    console.log(data)
                    setStore({ currentUser: data });
                    return data;
                } catch (error) {
                    console.log("Error loading user profile from backend", error);
                    setStore({ authError: error.message });
                }
            },
            // TRAER PERFIL
            // getUserProfile: async () => {
            //     try {
            //         let token = localStorage.getItem("token")
            //         let response = await axios.get(process.env.BACKEND_URL + "/profile", {
            //             headers: {
            //                 'Authorization': `Bearer ${token}`
            //             },
            //         });
            //         setStore({ currentUser: response.data });
            //         return data;

            //     } catch (error) {
            //         console.log(error);
            //         // setStore({ authError: error.message });
            //     }
            // },

            // CERRAR SESION
            logout: () => {
                localStorage.removeItem("token");
                setStore({ currentUser: null });
            },
            // ELIMINAR USUARIO
            deleteAccount: async () => {
                let token = localStorage.getItem("token")
                try {
                    let response = await axios.delete(process.env.BACKEND_URL + "/delete-account", {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (response.status == 200) {
                        console.log(response)
                        setStore({ currentUser: null });
                        return true
                    }
                }
                catch (error) {
                    console.log(error);
                    return error
                }
            },

            // PHYSICAL INFORMATION
            // GET ONE PhysicalInformation / TRAER UNA INFORMACION FISICA
            get_one_physical_user_information: async () => {
                let token = localStorage.getItem("token")
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/physical-user-information", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (resp.status == 200) {
                        setStore({ onePhysicalUserInformationList: resp.data })
                        console.log(getStore().onePhysicalUserInformationList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET LAST ONE PhysicalInformation / TRAER ULTIMA INFORMACION FISICA
            get_last_one_physical_user_information: async () => {
                let token = localStorage.getItem("token")
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/last-one-physical-user-information", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (resp.status == 200) {
                        setStore({ lastOnePhysicalUserInformation: resp.data })
                        console.log(getStore().lastOnePhysicalUserInformation);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET LAST PhysicalInformation / TRAER LAS ULTIMA INFORMACION FISICA
            get_last_physical_user_information: async () => {
                let token = localStorage.getItem("token");
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/last-physical-user-information", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    console.log(resp)

                    if (resp.status === 200) {
                        let reverseData = resp.data.reverse();
                        const storeData = getStore().lastPhysicalUserInformationList;

                        if (JSON.stringify(storeData) !== JSON.stringify(reverseData)) {
                            setStore({ lastPhysicalUserInformationList: reverseData });
                        }



                        return true;
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                }
            },
            get_all_physical_user_information: async () => {
                let token = localStorage.getItem("token")
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/physical-information", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (resp.status == 200) {
                        setStore({ allPhysicalUserInformationList: resp.data })
                        console.log(getStore().allPhysicalUserInformationList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // POST PhysicalInformation / AGREGAR INFORMACION FISICA
            postPhysicalInformation: async (height, weight) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const payload = {
                        "height": height,
                        "weight": weight,
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.post(process.env.BACKEND_URL + '/physical-information', payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status == 200) {
                        console.log('Physical Information successfully added:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },

            // WEEKLY ROUTINE
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
            // GET ALL WeeklyRoutine OF USER / TRAER TODAS RUTINA SEMANA DE USUARIO
            allWeeklyRoutineUser: async () => {

                let token = localStorage.getItem("token")
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/weekly-user-routine", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (resp.status == 200) {
                        setStore({ allWeeklyRoutineUserList: resp.data })
                        console.log(getStore().allWeeklyRoutineUserList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // GET ONE WeeklyRoutine OF USER / TRAER UNA RUTINA SEMANA DE USUARIO
            oneWeeklyRoutineUser: async (week) => {
                let token = localStorage.getItem("token")
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/weekly-user-routine/${week}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (resp.status == 200) {
                        setStore({ oneWeeklyRoutineUserList: resp.data })
                        console.log(getStore().oneWeeklyRoutineUserList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // POST WeeklyRoutine / AGREGAR RUTINA SEMANA DE USUARIO
            postWeeklyRoutine: async (routineId, day) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const payload = {
                        "routine_id": routineId,
                        "day": day
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.post(process.env.BACKEND_URL + '/weekly-routine', payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status == 200) {
                        console.log('Weekly Routine successfully added:', response.data);
                        await getActions().allWeeklyRoutineUser()
                        console.log(response.data);

                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },

            // PUT WeeklyRoutine / ACTUALIZAR RUTINA SEMANA
            putWeeklyRoutine: async (oldDay, routine_id, day) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const payload = {
                        "routine_id": routine_id,
                        "day": day
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.put(process.env.BACKEND_URL + `/weekly-user-routine/${oldDay}`, payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status == 200) {
                        console.log('Weekly Routine successfully update:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },
            // DELETE WeeklyRoutine / ELIMINAR RUTINA SEMANA
            deleteWeeklyUserRoutine: async (day) => {

                try {
                    const store = getStore()
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const resp = await axios.delete(process.env.BACKEND_URL + `/weekly-user-routine/${day}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    if (resp.status == 200) {
                        setStore({ allWeeklyRoutineUserList: store.allWeeklyRoutineUserList.filter(item => item.day != day) })
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },

            // ROUTINE
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
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // POST Routine / AGREGAR RUTINA
            postRoutine: async (name) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const payload = {
                        "name": name,
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.post(process.env.BACKEND_URL + '/routine', payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status == 200) {
                        console.log('Routine successfully added:', response.data);
                        setStore({ routineData: response.data })
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },
            // PUT Routine / ACTUALIZAR RUTINA
            putRoutine: async (id, name) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const payload = {
                        "name": name,
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.put(process.env.BACKEND_URL + `/routine/${id}`, payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status == 200) {
                        console.log('Routine successfully update:', response.data);
                        await getActions().oneRoutine(id)
                        console.log("funciona");

                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },
            // DELETE Routine / ELIMINAR RUTINA
            deleteRoutine: async (id) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const resp = await axios.delete(process.env.BACKEND_URL + `/delete-routine/${id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    if (resp.status == 200) {
                        setStore({ routineData: '' })
                        console.log(resp.data);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },

            // EXERCISE
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
            // POST Exercise / AGREGAR EJERCICIO
            postExercise: async (name, category, description, image) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const payload = {
                        "name": name,
                        "category": category,
                        "description": description,
                        "image": image,
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.post(process.env.BACKEND_URL + '/exercise', payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status == 200) {
                        console.log('Exercise successfully added:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },

            translateCategory: (categoryId) => {
                return translations.categories[categoryId] || translations.categories['Unknown'];
            },

            fetchExercisesWithImages: async () => {
                try {
                    const exercisesUrl = 'https://wger.de/api/v2/exercise?language=4&limit=999';
                    const exercisesResponse = await axios.get(exercisesUrl);
                    const exercisesData = exercisesResponse.data.results.map(exercise => ({
                        id: exercise.id,
                        name: exercise.name,
                        exercise_base: exercise.exercise_base,
                        description: exercise.description,
                        category: getActions().translateCategory(exercise.category),
                    }));

                    const imagesUrl = 'https://wger.de/api/v2/exerciseimage/';
                    const imagesResponse = await axios.get(imagesUrl);
                    const imagesData = imagesResponse.data.results.reduce((acc, image) => {
                        const baseId = image.exercise_base;
                        if (!acc[baseId]) {
                            acc[baseId] = [];
                        }
                        acc[baseId].push(image.image);
                        return acc;
                    }, {});

                    const processedExercises = exercisesData.map(exercise => {
                        const images = imagesData[exercise.exercise_base] || [];
                        const selectedImage = images.length > 0 ? images[0] : null;

                        return {
                            /*       id: exercise.id, */
                            name: exercise.name,
                            description: exercise.description,
                            images: selectedImage,
                            category: exercise.category,
                        };
                    });

                    console.log("Ejercicios procesados:", processedExercises);

                    // Guardar en el store
                    setStore({
                        exercisesWithImages: processedExercises.filter(exercise => exercise.images !== null),
                        exercisesWithoutImages: processedExercises.filter(exercise => exercise.images === null),
                    });
                    return true;
                } catch (error) {
                    console.log('Error fetching exercises with images and categories:', error);
                    return false;
                }
            },

            // PUT EXERCISE / ACTUALIZAR EJERCICIO
            putExercise: async (id, name, category, description, image) => {
                try {
                    const payload = {
                        "name": name,
                        "category": category,
                        "description": description,
                        "image": image,
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.put(process.env.BACKEND_URL + `/exercise/${id}`, payload);

                    if (response.status == 200) {
                        console.log('Exercise successfully update:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },

            // EXERCISE ROUTINE
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
            //GET ONE ExerciseRoutine / TRAER UNA RUTINA EJERCICIO
            oneExerciseRoutine: async (routine_id, exercise_id) => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + `/exercise-routine/${routine_id}/${exercise_id}`);

                    if (resp.status == 200) {
                        setStore({ oneExerciseRoutine: resp.data })
                        console.log(getStore().oneExerciseRoutine);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // POST ExerciseRoutine / AGREGAR RUTINA EJERCICIO
            postExerciseRoutine: async (routine_id, exercise_id, sets_id) => {
                try {
                    // const token = localStorage.getItem('token')
                    // if (!token) {
                    //     return ({ "error": "no token found" })
                    // }
                    const payload = {
                        "routine_id": routine_id,
                        "exercise_id": exercise_id,
                        "sets_id": sets_id
                    };
                    console.log('Sending payload:', payload);
                    let response = await axios.post(process.env.BACKEND_URL + '/exercise-routine', payload, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    console.log(response);
                    if (response.status == 200) {
                        await getActions().oneRoutine(routine_id)
                        await getActions().allWeeklyRoutineUser()
                        console.log('Exercise Routine successfully added:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },
            // DELETE ExerciseRoutine / ELIMINAR EJERCICIO DE RUTINA
            deleteExerciseRoutine: async (routine_id, exercise_id) => {
                try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                        return ({ "error": "no token found" })
                    }

                    const resp = await axios.delete(process.env.BACKEND_URL + `/exercise-routine/${routine_id}/${exercise_id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    if (resp.status == 200) {
                        await getActions().oneRoutine(routine_id)
                        await getActions().allWeeklyRoutineUser()
                        console.log(resp.data);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },

            // PUT ExerciseRoutine / ACTUALIZAR EJERCICIO DE RUTINA
            putExerciseRoutine: async (idRoutine, idExercise, routine_id, exercise_id, sets_id) => {
                try {
                    const payload = {
                        "routine_id": routine_id,
                        "exercise_id": exercise_id,
                        "sets_id": sets_id
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.put(process.env.BACKEND_URL + `/exercise-routine/${idRoutine}/${idExercise}`, payload);

                    if (response.status == 200) {
                        console.log('Exercise successfully update:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },

            // FOLLOW UP
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
            allFollowUpWeek: async (id) => {
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
            // POST FollowUp / AGREGAR SEGUIMIENTO
            postFollowUp: async (weekly_routine_id, exercise_routine_id) => {
                try {
                    const payload = {
                        "weekly_routine_id": weekly_routine_id,
                        "exercise_routine_id": exercise_routine_id
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.post(process.env.BACKEND_URL + '/follow-up', payload);
                    console.log(response);

                    if (response.status == 200) {
                        console.log('follow-up successfully added:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },
            //DELETE ExerciseRoutine / ELIMINAR UNA RUTINA EJERCICIO
            deleteFollowUp: async (weekly_routine_id, exercise_routine_id) => {
                try {
                    const resp = await axios.delete(process.env.BACKEND_URL + `/follow-up/${weekly_routine_id}/${exercise_routine_id}`);

                    if (resp.status == 200) {
                        console.log(resp.data);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // PUT FollowUp / ACTUALIZAR SEGUIMIENTO
            putFollowUp: async (weeklyRoutineId, exerciseRoutineId, oldDate, weekly_routine_id, exercise_routine_id, date) => {
                try {
                    const payload = {
                        "weekly_routine_id": weekly_routine_id,
                        "exercise_routine_id": exercise_routine_id,
                        "date": date
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.put(process.env.BACKEND_URL + `/follow-up/${weeklyRoutineId}/${exerciseRoutineId}/${oldDate}`, payload);

                    if (response.status == 200) {
                        console.log('Exercise successfully update:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },

            //CATEGORY
            // GET ALL Category / TRAER TODAS LAS CATEGORIAS
            category: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/exercises-category");
                    if (resp.status == 200) {
                        setStore({ allCategoryList: Object.keys(resp.data) })
                        console.log(getStore().allCategoryList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // SEIRES
            // GET ALL Sets / TRAER TODAS LAS SERIES
            allSets: async () => {
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/sets");
                    if (resp.status == 200) {
                        setStore({ allSetsList: resp.data })
                        console.log(getStore().allSetsList);
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            },
            // POST Sets / AGREGAR SERIES
            postSets: async (sets, repetitions) => {
                try {
                    const payload = {
                        "sets": sets,
                        "repetitions": repetitions
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.post(process.env.BACKEND_URL + '/sets', payload);

                    if (response.status == 200) {
                        setStore({ setId: response.data.id })
                        console.log('sets successfully added:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },
            // PUT Sets / ACTUALIZAR SERIES
            putSets: async (oldSets, oldRepetitions, sets, repetitions) => {
                try {
                    const payload = {
                        "sets": sets,
                        "repetitions": repetitions,
                    };
                    console.log('Sending payload:', payload);

                    let response = await axios.put(process.env.BACKEND_URL + `/sets/${oldSets}/${oldRepetitions}`, payload);

                    if (response.status == 200) {
                        console.log('Exercise successfully update:', response.data);
                        return true;
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        return error.response.data;
                    } else {
                        console.log('Error:', error);
                        return error;
                    }
                }
            },
            setCompleteRoutine: (value) => {
                setStore({ completeRoutine: value })
            },
        }
    };
};
export default getState;