const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
		},
		actions: {
			login: async (userEmail, userPassword) => {
				
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
			
		}
	};
};

export default getState;
