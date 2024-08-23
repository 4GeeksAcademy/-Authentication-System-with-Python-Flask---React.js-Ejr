const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			babyData: {
                name: "",
                gender: "",
                age: "",
                height: "",
                weight: ""
            },
			blogs: [],
            userData:{
				username: "",
				email:"",
				password:""
            },
            babies: [], // Agregado para almacenar la lista de bebés
            selectedBabyId: null // Para seleccionar un bebé específico
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
            //Accion para obtener el perfil del usuario por EMAIL
			getUserProfileByEmail: async (email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/user/email/${email}`);
					if (response.ok) {
						const data = await response.json();
						return data.user;
					} else {
						const errorData = await response.json();
						console.error("Failed to fetch user profile:", errorData.msg);
						return null;
					}
				} catch (error) {
					console.error("Error fetching user profile:", error);
					return null;
				}
			},
			//Accion para obtener el perfil del usuario por ID
			getUserProfileById: async () => {
				
				try {
					//pasando el userID como paramentro
					//const response = await fetch(process.env.BACKEND_URL + `/api/user/${userId}`);
					const resp = await fetch(process.env.BACKEND_URL + "/api/user/1"); // Ejemplo: obtener datos del user id=1
					// if (response.ok) {
					// 	const data = await response.json();
					// 	return data.user;
					// } else {
					// 	const errorData = await response.json();
					// 	console.error("Failed to fetch user profile:", errorData.msg);
					// 	return null;
					// }
					const data = await resp.json();
                    if (resp.ok && data && data.user) {
                        setStore({ userData: data.user });
                    }else{
						console.error("Failed to fetch user profile:", data.msg || "Unknown error");
					}
				} catch (error) {
					console.error("Error fetching user profile:", error);
				}
			},
			//accion para reset password
			resetPassword: async (email, password) => {
				try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/reset_password", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error resetting password:", error);
                    return { success: false };
                }
            },
            // Accion para obtener la lista de bebés del usuario
            getBabiesByUserId: async () => {
                try {
                    const store = getStore();
                    //const userId = store.userData.id; // Suponiendo que userData contiene el id del usuario
                    const response = await fetch(process.env.BACKEND_URL + "api/babies/user/1");
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ babies: data.babies }); // Asumiendo que la respuesta contiene una lista de bebés
                    } else {
                        console.error("Failed to fetch babies");
                    }
                } catch (error) {
                    console.error("Error fetching babies", error);
                }
            },

			// Accion para obtener datos del bebe 
			// fetchBabyData: async () => {
            //     try {
            //         const resp = await fetch(process.env.BACKEND_URL + "api/one_baby/1"); // Ejemplo: obtener datos del bebé con id=1
            //         const data = await resp.json();
            //         if (data && data.bebe) {
            //             setStore({ babyData: data.bebe });
            //         }
            //     } catch (error) {
            //         console.log("Error fetching baby data", error);
            //     }
            // },

            // Obtener datos de un bebé específico
			fetchBabyData: async (babyId) => {
				try {
                    console.log(`Fetching data for baby with ID: ${babyId}`);
                    const response = await fetch(`${process.env.BACKEND_URL}/api/one_baby/${babyId}`);
                    const data = await response.json();
            
                    if (response.ok && data && data.bebe) {
                        console.log("Fetched baby data:", data.bebe);
                        setStore({ babyData: data.bebe, selectedBabyId: babyId });
                    } else {
                        console.error("Failed to fetch baby data or data is missing:", data);
                    }
                } catch (error) {
                    console.error("Error fetching baby data:", error);
                }
			},

			// Actualizar los datos del bebé
            updateBabyData: async (updatedData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/edit_baby/${updatedData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedData),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Baby data updated successfully:", data);
                        setStore({ babyData: data.data });
                    } else {
                        console.error("Failed to update baby data");
                    }
                } catch (error) {
                    console.error("Error updating baby data", error);
                }
            },

			// Crear Blog
			createBlog: async (blogData) => {
                const store = getStore();
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/new_blog", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(blogData)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Blog created successfully:", data);

                        setStore({
                            blogs: [...store.blogs, data.blog]
                        });

                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Failed to create blog:", errorData);
                        return false;
                    }
                } catch (error) {
                    console.error("Error:", error);
                    return false;
                }
            },

            // Crear medias
            fetchAverages: async (babyId, interval) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/report/averages/${babyId}?interval=${interval}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Averages fetched successfully:", data);
                        return data.averages;
                    } else {
                        console.error("Failed to fetch averages");
                        return null;
                    }
                } catch (error) {
                    console.error("Error fetching averages", error);
                    return null;
                }
            },

            // Crear maximos y minimos
            fetchExtremes: async (babyId, interval) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/report/extremes/${babyId}?interval=${interval}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Extremes fetched successfully:", data);
                        return data; // Retorna todo el objeto con "max" y "min"
                    } else {
                        console.error("Failed to fetch extremes");
                        return null;
                    }
                } catch (error) {
                    console.error("Error fetching extremes", error);
                    return null;
                }
            },

            // Login
            login: async (formData) => {
                try {
                    // Asegúrate de que BACKEND_URL esté definido correctamente
                const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
              
                if (!response.ok) {
                      // Manejo de errores HTTP
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
              
                const data = await response.json();
              
                    // Verifica que la respuesta tenga las propiedades necesarias
                if (data && data.token) {
                    setStore({ user: data.user, token: data.token });
                    localStorage.setItem('token', data.token);
                } else {
                    throw new Error('Invalid response data');
                }
              
                return data;
                } catch (error) {
                    console.error("Error during login:", error);
                // Opcional: podrías devolver un objeto que indique el error
                    return { success: false, msg: error.message };
                }
            },              

            // Register
			register: async (formData) => {
				try{
					// fetching data from the backend

					const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'POST',
						body: JSON.stringify(formData)

					})
					const data = await resp.json()
					setStore({ user: data.user,token: data.token })
					localStorage.setItem('token', data.token)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
            //Accion para crear un nuevo bebe
            createBaby: async (babyData) => {
                try {
                    const store = getStore();
                    const userId = store.userData.id || 1; // Usa el userId del store, o 1 por defecto
                    const response = await fetch(process.env.BACKEND_URL + `/api/babies/user/${userId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(babyData)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        // Actualiza la lista de bebés en el store
                        setStore({ babies: [...store.babies, data] });
                        console.log("Baby created successfully:", data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Failed to create baby:", errorData);
                        return false;
                    }
                } catch (error) {
                    console.error("Error creating baby:", error);
                    return false;
                }
            },
            //Accion LOGOUT
            logout: () => {
				localStorage.removeItem('token')
				setStore({user:null, token:null})
				return true
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},


			Login: async (formData) => {
				try{
					// fetching data from the backend

					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						headers: {
							'Content-type': 'application/ json'
						},
						method: 'POST',
						body: JSON.stringify(formData)

					})
					const data = await resp.json()
					setStore({ user: data.user,token: data.token })
					localStorage.setItem('token', data.token)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			register: async (formData) => {
				try{
					// fetching data from the backend

					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'POST',
						body: JSON.stringify(formData)

					})
					const data = await resp.json()
					setStore({ user: data.user,token: data.token })
					localStorage.setItem('token', data.token)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
      
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
