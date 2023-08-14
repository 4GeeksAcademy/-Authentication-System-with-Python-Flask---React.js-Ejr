const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      saved: [],
      cars: [],
      users: [],
      reviews: [],
      carReviews: [],
      token: null,
      tokenTimeStamp: null,
      filters: [
        {
          brand: "",
          car_name: "",
          car_type: "",
          engine: "",
          transmission: "",
          year: "",
          price: ""
        },
      ],
      singleCar: [],
      errorMessage: null,
      compareCars: [],
      isLogged: false
    },
    actions: {
      getAllUsers: () => {
        fetch(`${process.env.BACKEND_URL}/users`)
          .then((res) => res.json())
          .then((data) => {
            setStore({ users: data });
          });
      },
      getAllCars: () => {
        fetch(`${process.env.BACKEND_URL}/cars`)
          .then((res) => res.json())
          .then((data) => {
            setStore({ cars: data });
          });
      },
      applyFilters: (filterArray) => {
        setStore({ filters: filterArray });
        console.log("filters value:", filterArray);
      },
      singleCar: async (id) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/cars/${id}`,
            {
              method: "GET",
              redirect: "follow",
            }
          );
          const data = await response.json();
          setStore({ singleCar: data });
        } catch (error) {
          console.error("Error fetching singleCar data:", error);
          // Handle any error or set error state if needed
        }
      },
      setErrorMessage: (message) => {
        setStore({ errorMessage: message });
      },

      clearErrorMessage: () => {
        setStore({ errorMessage: null });
      },
      login: async (email, password) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            // Login successful
            const data = await response.json();

            // Save the authentication token to the store
            setStore({ token: data.token, tokenTimeStamp: Date.now() });
            console.log(data.token);

            // Save the token to localStorage for persistent access
            localStorage.setItem("token", data.token);

            // Reset the error message (if any) after successful login
            setStore({ errorMessage: null });            
          } else {
            // Login failed
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          console.log("Error during login", error);
          throw error;
        }
      },

      isTokenExpired: (tokenTimestamp, expirationDuration) => {
        const currentTime = Date.now();
        return currentTime - tokenTimestamp > expirationDuration;
      },

      addCarToCompare: (car) => {
        let compareCars = getStore().compareCars;
        compareCars.push(car);
        setStore({ compareCars: compareCars });
        console.log("compareCars value: ", compareCars);
      },

      deleteCarToCompare: (car) => {
        let compareCars = getStore().compareCars;
        console.log("car value parameter: ", car)
        console.log("compareCars value: ", compareCars)
        let deletedCarComparison = compareCars.filter((item) => {
          return item.id != car.id;
        });
        setStore({ compareCars: deletedCarComparison });
      },

      saveFavorites: (car) => {
        let store = getStore();
        let token = localStorage.getItem("token");
        fetch(`${process.env.BACKEND_URL}/add_saved`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            car_id: car.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const isCarSaved = store.saved.some(savedCar => savedCar.id === car.id)
            if (isCarSaved)
              return alert("Car is already saved")
            else
              store.saved.push(car);
              setStore(store);
              console.log("saved cars by users: ", store.saved)
          })
          .catch((error) => console.log(error));
      },

      deleteSaved: (carId) => {
        let store = getStore();
        let token = localStorage.getItem("token");
      
        fetch(`${process.env.BACKEND_URL}/delete_saved`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            car_id: carId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.Message === "Car successfully removed from saved list") {
              const updatedSaved = store.saved.filter((savedCar) => savedCar.car.id !== carId);
              setStore({ ...store, saved: updatedSaved });
              console.log("Saved cars by users: ", updatedSaved);
            } else {
              console.log("Error deleting saved car:", data.Message);
            }
          })
          .catch((error) => console.log(error));
      },
      

      retrieveData: () => {
        let store = getStore();
        let token = localStorage.getItem("token");
        if (token) {
        fetch(`${process.env.BACKEND_URL}/private`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }})
          .then((res) => res.json())
          .then((data) => {
            setStore({saved : data.saved});
          })
          .catch((error) => console.log(error));
          getActions().getAllCars();
          getActions().getAllUsers();
        } else null
      },
      setLoggedIn: () => {
        setStore({isLogged: true})
      },
      setLoggedOut: () => {
        setStore({isLogged: false})
      },

      createReview: async (rating, review_text, car_id) => {
        const token = localStorage.getItem("token")
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/add_review`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: rating,
            review_text: review_text,
            car_id: car_id
          })
        }
        )
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || "Error creating review")
      } catch(error) {
        console.log("Error", error.message)
    }
       

      },

      getReviews: () => {
        fetch(`${process.env.BACKEND_URL}/reviews`)
          .then((res) => res.json())
          .then((data) => {
            setStore({ reviews: data });
            console.log("These are stored reviews in database:", data);
          });
      },

      getCarReviews: (car_id) => {
        fetch(`${process.env.BACKEND_URL}/reviews/${car_id}`)
        .then((res) => res.json())
        .then((data) => {

          setStore({carReviews: data})

        })
        .catch((error) => {
          console.error("Error fetching reviews:", error.message);
        });
      }
    }
  };
};
export default getState
