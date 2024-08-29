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

            token: null,
            user: null,
            user_profile: null
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            login: async (email, password) => {
                const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                if (!resp.ok) throw Error("There was a problem in the login request");

                if (resp.status === 401) {
                    throw "Invalid credentials";
                } else if (resp.status === 400) {
                    throw "Invalid email or password format";
                }
                const data = await resp.json();
                const store = getStore();
                setStore({ ...store, token: data.token, profile: data.user });
                localStorage.setItem("jwt-token", data.token);
                localStorage.setItem("profile", JSON.stringify(data.user));

                return data;
            },

            signup: async (username, email, password, partner, is_active) => {
                const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        partner: partner,
                        is_active: is_active
                    })
                });

                if (!resp.ok) throw Error("There was a problem in the signup request");

                if (resp.status === 401) {
                    throw "Invalid credentials";
                } else if (resp.status === 400) {
                    throw "Invalid email or password format";
                }
                const data = await resp.json();
                const store = getStore();
                setStore({ ...store, token: data.token });
                localStorage.setItem("jwt-token", data.token);

                return data;
            },
            setToken: (token) => {
                const store = getStore();
                setStore({ ...store, token });
            },
            setProfile: (profile) => {
                const store = getStore();
                setStore({ ...store, profile });
            },
            updateUserProfile: async (profile) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/profile", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
						},
						body: JSON.stringify(profile)
					});
			
					if (!resp.ok) {
						throw new Error("Error al guardar el perfil");
					}
			
					const data = await resp.json();
					console.log(data)
					setStore({ ...getStore(), profile: data.user }); // Actualizar el perfil en el store con los datos devueltos por el backend
					localStorage.setItem("profile", JSON.stringify(data.user));
					return true;
				} catch (error) {
					console.error("Error al actualizar el perfil:", error);
					return false;
				}
			},
			
            getUserProfile: () => {
                const store = getStore();
                fetch(process.env.BACKEND_URL + "/api/profile", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
                    }
                })
                    .then(resp => resp.json())
                    .then(data => setStore({ ...store, user_profile: data }))
                    .catch(error => console.log(error));
            },
            changePassword: async (currentPassword, newPassword) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/change-password", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.getItem("jwt-token")}`,
						},
						body: JSON.stringify({ currentPassword, newPassword }),
					});
					return resp; // Retornar la respuesta para verificarla en UserProfile.js
				} catch (error) {
					console.error("Error durante el cambio de contraseña:", error);
					throw error;
				}
			},
			logout: () => {
				localStorage.removeItem("jwt-token");
				localStorage.removeItem("profile");
				setStore({token: null, user: null, user_profile: null})
			}
        }
    };
};

export default getState;
