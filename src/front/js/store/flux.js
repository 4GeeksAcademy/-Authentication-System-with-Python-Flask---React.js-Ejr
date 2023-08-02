const getState = ({ getStore, getActions, setStore }) => {
  const API_URL =
    "https://fictional-couscous-447w6jjjwp9h7q5-3001.preview.app.github.dev";

  return {
    store: {
      user: {},
      business_user: {},
      auth: false,
      trip: [],
      reviews: [],
      offers: [],
      likes: 0
    },
    actions: {
      // Use getActions to call a function within a function
      signupUser: async (data) => {
        try {
          // Utiliser la clé "myToken" au lieu de "token"
          const response = await fetch(API_URL + "/api/signup/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const res = await response.json();
            console.log(res);
            console.log("Todo perfecto");
            return response;
          }
          return false;
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
        }
      },
      signupBusiness: async (data) => {
        try {
          const response = await fetch(API_URL + "/api/signup/business_user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const res = await response.json();
            console.log(res);
            console.log("Todo perfecto");
            return response;
          } else {
            return false;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      },

      login: async (userEmail, userPassword) => {
        console.log(userEmail, userPassword);
        try {
          const response = await fetch(API_URL + "/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userEmail,
              password: userPassword,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            const store = getStore();
            setStore({ ...store, auth: true });

            if (data.type === "user") {
              setStore({ ...store, user: data.user_or_business });
            } else if (data.type === "business") {
              setStore({ ...store, business_user: data.user_or_business });
            }

            console.log("Clean data of response:", data.user_or_business);
            localStorage.setItem("myToken", data.access_token);
            return data;
          } else if (response.status === 401) {
            return false;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      },


      isAuth: async () => {
        try {
          let token = localStorage.getItem("myToken");
          console.log('isAuth token:', token);
          const settings = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };

          const request = await fetch(API_URL + "/api/private", settings);
          if (request.ok) {
            const json = await request.json();
            const data = json;
            console.log(data);
            const store = getStore();
            if (data.user){
              setStore({ ...store, user: data.user });
            } else {
              setStore({...store,  business_user: data.user_or_business});
            }
            setStore({ auth: true });
          }
        } catch (error) {
          console.log("No se pudo cargar: ", error);
        }
      },

      logout: () => {
        let token = localStorage.removeItem("myToken");
        setStore({ auth: false });
        return token != null ? true : false;
      },

      // get fetch  for all users
      getAllUsers: async () => {
        try {
          const response = await fetch(API_URL + "/users", {
            method: "GET",
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData.users;
          } else {
            // Handle other errors
            console.log("Error in fetching users");
            return [];
          }
        } catch (err) {
          console.log(err);
          return []; // Handle other errors, return an empty array by default
        }
      },

      // get fetch for individual users

      getUserById: async (userId) => {
        try {
          const response = await fetch(API_URL + `/api/users/${userId}`, {
            method: "GET",
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
          } else if (response.status === 404) {
            // Handle user not found error
            console.log("User not found");
            return null;
          } else {
            // Handle other errors
            console.log("Error in fetching user");
            return null;
          }
        } catch (err) {
          console.log(err);
          return null; // Handle other errors, return null by default
        }
      },

      // get fetch for all business users

      getAllBusinessUsers: async () => {
        try {
          const response = await fetch(API_URL + "/api/business_users", {
            method: "GET",
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData.business_users;
          } else {
            // Handle other errors
            console.log("Error in fetching business users");
            return [];
          }
        } catch (err) {
          console.log(err);
          return []; // Handle other errors, return an empty array by default
        }
      },

      // get fetch for individuals business users

      getBusinessUserById: async (businessUserId) => {
        try {
          const response = await fetch(
            API_URL + `/api/business_users/${businessUserId}`,
            {
              method: "GET",
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
          } else if (response.status === 404) {
            // Handle business user not found error
            console.log("Business user not found");
            return null;
          } else {
            // Handle other errors
            console.log("Error in fetching business user");
            return null;
          }
        } catch (err) {
          console.log(err);
        }
      },


      // Update business_user profile information

      updateBusinessUserProfile: async (userId, updatedData) => {
        try {
          const token = localStorage.getItem("myToken");
          if (!token) {
            console.log("Token not found");
            return false;
          }

          const response = await fetch(`/api/business_user/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          });

          if (response.ok) {
            const updatedBusinessUser = await response.json();

            setStore((prevStore) => ({
              ...prevStore,
              business_user: updatedBusinessUser,
            }));

            return true;
          } else {
            console.log("Failed to update user profile");
            return false;
          }
        } catch (error) {
          console.log("Fetch error after flux:", error);
          return false;
        }
      },


      // Fonction pour modifier le profil utilisateur
      updateUserProfile: async (userId, updatedData) => {
        console.log(userId, updatedData);
        try {
          const token = localStorage.getItem("myToken");
          if (!token) {
            console.log("Token not found");
            return false;
          }

          const response = await fetch(`${API_URL}/api/user/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          });

          if (response.ok) {
            const updatedUser = await response.json();

            setStore((prevStore) => ({
              ...prevStore,
              user: updatedUser,
            }));

            return true;
          } else {
            console.log("Failed to update user profile");
            return false;
          }
        } catch (error) {
          console.log("erreur fetch depuis Flux:", error);
          return false;
        }
      },

      // get fetch for all offers that are created

      getAllOffers: async () => {
        try {
          const response = await fetch(API_URL + "/api/offers", {
            method: "GET",
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            setStore({offers: responseData.offers});
            return responseData.offers;
          } else {
            // Handle other errors
            console.log("Error in fetching offers");
            return [];
          }
        } catch (err) {
          console.log(err);
          return [];
        }
      },

      // get fetch to get individual offer by id

      getOfferById: async (offerId) => {
        try {
          const response = await fetch(API_URL + `/api/offers/${offerId}`, {
            method: "GET",
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
          } else if (response.status === 404) {
            // Handle offer not found error
            console.log("Offer not found");
            return null;
          } else {
            // Handle other errors
            console.log("Error in fetching offer");
            return null;
          }
        } catch (err) {
          console.log(err);
          return null; // Handle other errors, return null by default
        }
      },

      // create an offer

      createOffer: async (formData) => {
        try {
          const token = localStorage.getItem("myToken");
          if (!token) {
            console.log("Token not found");
            return false;
          }

          const response = await fetch(API_URL + "/api/offers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });
          
          if (response.ok) {
            const res = await response.json();
            console.log(res);
            const actions = getActions();

            actions.getAllOffers();
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },


      // update an offer by id

      updateOfferById: async (offerId, data) => {
        try {
          const response = await fetch(API_URL + `/api/offer/${offerId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("myToken"),
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
          } else if (response.status === 404) {
            // Handle offer not found error
            console.log("Offer not found");
            return null;
          } else {
            // Handle other errors
            console.log("Error in updating offer");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      // delete an offer by id

      deleteOfferById: async (offerId) => {
        try {
          const response = await fetch(API_URL + `/api/offer/${offerId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("myToken"),
            },
          });

          if (response.ok) {
            console.log("Offer deleted successfully");
            return true;
          } else if (response.status === 404) {
            // Handle offer not found error
            console.log("Offer not found");
            return false;
          } else {
            // Handle other errors
            console.log("Error in deleting offer");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      // get fetch to get all trips

      getAllTrips: async () => {
        try {
          const response = await fetch(API_URL + "/api/trips", {
            method: "GET",
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData.trips;
          } else {
            // Handle other errors
            console.log("Error in fetching trips");
            return [];
          }
        } catch (err) {
          console.log(err);
          return []; // Handle other errors, return an empty array by default
        }
      },

      // get individual trip by id

      getTripById: async (tripId) => {
        try {
          const response = await fetch(API_URL + `/api/trips/${tripId}`, {
            method: "GET",
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
          } else if (response.status === 404) {
            // Handle trip not found error
            console.log("Trip not found");
            return null;
          } else {
            // Handle other errors
            console.log("Error in fetching trip");
            return null;
          }
        } catch (err) {
          console.log(err);
          return null; // Handle other errors, return null by default
        }
      },

      // create a trip

      createTrip: async (data) => {
        try {
          const response = await fetch(API_URL + "/api/trip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("myToken"),
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
          } else {
            // Handle other errors
            console.log("Error in creating trip");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      // update trip by id

      updateTripById: async (tripId, data) => {
        try {
          const response = await fetch(API_URL + `/api/trip/${tripId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("myToken"),
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
          } else if (response.status === 404) {
            // Handle trip not found error
            console.log("Trip not found");
            return null;
          } else {
            // Handle other errors
            console.log("Error in updating trip");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      // delete trip by id

      deleteTripById: async (tripId) => {
        try {
          const response = await fetch(API_URL + `/api/trip/${tripId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("myToken"),
            },
          });

          if (response.ok) {
            console.log("Trip deleted successfully");
            return true;
          } else if (response.status === 404) {
            // Handle trip not found error
            console.log("Trip not found");
            return false;
          } else {
            // Handle other errors
            console.log("Error in deleting trip");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      // delete method for user

      deleteUserById: async (userId) => {
        try {
          const response = await fetch(
            API_URL + `/api/business_user/delete/users/${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("myToken"),
              },
            }
          );

          if (response.ok) {
            console.log("User deleted successfully");
            return true;
          } else if (response.status === 404) {
            // Handle user not found error
            console.log("User not found");
            return false;
          } else {
            // Handle other errors
            console.log("Error in deleting user");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      // delete method for business_user

      deleteBusinessUserById: async (businessUserId) => {
        try {
          const response = await fetch(
            API_URL +
            `/api/business_user/delete/business_users/${businessUserId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("myToken"),
              },
            }
          );

          if (response.ok) {
            console.log("Business user deleted successfully");
            return true;
          } else if (response.status === 404) {
            // Handle business user not found error
            console.log("Business user not found");
            return false;
          } else {
            // Handle other errors
            console.log("Error in deleting business user");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      getReviews: async () => {
        try {
          const response = await fetch(API_URL + "/api/review");
          if (response.ok) {
            const data = await response.json();
            console.log("reviews:", data);
            setStore({ reviews: data });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      create_review: async (formData) => {
        try {
          const token = localStorage.getItem("myToken");
          if (!token) {
            console.log("Token not found");
            return false;
          }

          const response = await fetch(API_URL + "/api/review", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            const res = await response.json();
            console.log(res);
            const actions = getActions();

            actions.getReviews();
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },

      updateReview: async (id, updatedData) => {
        try {
          const token = localStorage.getItem("myToken");
          if (!token) {
            console.log("Token not found");
            return false;
          }

          const response = await fetch(API_URL + "/api/review/" + id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          });

          if (response.ok) {
            const updatedReview = await response.json();

            // Update the review in the store
            setStore((prevStore) => ({
              ...prevStore,
              reviews: prevStore.reviews.map((review) =>
                review.id === id ? updatedReview : review
              ),
            }));

            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      deleteReview: async (id) => {
        try {
          const token = localStorage.getItem("myToken");
          if (!token) {
            console.log("Token not found");
            return false;
          }

          const response = await fetch(API_URL + "/api/review/" + id, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            // Remove the review from the store
            setStore((prevStore) => ({
              ...prevStore,
              reviews: prevStore.reviews.filter((review) => review.id !== id),
            }));

            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },

      getLikes: async (reviewId) => {
        try {
          const response = await fetch(API_URL + `/api/reviews/${reviewId}/likes`);
          if (response.ok) {
            const data = await response.json();
            console.log('data:', data);
            setStore({likes: data})
            return true
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },

      likeReview: async (reviewId, userId) => {
        try {
          const token = localStorage.getItem("myToken");
          if (!token) {
            console.log("Token not found");
            return false;
          }

          const response = await fetch(API_URL + `/api/reviews/${reviewId}/likes`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: userId }),
          });

          if (response.ok) {
            const res = await response.json();
            console.log(res);
            setStore({likes: res.likes})
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },


    },
  };
};

export default getState;
