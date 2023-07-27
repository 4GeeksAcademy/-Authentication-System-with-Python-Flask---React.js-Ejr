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
      staticCars: [
        { car_name: "Car 1" },
        { car_name: "Car 2" },
        { car_name: "Car 3" },
      ],
      token: null,
      filters: [
        {
          brand: "",
          car_name: "",
          car_type: "",
          engine: "",
          transmission: "",
          year: "",
        },
      ],
      singleCar: [],
      errorMessage: null,
      compareCars: []
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
            console.log("These are stored cars in database:", data);
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
          if (!response.ok) {
            // Handle error if the response is not successful (optional)
            throw new Error("Network response was not ok");
          }
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
            setStore({ token: data.token });
            console.log(data.token);

            // Save the token to localStorage for persistent access
            localStorage.setItem("token", data.token);

            // Reset the error message (if any) after successful login
            setStore({ errorMessage: null });

            // Redirect to the desired page or perform any necessary action
            // Example: history.push("/dashboard");
          } else {
            // Login failed
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          console.log("Error during login", error);
          throw error;
        }
      },
      addCarToCompare: (car) => {
        let compareCars = getStore().compareCars;
        compareCars.push(car);
        setStore({ compareCars: compareCars });
        console.log("compareCars value: ", compareCars);
      },

      deleteCarToCompare: (car) => {
        let compareCars = getStore().compareCars;
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
            console.log("Response from PRIVATE GET: ",data);
            setStore({saved : data.saved});
            console.log("SAVED FOR CURRENT USER", store.saved)
          })
          .catch((error) => console.log(error));
          getActions().getAllCars();
          getActions().getAllUsers();
        } else null
      }
    }
  };
};
export default getState;
