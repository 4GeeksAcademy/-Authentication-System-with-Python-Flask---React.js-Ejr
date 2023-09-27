const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			//user: {},
			//friendship: [],
			//wishlist: [],
			//book: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			loadAllFriends: () => {
				fetch('https://jsonplaceholder.typicode.com/users')
				.then(response => {
					if (!response.ok) {
						throw Error("Failed to fetch users");
					}
					return response.json();
				})
				.then(data => {
					setStore({ users: data });
				})
				.catch(error => {
					console.log(error);
				});
			},

			loadDataFriend: (id, setFriend) => {
				fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
					.then(response => {
						if (!response.ok) {
							throw Error("User not found");
						}
						return response.json();
					})
					.then(data => {
						setFriend(data);
					})
					.catch(error => {
						console.log(error);
					});
			},
			
			
			getAllBooks: (setBooks) => {
				fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.BOOK_API_KEY}`)
				.then(response => {
					if (response.ok) return response.json();
					else throw Error('Something went wrong');
				})
				.then(data => {
					console.log(data)
					if(data && data.results && data.results.lists) setBooks(data.results.lists);
				})
				.catch(error => {
					alert("ERROR: Something went wrong");
				})
			},

			getGenres: (setGenres) => {
				fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.BOOK_API_KEY}`)
				.then(response => {
					if (response.ok) return response.json();
					else throw Error('Something went wrong');
				})
				.then(data => {
					if(data && data.results) setGenres(data.results) ;
				})
				.catch(error => {
					alert("ERROR: Something went wrong");
				})
			},

			addWishlist: (wishlist) => {
				//get the store
				const store = getStore();
 
				//we have to loop the entire demo array to look for the respective index
				//and add new favorite
		   
				const newWishlist = [...store.wishlist, wishlist];
				
		
				//reset the global store
				setStore({ wishlist: newWishlist });
		
		   },

		   deleteWishlist: (index) => {
			   //get the store
			   const store = getStore();
	   
			   //we have to loop the entire demo array to look for the respective index
			   //and remove the favorite
			   const newWishlist = store.wishlist.filter((wishlist, i) => {
				 return index !== i;
			   });
	   
			   //reset the global store
			   setStore({ wishlist: newWishlist });
		   }
			
		}
	};
};

export default getState;
