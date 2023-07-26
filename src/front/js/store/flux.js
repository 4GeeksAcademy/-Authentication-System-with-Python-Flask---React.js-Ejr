const getState = ({ getStore, getActions, setStore }) => {
  const API_URL =
    "https://valentinfrar-laughing-space-cod-qrqp6777v9xc4wwj-3001.preview.app.github.dev";
  return {
    store: {
      user: {},
      business_user: [],
      trip: [],
      review: [],
      offers: [],
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
            console.log(data);
            console.log(response);
            console.log("Todo perfecto");
            return response;
          } else response.status === 401;
          // Gérer l'erreur de connexion non autorisée
          return false;
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
        }
      },
      signupBusiness: async (businessEmail, businessPassword) => {
        try {
          const response = await fetch(API_URL + "/api/signup/business_user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: businessEmail,
              password: businessPassword,
            }),
          });

          if (response.ok) {
            console.log(response);
            console.log("Todo perfecto");
            return response;
          } else if (response.status === 401) {
            // Gérer l'erreur de connexion non autorisée
            return false;
          } else {
            // Gérer d'autres erreurs
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
        }
      },

      login: async (userEmail, userPassword) => {
        console.log(userEmail, userPassword);
        try {
          // let myToken = localStorage.getItem("myToken");
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
            localStorage.setItem("myToken", data.access_token);
            setStore({ user: data.user });
            console.log(data);
            return data;
          } else if (response.status === 401) {
            // Gérer l'erreur de connexion non autorisée
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
        }
      },
      isAuth: async () => {
        try {
          let token = localStorage.getItem("myToken");
          const settings = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + token,
            },
          };

          const request = await fetch(API_URL + "/private", settings);
          const json = await request.json();
          const data = json;
          setStore({ user: data.user });
        } catch (error) {
          console.log("No se pudo cargar: ", error);
        }
      },
      logout: () => {
        let token = localStorage.getItem("myToken");
        return token != null ? true : false;
      },

      // get fetch  for all users
      getAllUsers : async () => {
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

      getUserById : async (userId) => {
        try {
          const response = await fetch(API_URL + `/users/${userId}`, {
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

      getAllBusinessUsers : async () => {
        try {
          const response = await fetch(API_URL + "/business_users", {
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

      getBusinessUserById :async (businessUserId) => {
        try {
          const response = await fetch(API_URL + `/business_users/${businessUserId}`, {
            method: "GET",
          });
      
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
      
      // get fetch for all offers that are created

      getAllOffers : async () => {
        try {
          const response = await fetch(API_URL + "/offer", {
            method: "GET",
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData.offers;
          } else {
            // Handle other errors
            console.log("Error in fetching offers");
            return [];
          }
        } catch (err) {
          console.log(err);
          return []; // Handle other errors, return an empty array by default
        }
      },

      // get fetch to get individual offer by id

        getOfferById : async (offerId) => {
        try {
          const response = await fetch(API_URL + `/offers/${offerId}`, {
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

      createOffer : async (data) => {
        try {
          const response = await fetch(API_URL + "/offer", {
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
            console.log("Error in creating offer");
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Handle other errors, return false by default
        }
      },

      // update an offer by id

      updateOfferById : async (offerId, data) => {
        try {
          const response = await fetch(API_URL + `/offer/${offerId}`, {
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

      deleteOfferById : async (offerId) => {
        try {
          const response = await fetch(API_URL + `/offer/${offerId}`, {
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

      getAllTrips : async () => {
        try {
          const response = await fetch(API_URL + "/trips", {
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

      getTripById : async (tripId) => {
        try {
          const response = await fetch(API_URL + `/trips/${tripId}`, {
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

      createTrip : async (data) => {
        try {
          const response = await fetch(API_URL + "/trip", {
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

      updateTripById : async (tripId, data) => {
        try {
          const response = await fetch(API_URL + `/trip/${tripId}`, {
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

      deleteTripById : async (tripId) => {
        try {
          const response = await fetch(API_URL + `/trip/${tripId}`, {
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

      deleteUserById : async (userId) => {
        try {
          const response = await fetch(API_URL + `/business_user/delete/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("myToken"),
            },
          });
      
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

      deleteBusinessUserById : async (businessUserId) => {
        try {
          const response = await fetch(API_URL + `/business_user/delete/business_users/${businessUserId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("myToken"),
            },
          });
      
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
      
    },
  };
};

export default getState;
