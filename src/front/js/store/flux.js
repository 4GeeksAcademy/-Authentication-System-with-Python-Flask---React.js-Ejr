const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      userInfo: {},
      messages: [],
      userProperties: [],
      userPropertiesImages: [],
      full_name: "",
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessages: async () => {
        const opts = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/getmessages",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Something went wrong");
          }
          const data = await resp.json();
          // const result = [...data];
          // if (result.length > 10) {
          //   for (let i = 0; i < result.length; i += 10) {
          //     const page = arr.slice(i, i + 10);                 Para el NICE TO HAVE (pagination)
          //     result.push(page);
          //   }
          // }
          setStore({ messages: data });
          localStorage.setItem("messages", JSON.stringify(data));
          return true;
        } catch (e) {
          console.log(`${e.name}: ${e.message}`);
        }
      },
      getUserProperties: async () => {
        const opts = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/getlistings",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Something went wrong");
          }
          const data = await resp.json();
          // const result = [...data];
          // if (result.length > 10) {
          //   for (let i = 0; i < result.length; i += 10) {
          //     const page = arr.slice(i, i + 10);                 Para el NICE TO HAVE (pagination)
          //     result.push(page);
          //   }
          // }
          setStore({
            userProperties: data.inmuebles,
            userPropertiesImages: data.imagenes,
          });
          localStorage.setItem(
            "userProperties",
            JSON.stringify(data.inmuebles)
          );
          localStorage.setItem("userImages", JSON.stringify(data.imagenes));
          return true;
        } catch (e) {
          console.log(`${e.name}: ${e.message}`);
        }
      },
      login: async (username, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Error signing up");
          }
          const data = await resp.json();
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("full_name", data.user.full_name);
          localStorage.setItem("id", data.user.id);
          setStore({ token: data.access_token, userInfo: data.user });
          console.log(data.user);
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      getTokenFromStorage: () => {
        const token = localStorage.getItem("token");
        if (token && token !== "" && token !== undefined)
          setStore({ token: token });
        console.log("getting token from local storage");
      },
      logout: () => {
        localStorage.clear();
        setStore({ token: null });
        console.log("logging out");
      },
      updateUser: async (full_name, email, password) => {
        const opts = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: full_name,
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/update",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Something went wrong updating the user");
          }
          const data = await resp.json();
          if (data.message == "Updated user succesfully") {
            localStorage.setItem("full_name", data.user_info.full_name);
            localStorage.setItem("email", data.user_info.email);
            setStore({ full_name: data.user_info.full_name });
          }
          return data;
        } catch (e) {
          console.log(`${e.name}: ${e.message}`);
        }
      },
    },
  };
};

export default getState;
