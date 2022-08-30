import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const UserInfo = () => {
  const { store, actions } = useContext(Context);
  const [edit, setEdit] = useState(true);
  const [first_name, setFname] = useState(`${store.user.first_name}`);
  const [last_name, setLname] = useState(`${store.user.last_name}`);
  const [username, setUsername] = useState(`${store.user.username}`);

  const ownerUrl = process.env.BACKEND_URL + "/api/owners";
  const walkerUrl = process.env.BACKEND_URL + "/api/walkers";

  const apiUser = () => {
    if (`${store.user_type}` == "walker") {
      return walkerUrl;
    } else {
      return ownerUrl;
    }
  };

  const handleFname = () => {
    setEdit(true);
  };

  const handleLname = (e) => {
    setLname(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    const formData = new FormData();
    let userInfo = {
      first_name: first_name,
      last_name: last_name,
      username: username,
    };

    fetch(`${apiUser()}/${store.user.id}`, {
      method: "PUT",
      body: JSON.stringify(userInfo),
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => console.log("resultado metodo PUT: ", data))
      .catch((err) => err);
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center m-auto mb-5 mt-5">
          <div className="col">
            <div className="card card-registration my-4 register mb-5">
              <div className="col-xl-12 mb-3">
                <div className="card-body p-md-5 text-black">
                  <div className="row">
                    <div className="col">
                      <h3>Nombre: </h3>
                      {edit ? (
                        <div className="row">
                          <h2>{store.user.first_name}</h2>
                          <div
                            className="btn btn-secondary rounded-pill"
                            onClick={() => setEdit(false)}
                          >
                            Editar Info
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <form>
                            <input
                              type="text"
                              value={first_name}
                              placeholder={store.user.first_name}
                              onChange={(e) => setFname(e.target.value)}
                            ></input>
                            <div
                              type="submit"
                              className="btn btn-secondary"
                              onClick={(e) => {
                                handleSubmitNew(e);
                                setEdit(true);
                              }}
                            >
                              Editar
                            </div>
                          </form>
                        </div>
                      )}

                      <h3>Apellido: </h3>
                      <div className="row">
                        <h2>{store.user.last_name}</h2>
                      </div>
                      <h3>Nombre de usuario: </h3>
                      <div className="row">
                        <h2>{store.user.username}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
