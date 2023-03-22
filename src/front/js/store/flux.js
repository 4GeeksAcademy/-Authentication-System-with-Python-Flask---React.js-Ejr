const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isStaff: false,
			isAuthenticated: false,
			plants:[]
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
			},
			addPlants: async(plant)=>{
				fetch(process.env.BACKEND_URL+"/api/add/plant", {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name:plant.name,
						size34:plant.size34, 
						size35:plant.size35, 
						size36:plant.size36, 
						size37:plant.size37, 
						size38:plant.size38, 
						size39:plant.size39, 
						size40:plant.size40, 
						
					})
				  })
					.then(response => response.json())
					.then(data => console.log(data))
					// .catch(error => console.log(error,"este error viene del flux"));
			},

			getPlants: async()=>{
				const store = getStore();
				fetch(process.env.BACKEND_URL+"/api/get/plants")
				.then(response => response.json())
				.then(data => {setStore({plants:data});console.log(store.plants);})
			}
			


		
		}
	};
};

export default getState;
