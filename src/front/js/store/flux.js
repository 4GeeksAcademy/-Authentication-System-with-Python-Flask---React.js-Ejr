const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      walkerProfile: {},
      user_id: 0,
      dogs: [],
      isLogedIn: false,
      user_type: "",
      walkers: [],
    },
    actions: {
      getInfo: (url, id) => {
        fetch(url + id)
          .then((res) => res.json())
          .then((data) => {
            setStore({ user: data.results });
          })
          .catch();
      },

      getInfoProfile: (url, id) => {
        fetch(url + id)
          .then((res) => res.json())
          .then((data) => {
            setStore({ walkerProfile: data.results });
          })
          .catch();
      },

      putUpdateUser: () => {
        setStore({ user: data });
      },

      getWalkers: () => {
        fetch(process.env.BACKEND_URL + "/api/walkers")
          .then((res) => res.json())
          .then((data) => {
            setStore({ walkers: data.results });
          })
          .catch();
      },
      setUserId: (user_id) => {
        console.log(user_id);
        setStore({ user_id: user_id });
      },

      getDog: (url, userId) => {
        fetch(url + userId)
          .then((res) => res.json())
          .then((data) => setStore({ dogs: [data.result] }))
          .catch();
      },

      handleLog: () => {
        setStore({ isLogedIn: true });
      },

      handleLogOut: () => {
        setStore({ isLogedIn: false });
      },

      getUserType: (user_type) => {
        setStore({ user_type: user_type });
      },
    },
  };
};

export default getState;
