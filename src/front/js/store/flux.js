const getState = ({ getStore, getActions, setStore }) => {

	const localStorageOrder = JSON.parse(localStorage.getItem('order')) || {
        total: 0,
        items: []
    };

	const localStorageUser = JSON.parse(localStorage.getItem('user')) || {
        isSignedIn: true,
        username: "",
        user_id: null,
		token: null
    };

	return {
	  store: {
		order: localStorageOrder,
		user: localStorageUser
	  },

	  actions: {
		// Use getActions to call a function within a function
		fetchCoffee: async () => {
		  const response = await fetch(`https://fake-coffee-api.vercel.app/api`)
			.then((response) => {
			  if (!response.ok) {
				throw new Error("Network response was not okay");
			  }
			  return response.json();
			})
			.catch((err) => {
			  console.error(err);
			});
  
		  const coffeePerCategory = response.reduce((acc, curr) => {
			if (!acc[curr.region]) {
			  acc[curr.region] = [];
			}
  
			acc[curr.region] = [...acc[curr.region], curr];
			return acc;
		  }, {});
		  const actualStore = getStore();
		  setStore({ ...actualStore, ...coffeePerCategory });
		},
		addCoffeeToOrder: ({ name, price }) => {
			const store = getStore();
			const { order } = store;
			const updatedOrder = {
				...order,
				total: order.total + price,
				items: [...order.items, { name, price }]
			};
			setStore({ order: updatedOrder });
		
			// Update localStorage
			localStorage.setItem('order', JSON.stringify(updatedOrder));
		},
		removeCoffeeFromOrder: ({ name, price }) => {
			const store = getStore();
			const { order } = store;

			// Find the index of the coffee to remove
			const index = order.items.findIndex(item => item.name === name && item.price === price);

			if (index !== -1) {
				// Create a new array with the coffee removed
				const updatedItems = order.items.filter((item, i) => i !== index);

				// Update the order with the new items array
				const updatedOrder = {
					...order,
					total: order.total - price,
					items: updatedItems
				};

				// Update the store and localStorage
				setStore({ order: updatedOrder });
				localStorage.setItem('order', JSON.stringify(updatedOrder));
			}
		},
		login: async (username, password) => {
			const resp = await fetch(`${process.env.BACKEND_URL}api/token`, { 
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }) 
			});

			if (!resp.ok) throw Error("There was a problem in the login request");

			if (resp.status === 401) {
				throw new Error("Invalid credentials");
			} else if (resp.status === 400) {
				throw new Error("Invalid email or password format");
			}

			const data = await resp.json();
			localStorage.setItem("jwt-token", data.token);

			if (data.token) {
				const store = getStore();
				const updatedUser = {
					isSignedIn: true,
					username: data.username, // Assuming the API returns the username
					user_id: data.user_id,
					token: data.token  // Assuming the API returns the user_id
				};
				// Save user data to localStorage
				localStorage.setItem('user', JSON.stringify(updatedUser));

				setStore({
					...store,
					user: updatedUser
				});
			}

			return data;
		},
		signOut: () => {
			const defaultUser = {
				isSignedIn: false,
				username: "",
				user_id: null
			};

			// Update store
			setStore({ user: defaultUser });

			// Update localStorage
			localStorage.setItem('user', JSON.stringify(defaultUser));
			localStorage.removeItem('jwt-token');
		},
		signUp: async (username, firstName, lastName, password) => {
			const resp = await fetch(`${process.env.BACKEND_URL}api/users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ 
					username, 
					first_name: firstName, 
					last_name: lastName, 
					password 
				})
			});

			if (!resp.ok) throw Error("There was a problem in the signup request");

			const data = await resp.json();
			
			// Automatically log the user in after sign-up
			const loginResp = await getActions().login(username, password);
			
			return loginResp;
		}
	  }
	};
};

export default getState;
