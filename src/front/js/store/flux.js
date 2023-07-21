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
		saved: [],
		cars: [],
		users: [],
		staticCars: [
		  { car_name: 'Car 1' },
		  { car_name: 'Car 2' },
		  { car_name: 'Car 3' },
		],
		token: null, // Initialize token in the store
		errorMessage: null // Initialize errorMessage in the store
	  },
	  actions: {
		getAllUsers: () => {
		  fetch(`${process.env.BACKEND_URL}/users`)
			.then((res) => res.json())
			.then((data) => {
			  console.log(data);
			  setStore({ users: data });
			});
		},
  
		getAllCars: () => {
		  fetch(`${process.env.BACKEND_URL}/cars`)
			.then((res) => res.json())
			.then((data) => {
			  setStore({ cars: data });
			  console.log("These are stored cars in the database:", data);
			});
		},
  
		login: async (email, password) => {
		  try {
			const response = await fetch(`${process.env.BACKEND_URL}/login`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify({ email, password })
			});
  
			if (response.ok) {
			  // Login successful
			  const data = await response.json();
  
			  // Save the authentication token to the store
			  setStore({ token: data.token });
  
			  // Reset the error message (if any) after successful login
			  setStore({ errorMessage: null });
  
			  // Redirect to the desired page or perform any necessary action
			  // Example: history.push("/dashboard");
			} else {
			  // Login failed
			  throw new Error("Invalid email or password");
			}
		  } catch (error) {
			console.log("Error during login", error);
			throw error;
		  }
		},
  
		setErrorMessage: (message) => {
		  setStore({ errorMessage: message });
		},
  
		clearErrorMessage: () => {
		  setStore({ errorMessage: null });
		}
	  }
	};
  };
  
  export default getState;
  