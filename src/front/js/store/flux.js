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
			accessToken: null,
		},
		actions: {
			signup: async (User) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(User),
					});
			
					if (!response) {
						console.error('Signup failed: Response is undefined');
						setStore({ message: 'Signup failed. Please try again.' });
						return;
					}
			
					if (response.ok) {
						try {
							const data = await response.json();
							setStore({ message: data.success });
							// Optionally, you might want to do something else with the response data
							// (e.g., update the store or trigger another action).
						} catch (jsonError) {
							console.error('Error parsing JSON response:', jsonError);
							setStore({ message: 'Signup failed. Please try again.' });
						}
					} else {
						try {
							const errorData = await response.json();
							console.error('Signup failed:', errorData);
							setStore({ message: errorData.error || 'Signup failed. Please try again.' });
						} catch (jsonError) {
							console.error('Error parsing JSON error response:', jsonError);
							setStore({ message: 'Signup failed. Please try again.' });
						}
					}
				} catch (error) {
					console.error('Error during signup:', error);
					setStore({ message: 'Signup failed. Please try again.' });
				}
			},






			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setAccessToken: (token) => {
				setStore({ accessToken: token });
			},

			getAccessToken: () => {
				const store = getStore();
				return store.accessToken;
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", {
						headers: {
						  'Authorization': `Bearer ${getActions().getAccessToken()}`,
						},
					  });
					  const data = await resp.json();
					  setStore({ message: data.message });
					return data;
				} catch (error) {
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
