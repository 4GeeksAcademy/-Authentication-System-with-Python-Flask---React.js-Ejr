const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
		users: [],
		movies: [],
		actors: [],
		reviews: [],
	  },
	  actions: {
		// Use getActions to call a function within a fuction
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
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
		},
  
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
  
		signup: async (email, username, name, age, password) => {
		  try {
			// Check if age is between 18 and 100
			if (age < 18 || age > 100) {
			  throw new Error("Age must be between 18 and 100");
			}
  
			let datos = {
			  email: email,
			  username: username,
			  name: name,
			  age: age,
			  password: password,
			};
  
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/signup", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(datos),
			});
			const data = await resp.json();
			setStore({ message: data.msg }); // Assuming the server responds with a 'msg' field
			// don't forget to return something, that is how the async resolves
			return true;
		  } catch (error) {
			console.log("Error signing up:", error);
			return false;
		  }
		},
  
		login: async (email, password) => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				email: email,
				password: password,
			  }),
			});
			const data = await resp.json();
  
			if (!data.token) throw new Error("No token received from server");
			localStorage.setItem("authToken", data.token);
			//store.userLoggedIn(true);
  
			setStore({ message: data.msg }); // Assuming the server responds with a 'msg' field
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error logging in:", error);
		  }
		},
  
		private: async (authToken) => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/private", {
			  method: "GET",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			  },
			});
			const data = await resp.json();
  
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error getting into the profile:", error);
		  }
		},
  
		logout: async () => {
		  try {
			// Clear the auth token from local storage
			localStorage.removeItem("authToken");
  
			// Additional cleanup or actions if needed
			// Example: setStore({ userLoggedIn: false });
  
			return { msg: "Logout successful" };
		  } catch (error) {
			console.log("Error logging out:", error);
		  }
		},
	  },
	};
  };
  
  export default getState;
  