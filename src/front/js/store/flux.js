import axios from 'axios';
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
				.then(data => setStore({orders: data.orders}))
			},
			updateOrders: (newOrdersArr)=>{
				const store = getStore();
				setStore({orders: newOrdersArr})
			},
      		authenticateUser: () => {
					const token = localStorage.getItem('token')
					if (token) {
						setStore({isAuthenticated:true})
					}
			},
			addOrder : async (order,showMessage) => {

				try {
				  const response = await axios.post(`${process.env.BACKEND_URL}/api/add/order`, {
					plant_id: order.plant_id,
					size: order.size,
					name: order.name,
					phone: order.phone,
					delivery_date: order.delivery_date,
					price: order.price,
					master_id: order.master,
					description: order.description
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


			  },

			logOut :()=>{
				localStorage.removeItem('token');
				setStore({ isAuthenticated: false });
				console.log();	
			},
			addModel : async (model,showMessage) => {
				console.log(model);
				try {
				  const response = await axios.post(`${process.env.BACKEND_URL}/api/add/shoe`, {
				
					name: model.name,
					size_from: model.size_from,
					size_to: model.size_to,
					category: model.category,
					photo:model.photo,
				  });
				  console.log(response);
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
				  
				


			  },

			updateOrderStatus: async (orderId, status) => {
				try {
				  const response = await fetch(process.env.BACKEND_URL + `/api/update/order`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({
						"id": orderId,
						"status": status,
					}),
				  });
			  
				  if (response.ok) {
					console.log(`Order ${orderId} status updated to ${status}`);
					// You may also choose to update the store or trigger a fetch for the updated orders
				  } else {
					console.error(`Failed to update order ${orderId} status: ${response.statusText}`);
				  }
				} catch (error) {
				  console.error(`Failed to update order ${orderId} status: ${error.message}`);
				}
			  },
			  addTransaction: async (transaction,showMessage) => {
				
				try {
				  const response = await axios.post(`${process.env.BACKEND_URL}/api/add/transaction`, {
					description:transaction.description ,
					plant_id: 1,
					master_id: 1,
					size34:transaction.size34 ? transaction.size34:0,
					size35: transaction.size35 ? transaction.size35:0,
					size36: transaction.size36 ? transaction.size36:0,
					size37: transaction.size37 ? transaction.size37:0,
					size38: transaction.size38 ? transaction.size38:0,
					size39:transaction.size39 ? transaction.size39:0,
					size40: transaction.size40 ? transaction.size40:0,
					size41:0
					
				  });
				  console.log(response.status);
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
				  
				


			  },
		}

	}		

	}
		
;

export default getState;
