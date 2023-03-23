import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  let backendUrl = process.env.BACKEND_URL;
  return {
    store: {
      user: [],
    },
    actions: {
      signUp: async (name, email, password) => {
        try {
          // Make HTTP request to save user data
          const response = await axios.post(backendUrl + "/api/signup", {
            name: name,
            email: email,
            password: password,
          });

          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
      login: async (email, password) => {
        try {
          // Make HTTP request to save user data
          const response = await axios.post(backendUrl + "/api/login", {
            email: email,
            password: password,
          });

          setStore({ user: response.data.user });
          //   once we add jwt extended to the login route we will put tokeen in the local storage
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
