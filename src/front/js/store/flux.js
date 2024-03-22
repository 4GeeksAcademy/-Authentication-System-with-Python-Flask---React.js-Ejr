const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			token: sessionStorage.getItem('token'),
			user: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// start of user related fetch request
			signUp: async (form, navigate) => {
				const url = `${process.env.BACKEND_URL}/api/signup`;
				try {
					const response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(form)
					});
					if (!response.ok) {
						const errorDetails = await response.text();
						throw new Error(`Signup failed: ${errorDetails}`);
					}
					navigate('/login');
				} catch (error) {
					console.error("Signup error:", error);
				}
			},
			login: async (form, navigate) => {
				const url = `${process.env.BACKEND_URL}/api/login`;
				try {
					const response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(form)
					});
					if (!response.ok) {
						const errorDetails = await response.text();
						throw new Error(`Login failed: ${errorDetails}`);
					}
					const data = await response.json();
					sessionStorage.setItem("token", data.access_token);
					setStore(prevState => ({ ...prevState, user: data.user, token: data.access_token }));
					navigate('/profile');
				} catch (error) {
					console.error("Login error:", error);
				}
			},
			
			authenticateUser: async () => {
                const store = getStore();
                if (!store.token) return; // No token, no authentication
                const url =`${process.env.BACKEND_URL}/api/private`;
                try {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + store.token,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) throw new Error("Authentication failed");

                    const data = await response.json();
                    setStore({ user: data.user });
                } catch (error) {
                    console.error("Authentication error:", error);
                    setStore({ user: null }); // Clear user info on authentication failure
                }
            },
			
			tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
				if (token && token!= null && token!=undefined) setStore({token: token});
			},
			logout: (navigate) => {			
				setStore({user:null});
				sessionStorage.removeItem("token");
				setStore({token: null});
			},
		}	
			
	};
};

export default getState;