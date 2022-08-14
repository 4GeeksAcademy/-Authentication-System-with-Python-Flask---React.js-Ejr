const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      owner: {},
      dogs: {},
    },
    actions: {
      getInfo: (id) => {
        fetch(
          "https://3001-ramsescode-doggerapp-cemlmmgdovn.ws-us60.gitpod.io/api/owners/" +
            id
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setStore({ owner: data.results });
          })
          .catch();
      },
    },
  };
};

export default getState;
