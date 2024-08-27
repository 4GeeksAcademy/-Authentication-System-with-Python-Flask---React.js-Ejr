const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//list of games, user
			games:[],//list because there will be multiple games per user
			user:{}//object because there is just one user
		},
		actions: {
			//these are the functions that determine what happens on the USER'S end
			login: async() => {

			},
			signup: async() => {

			},
			getUser: async() => {
				//this is going to cnnect with the PATCH method
				let options = {
					headers: {
						"Content-Type": "application/json", //telling the server what type of data/request we're going to be sending
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}}
				let response = await fetch(process.env.BACKEND_URL + "api/user", options) 
				if (response.status !== 200){
					console.log("An Error Occurred While Trying to Get the User", response.status)
					return false
				} 
				let data = await response.json()  //will get the data out of the response
				setStore({user:data})
				return true
			},
			editUser: async(newUserInfo) => {
				//this is going to cnnect with the PATCH method
				let options = {
					method: 'PATCH',
					headers: {
						"Content-Type": "application/json", //telling the server what type of data/request we're going to be sending
						Authorization: "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify({
						name:newUserInfo.name,
						email:newUserInfo.email,
						password:newUserInfo.password
					})}
				let response = await fetch(process.env.BACKEND_URL + "api/edit-user", options) 
				if (response.status !== 200){
					console.log("An Error Occurred While Trying to Edit the User", response.status)
					return false
				} 
				let data = await response.json()  //will get the data out of the response
				setStore({user:data})
				return true
			},
			addFavorites: async(newGameId) => {
				let options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json", //telling the server what type of data/request we're going to be sending
						Authorization: "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify({
						game_id:newGameId
					})}
				let response = await fetch(process.env.BACKEND_URL + "api/favorites", options) 
				if (response.status !== 200){
					console.log("An Error Occurred While Trying to Favorite a Game", response.status)
					return false
				} 
				let data = await response.json()  //will get the data out of the response
				console.log(data)
				getActions().getUser() //this refreshes the user after we add a favorite
				return true
			},
			deleteFavorites: async(favoriteId) => {
				//This will communicate with the delete_favorite function from the backend to make a request to delete favorite from the Database as well.
				let options = {
					method: 'DELETE',
					headers: {
						"Content-Type": "application/json", //telling the server what type of data/request we're going to be sending
						Authorization: "Bearer " + sessionStorage.getItem("token")
					},
					body: JSON.stringify({
						favorite_id:favoriteId
					})}
				let response = await fetch(process.env.BACKEND_URL + "api/favorite_delete", options) 
				if (response.status !== 204){
					console.log("An Error Occurred While Trying to Delete a Favorite Game", response.status)
					return false
				} 
				getActions().getUser() //this refreshes the user after we add a favorite and will execute if IF statement on 86 isn't true
				return true
			},
			getGames: () => {

			},
			//we make them async because we need to wait for a response for it to know what to do
			//wait until you get the response and then bring it back
		}
	};
};

export default getState;
