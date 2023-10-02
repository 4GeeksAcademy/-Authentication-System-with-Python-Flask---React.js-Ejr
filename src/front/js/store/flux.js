import { redirect } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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

			token: null,
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
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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

			createAccount: (username, profileimg, email, password) => {
				var options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, profileimg: profileimg, email: email, password: password })
				}
				fetch(process.env.BACKEND_URL + 'api/register', options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong creating the account')
					})
					.then(data => {
						console.log(data)
					})
					.catch(error => {
						console.log(error)
					})
			},

			verifyIfUserLoggedIn: () => {
				const token = localStorage.getItem('token');

				if (token) setStore({ token: token });

			},

			login: (email, password) => {
				var options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password })
				}
				
				fetch(process.env.BACKEND_URL + 'api/token', options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong with the login')
					})
					.then(data => {
						localStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token });
					})
					.catch(error => {
						console.log(error)
					})
			},

			isLoggedIn: () => {
				//get the store
				const store = getStore();
			return store.token !=null
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
						if (data && data.results && data.results.lists) {
							const books = data.results.lists.map(list => list.books).flat();
							setBooks(books);
						}
					})
					.catch(error => {
						alert("ERROR: Something went wrong");
					});
			},

			getGenres: (setGenres) => {
				fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.BOOK_API_KEY}`)
					.then(response => {
						if (response.ok) return response.json();
						else throw Error('Something went wrong');
					})
					.then(data => {
						if (data && data.results) setGenres(data.results);
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
