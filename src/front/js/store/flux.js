import axios from 'axios';
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isStaff: false,
			isAuthenticated: false,
			plants:[],
			master:[],
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
			addPlants: async(plant,showMessage,showError) => {
				try {
					const response = await axios.post(`${process.env.BACKEND_URL}/api/add/plant`, {
						name: plant.name,
						size34: plant.size34, 
						size35: plant.size35, 
						size36: plant.size36, 
						size37: plant.size37, 
						size38: plant.size38, 
						size39: plant.size39, 
						size40: plant.size40
					});
			
					if (response.status === 200) {
						showMessage(true);
						setTimeout(()=>{
							showMessage(false)
						},4000)
							// handle success
					} 
				}
				 catch (error) {
					showError(true)
					setTimeout(()=>{showError(false)},4000)
					console.log(error);
					// handle error
				}
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
      authenticateUser: () => {
					const token = localStorage.getItem('token')
					if (token) {
						setStore({isAuthenticated:true})
					}


			addOrder : async (order,showMessage) => {
				try {
				  const response = await axios.post(`${process.env.BACKEND_URL}/api/add/order`, {
					plant: order.plant_type,
					size: order.size,
					name: order.name,
					phone: order.phone,
					delivery_date: order.delivery_date,
					price: order.price,
				  });
				  console.log(response.data);
				  if(response.status === 200){
					showMessage(true);
					setTimeout(()=>{
						showMessage(false)
					},4000)
				  }
				}
				  
				
				 catch (error) {
				  console.log(error, "este error viene del flux");
				}
			  }
		}

	}		


		
};

export default getState;
