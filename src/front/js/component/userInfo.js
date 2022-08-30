import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const UserInfo = () => {
  const { store, actions } = useContext(Context);
  const [edit, setEdit] = useState(true);
  const [editLName, setEditLName] = useState(true);
  const [editUName, setEditUName] = useState(true);
  const [editDesc, setEditDesc] = useState(true);

  const [first_name, setFname] = useState(`${store.user.first_name}`);
  const [last_name, setLname] = useState(`${store.user.last_name}`);
  const [username, setUsername] = useState(`${store.user.username}`);
  const [description, setDescription] = useState(`${store.user.description}`);

  const ownerUrl = process.env.BACKEND_URL + "/api/owners";
  const walkerUrl = process.env.BACKEND_URL + "/api/walkers";

  const apiUser = () => {
    if (`${store.user_type}` == "walker") {
      return walkerUrl;
    } else {
      return ownerUrl;
    }
  };

  const handleFname = (name) => {
    setFname(name);
    store.user.first_name = first_name;
  };

  const handleLname = (lname) => {
    setLname(lname);
    store.user.last_name = last_name;
  };

  const handleUsername = (uName) => {
    setUsername(uName);
    store.user.username = username;
  };

  const handleDescription = (descr) => {
    setUsername(description);
    store.user.description = description;
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
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
      .then((data) => {
        if (store.user_type == "owner") {
          handleFname(data.updateowner.first_name);
          handleLname(data.updateowner.last_name);
          handleUsername(data.updateowner.username);
          handleDescription(data.updateowner.description);
        } else {
          handleFname(data.updatewalker.first_name);
          handleLname(data.updatewalker.last_name);
          handleUsername(data.updatewalker.username);
          handleDescription(data.updatewalker.description);
        }
      })
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
                          <h4 className="col-10">{first_name}</h4>
                          <div
                            className="btn btn-secondary rounded-pill col-lg-2 col-sm-6"
                            onClick={() => setEdit(false)}
                          >
                            Editar Info
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <form>
                            <div className="row">
                              <input
                                className="col-lg-6 col-sm-6"
                                type="text"
                                value={first_name}
                                placeholder={store.user.first_name}
                                onChange={(e) => setFname(e.target.value)}
                              ></input>
                              <div className="col-lg-4 col-sm-0"></div>
                              <div
                                type="submit"
                                className="btn btn-secondary col-lg-2 col-sm-6"
                                onClick={(e) => {
                                  handleSubmitNew(e);
                                  setEdit(true);
                                }}
                              >
                                Editar
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                      <hr className="light" />
                      <h3>Apellido: </h3>
                      {editLName ? (
                        <div className="row">
                          <h4 className="col-10">{last_name}</h4>
                          <div
                            className="btn btn-secondary rounded-pill col-lg-2 col-sm-6"
                            onClick={() => setEditLName(false)}
                          >
                            Editar Info
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <form>
                            <div className="row">
                              <input
                                className="col-lg-6 col-sm-6"
                                type="text"
                                value={last_name}
                                placeholder={store.user.last_name}
                                onChange={(e) => setLname(e.target.value)}
                              ></input>

                              <div className="col-lg-4 col-sm-0"></div>

                              <div
                                type="submit"
                                className="btn btn-secondary col-lg-2 col-sm-6"
                                onClick={(e) => {
                                  handleSubmitNew(e);
                                  setEditLName(true);
                                }}
                              >
                                Editar
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                      <hr className="light" />
                      <h3>Nombre de usuario: </h3>
                      <div className="row">
                        {editUName ? (
                          <div className="row">
                            <h4 className="col-10">{username}</h4>
                            <div
                              className="btn btn-secondary rounded-pill col-lg-2 col-sm-6"
                              onClick={() => setEditUName(false)}
                            >
                              Editar Info
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            <form>
                              <div className="row">
                                <input
                                  className="col-lg-6 col-sm-6"
                                  type="text"
                                  value={username}
                                  placeholder={store.user.username}
                                  onChange={(e) => setUsername(e.target.value)}
                                ></input>

                                <div className="col-lg-4 col-sm-0"></div>

                                <div
                                  type="submit"
                                  className="btn btn-secondary col-lg-2 col-sm-6"
                                  onClick={(e) => {
                                    handleSubmitNew(e);
                                    setEditUName(true);
                                  }}
                                >
                                  Editar
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                      <hr className="light" />
                      <h3>Agrega una descripcion sobre ti: </h3>
                      <div className="row">
                        {editDesc ? (
                          <div className="row">
                            <h4 className="col-10">{description}</h4>
                            <div
                              className="btn btn-secondary rounded-pill col-lg-2 col-sm-6"
                              onClick={() => setEditDesc(false)}
                            >
                              Editar Info
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            <form>
                              <div className="row">
                                <input
                                  className="col-lg-6 col-sm-6"
                                  type="text"
                                  value={description}
                                  placeholder={store.user.description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                ></input>

                                <div className="col-lg-4 col-sm-0"></div>

                                <div
                                  type="submit"
                                  className="btn btn-secondary col-lg-2 col-sm-6"
                                  onClick={(e) => {
                                    handleSubmitNew(e);
                                    setEditDesc(true);
                                  }}
                                >
                                  Editar
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
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
