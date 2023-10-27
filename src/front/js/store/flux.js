

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
			books: [],
			user: null,
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

			// delete your account, option in profile settings
			deleteAccount: () => {
				const store = getStore();
				if (store.token) {
					const headers = {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`,
					};
					var options = {
						method: 'DELETE',
						headers: headers,
					};
					fetch(process.env.BACKEND_URL + `api/users`, options)
						.then(response => {
							if (response.ok) return response.json();
							else throw Error('Something went wrong deleting the account');
						})
						.then(data => {
							if (data && data.message == "User deleted successfully") {
								setStore({ token: null });
								localStorage.removeItem('token');
								window.location.replace("/");
							}
						})
						.catch(error => {
							alert(error);
						});
				}
			},

			// sign up to book swap app 
			createAccount: (username, profileimg, name, lastname, email, password) => {
				var options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, profileimg: profileimg, name: name, lastname: lastname, email: email, password: password })

				}
				fetch(process.env.BACKEND_URL + 'api/register', options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong creating the account')
					})
					.then(data => {
						if (data && data.message == "User created successfully") window.location.replace('/login')

					})
					.catch(error => {
						alert(error)
					})
			},
			//  Used in the publicProfile view, checks if user is logged in to display user data
			verifyIfUserLoggedIn: () => {
				const token = localStorage.getItem('token');
				const user = localStorage.getItem('user')
				if (token) {
					setStore({ token: token, user: JSON.parse(user) });
					return true
				}
				setStore({ token: null, user: null });
				return false

			},

			//login action, self explanatory 
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
						getActions().getUserInformation().then(data => {
							localStorage.setItem("user", JSON.stringify(data));
							setStore({ user: data })
						})
					})
					.catch(error => {
						console.log(error)
					})
			},
			// is used in the login view
			isLoggedIn: () => {
				//get the store
				const store = getStore();
				return store.token != null
			},
			// logout action, self explanatory
			logout: () => {
				localStorage.removeItem("token");
				console.log("Logged out");
				setStore({ token: null });
			},
			// action used in the component profile information, for user to update personal data 
			updateUser: (userInformation) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};
				var options = {
					method: 'PUT',
					headers: headers,
					body: JSON.stringify(userInformation)

				}
				fetch(process.env.BACKEND_URL + 'api/update_user', options)

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
			// fetch user data, used on profileSettings and publicProfile views
			getUserInformation: () => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};

				var options = {
					headers: headers,
				};

				return fetch(process.env.BACKEND_URL + 'api/user_information', options)
					.then(response => {
						if (!response.ok) {
							throw new Error('Something went wrong getting user details');
						}
						return response.json();
					})
					.then(data => {
						return data
					})
					.catch(error => {
						console.error(error);
					});
			},
			// action that it will run after the verifyIfUserLoggedIn and retrieve user data
			getUserById: (id) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};

				var options = {
					headers: headers,
				};

				return fetch(process.env.BACKEND_URL + `api/users/${id}`, options)
					.then(response => {
						if (!response.ok) {
							throw new Error('Something went wrong getting user details');
						}
						return response.json();
					})
					.then(data => {
						console.log(data);
						return data
					})
					.catch(error => {
						console.error(error);
					});
			},
			// action linked to button follow, to add friend
			friendshipRequest: (userId) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};
				var options = {
					method: 'POST',
					headers: headers,
				}
				return fetch(process.env.BACKEND_URL + `api/friend_requests/${userId}`, options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong creating the account')
					})
					.then(data => {
						console.log(data)
						return data
					})
					.catch(error => {
						console.log(error)
					})
			},
			// Retrieve friend requests from that user in profileSettings tab friendRequest
			allFriendshipRequests: () => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};
				var options = {
					method: 'GET',
					headers: headers,
				}
				return fetch(process.env.BACKEND_URL + `api/friend_requests`, options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong creating the account')
					})
					.then(data => {
						console.log(data)
						return data
					})
					.catch(error => {
						console.log(error)
					})
			},
			// used on friendRequest component, on the click button accept friend from profileSettings
			acceptFriendRequest: (requestId) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};
				const options = {
					method: 'POST',
					headers: headers,
				};

				return fetch(process.env.BACKEND_URL + `api/friend_requests/${requestId}/accept`, options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong accepting friend')
					})
					.then(data => {
						console.log(data);
						return data;
					})
					.catch(error => {
						console.log(error)
					})
			},
			// action to retrieve all friends from a user, used in the view Friends
			getFriendsList: () => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};

				const options = {
					method: 'GET',
					headers: headers,
				};

				return fetch(process.env.BACKEND_URL + 'api/friends', options)
					.then((response) => {
						if (response.ok) return response.json();
						else throw Error('Failed to fetch friends');
					})
					.then(data => {
						console.log(data);
						return data;
					})
					.catch((error) => {
						console.error(error);
					});
			},

			// delete a friend from your list
			deleteFriend: (friendship_id) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};

				const options = {
					method: 'DELETE',
					headers: headers,
				};

				return fetch(process.env.BACKEND_URL + `api/friend_list/${friendship_id}/delete`, options)
					.then((response) => {
						if (response.ok) return response.json();
						else throw Error('Something went wrong deleting the friend');
					})
					.then(data => {
						console.log(data);
						return data;
					})
					.catch((error) => {
						console.error(error);
					});
			},

			// still not used anywhere, will be in wishlist view 
			UserWishlist: (userId) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};
				const options = {
					method: 'GET',
					headers: headers,
				};
				return fetch(process.env.BACKEND_URL + `api/users/wishlist/${userId}`, options)
					.then(response => {
						if (response.ok) return response.json();
						else throw Error('Failed to fetch user\'s wishlist');
					})
					.then(data => {
						console.log(data);
						return data;
					})
					.catch(error => {
						console.log(error);
						throw error;
					});
			},
			//add to wishlist once the button is clicked on book-details view
			addToWishlist: (book_id) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};
				const options = {
					method: 'POST',
					headers: headers,
				};
				return fetch(process.env.BACKEND_URL + `api/wishlist/book/${book_id}`, options)
					.then(response => {
						if (response.ok) return response.json();
						else throw Error('Failed to fetch user\'s wishlist');
					})
					.then(data => {
						console.log(data);
						return data;
					})
					.catch(error => {
						console.log(error);
						throw error;
					});
			},
			// delete book from wishlist, will go on the view wishlist
			deleteBookWishlist: (bookId) => {
				const store = getStore();
				const token = store.token;
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				};

				const options = {
					method: 'DELETE',
					headers: headers,
				};

				return fetch(process.env.BACKEND_URL + `api/wishlist/book/${bookId}`, options)
					.then((response) => {
						if (response.ok) {
							return response.json();
						} else {
							throw Error('Something went wrong deleting the book from the wishlist');
						}
					})
					.then((data) => {
						console.log(data);
						return data;
					})
					.catch((error) => {
						console.error(error);
					});
			},


			// used to retrieve books, used in ourbooks view for search bar(genre and all), carousselhomepage
			getAllBooks: (setBooks, searchTerm = '', genre = '') => {
				fetch(process.env.BACKEND_URL + `api/books?q=${searchTerm}&genre=${genre}`)
					.then(response => {
						if (response.ok) return response.json();
						else throw Error('Something went wrong');
					})
					.then(data => {

						//const books = data.results.lists.map(list => list.books).flat();
						const books = data;
						const store = getStore()
						setStore({ books: store.books.concat(books) })
						setBooks(books);

					})
					.catch(error => {
						alert("ERROR: Something went wrong");
					});
			},
			//get books for the homepage caroussel
			getAllBooksCaroussel: (setBooks) => {
				fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.BOOK_API_KEY}`)
					.then(response => {
						if (response.ok) return response.json();
						else throw Error('Something went wrong');
					})
					.then(data => {
						if (data && data.results && data.results.lists) {
							const books = data.results.lists.map(list => list.books).flat();
							const store = getStore()
							setStore({ books: store.books.concat(books) })
							setBooks(books);
						}
					})
					.catch(error => {
						alert("ERROR: Something went wrong");
					});
			},


			// Used in the book-detail view
			getBookInformationById: (id, setBookInfo) => {
				fetch(process.env.BACKEND_URL + `api/books/${id}`)
					.then(response => {
						if (response.ok) return response.json();
						else throw Error('Something went wrong');
					})
					.then(data => {
						console.log(data)
						setBookInfo(data)
					})
					.catch(error => {
						console.log(error)
						alert("ERROR: Something went wrong");
					});
			},
			// used on the view ourbooks, for the dropdown genre
			getGenres: (setGenres) => {
				fetch(process.env.BACKEND_URL + `api/genres`)
					.then(response => {
						if (response.ok) return response.json();
						else throw Error('Something went wrong');
					})
					.then(data => {
						setGenres(data);
					})
					.catch(error => {
						alert("ERROR: Something went wrong");
					})
			},


			submitReview: (bookId, rating, opinion) => {
				const reviewData = {
					rating: rating,
					comment: opinion
				};

				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${getStore().token}`
					},
					body: JSON.stringify(reviewData)
				};

				fetch(`${process.env.BACKEND_URL}/books/${bookId}/review`, options)
					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong submitting the review')
					})
					.then(data => {
						console.log(data);  // Do something with the data, e.g., show a success message to the user.
					})
					.catch(error => {
						console.log(error);
					});
			},

			getAverageRating: (bookId, setAverageRating) => {
				fetch(`${process.env.BACKEND_URL}/books/${bookId}/average_rating`)
					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Failed to fetch average rating')
					})
					.then(data => {
						if (data && data.average_rating) setAverageRating(data.average_rating);
					})
					.catch(error => {
						console.log(error);
					});
			},

			sendForgotPasswordEmail: (email, alert) => {
				var options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email })
				}

				fetch(process.env.BACKEND_URL + 'api/sendemail', options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong')
					})
					.then(data => {
						if (data && data.msg == "success") alert("Check your inbox")
					})
					.catch(error => {
						alert("Error: Something went wrong")
					})
			},

			resetPassword: (token, password, alert) => {
				var options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ password: password })
				}

				fetch(process.env.BACKEND_URL + 'api/resetpassword', options)

					.then(response => {
						if (response.ok) return response.json()
						else throw Error('Something went wrong')
					})
					.then(data => {
						if (data && data.msg == "success") alert("Password updated successfully")
					})
					.catch(error => {
						alert("Error: Something went wrong")
					})
			}



		}
	};
};

export default getState;