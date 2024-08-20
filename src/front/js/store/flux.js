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
			blogs: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Nueva accion para obtener datos del bebe
			fetchBabyData: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/one_baby/1"); // Ejemplo: obtener datos del bebé con id=1
                    const data = await resp.json();
                    if (data && data.bebe) {
                        setStore({ babyData: data.bebe });
                    }
                } catch (error) {
                    console.log("Error fetching baby data", error);
                }
            },

			// Actualizar los datos del bebé
            updateBabyData: async (updatedData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/edit_baby/1`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedData),
                    });
                    if (response.ok) {
                        setStore({ babyData: updatedData });
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
