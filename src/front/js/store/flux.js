const getState = ({ getStore, getActions, setStore }) => {

	const API_URL =
    "https://emmanuelv22-opulent-spoon-j6xqpjjq7r4hjjx-3001.preview.app.github.dev/";

	return {
		store: {
			user : {}
		},
		actions: {
			login: async (email, password) => {
				
				try {
				  
				  const response = await fetch(API_URL + "/login", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json", 
					},
					body: JSON.stringify({
					  email: email,
					  password: password,
					}),
				  });
		
				  if (response.ok) {
					
					const data = await response.json();
					
					localStorage.setItem("myToken", data.access_token);
					setStore({ user: data.user });
					console.log(data.user);
					return data;
				  } else if (response.status === 401) {
					
					return false;
				  }
				} catch (err) {
				  console.log(err);
				  return false; 
				}
			  },
			  signup: async (userEmail, userPassword , Name ,phone , adress) => {
				try { 
				  const response = await fetch(API_URL + "/signup", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json", 
					},
					body: JSON.stringify({
					  email: userEmail,
					  password: userPassword,
					  name: Name,
					  phone: phone,
					  address: adress
					}),
				  });
		
				  if (response.ok) {
					console.log(response);
					console.log("Succefully created user");
					return response
				  } else if (response.status === 401) {
					
					return false;
				  }
				} catch (err) {
				  console.log(err);
				  return false; 
				}
			  },
			  
			  logout: () => {
				let token = localStorage.getItem("myToken");
				return token != null ? true : false;
			  },
			
		}
	};
};

export default getState;
