const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isStaff: false,
			isAuthenticated: false,
		},
		actions: {
			
			fetchSignup: async(email,password)=>{
				fetch(process.env.BACKEND_URL+"/api/signup", {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify({
					  email: email,
					  password: password
					})
				  })
					.then(response => response.json())
					.then(data => console.log(data))
					// .catch(error => console.log(error,"este error viene del flux"));
			},
			
			 fetchLogin : (email,password)=>{
				const store = getStore();

				fetch(process.env.BACKEND_URL+"/api/login", {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify({
					  email: email,
					  password: password
					})
				  })
					.then(response => response.json())
					.then(data => {
						console.log(data.access_token);
						localStorage.setItem("token",data.access_token)
						setStore({ isAuthenticated : true})
					}
						)
					.catch(error => console.error(error));
			}
		
		}
	};
};

export default getState;
