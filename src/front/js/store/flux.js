const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      dogs: {},
    },
    actions: {
      getInfo: (url, id) => {
        fetch(url + id)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setStore({ user: data.results });
          })
          .catch();
      },
    },
  };
};

export default getState;
