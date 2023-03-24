const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isStaff: false,
			isAuthenticated: false,
			plants:[],
			master:[],
			orders:[],
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
			},
			
			addMaster: async(master)=>{
				fetch(process.env.BACKEND_URL+"/api/add/master", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name:master.name,
						phone: master.phone,
						alias: master.alias
					})
				})
				.then(response => response.json())
				.then(data => console.log(data))
				// .catch(error => console.log(error,"este error viene del flux"));
			},
			
			getOrders: async()=>{
				const store = getStore();
				fetch(process.env.BACKEND_URL+"/api/get/orders")
				.then(response => response.json())
				.then(data => {setStore({orders:data}); console.log("Fetch Success")})
			},
			
			
			
			
		}
	};
};

export default getState;
