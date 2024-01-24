const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		user: null
	  },
	  
	  actions: {
		signup: async (username, name, age, email, password) => {
		  try {
			const requestOptions = {
			  method: "POST",
			  headers: { 'Content-Type': 'application/json' },
			  body: JSON.stringify({ username, name, age, email, password })
			};
  
			const response = await fetch('https://sturdy-doodle-p4w9xpvqq7q39xpp-3001.app.github.dev/signup', requestOptions);
			const data = await response.json();
  
			if (!response.ok) {
			  throw new Error(`Failed to create user: ${data.message}`);
			}
  
			return data;
		  } catch (error) {
			console.error("Error during user creation", error);
			throw error;
		  }
		},
  
		login: async (email, password) => {
		  try {
			const requestOptions = {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ email, password })
			};
  
			const response = await fetch("https://sturdy-doodle-p4w9xpvqq7q39xpp-3001.app.github.dev/login", requestOptions);
  
			if (!response.ok) {
			  throw new Error(`Error during login: ${response.statusText}`);
			}
  
			const data = await response.json();
  
			localStorage.setItem("token", data.token);
			return data;
		  } catch (error) {
			console.error("Error during login", error);
			throw error;
		  }
		},
	  }
	};
  };
  
  export default getState;
  