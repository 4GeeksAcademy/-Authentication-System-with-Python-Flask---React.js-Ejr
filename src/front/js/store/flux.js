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
		token: null, // Initialize token in the store
		errorMessage: null // Initialize errorMessage in the store
	  },
	  actions: {
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		getMessage: async () => {
		  try {
			const resp = await fetch("https://jonio298-symmetrical-train-9vxg75vgxp6fqq7-3001.preview.app.github.dev/api/hello");
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
		  try {
			const response = await fetch("https://jonio298-symmetrical-train-9vxg75vgxp6fqq7-3001.preview.app.github.dev/login", {
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
  