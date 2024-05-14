const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			login: async (mail, password) => {
				
				try {
					const response=await fetch(process.env.BACKEND_URL+"/api/login",{
						method:"POST",
						body:JSON.stringify({
							mail:mail,
							password:password
						}),
						headers:{"Content-Type":"application/json"}
					})
					const data=await response.json()
					console.log(data)
				} catch (error) {
					console.error(error)
				}  
			},
		}
	};
};

export default getState;
