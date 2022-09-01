import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const EditDogInfo = () => {
  const params = useParams();
  const id_dog = params.id_dog;
  const { store, actions } = useContext(Context);
  const [editAge, setEditAge] = useState(true);
  const [editBreed, seteditBreed] = useState(true);
  const [editName, setEditName] = useState(true);
  const [editDesc, setEditDesc] = useState(true);

  const [name, setName] = useState(`${store.dogs[0][id_dog].name}`);

  const [breed, setBreed] = useState(`${store.dogs[0][id_dog].breed}`);
  const [age, setAge] = useState(`${store.dogs[0][id_dog].age}`);
  const [description, setDescription] = useState(
    `${store.dogs[0][id_dog].description}`
  );

  const owner_id = `${store.user_id}`;
  const dogUrl = process.env.BACKEND_URL + "/api/dogs";

  const handleSubmitNew = (e) => {
    e.preventDefault();

    const dbDog_id = store.dogs[0][id_dog].id;
    let dogInfo = {
      name: name,
      breed: breed,
      age: age,
      description: description,
    };

    fetch(`${dogUrl}/${dbDog_id}`, {
      method: "PUT",
      body: JSON.stringify(dogInfo),
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        actions.getDog(`${process.env.BACKEND_URL}/api/dogs/`, owner_id);
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
                      <h3>Edad: </h3>
                      {editAge ? (
                        <div className="row">
                          <h4 className="col-10">{age}</h4>
                          <div
                            className="btn btn-secondary rounded-pill col-lg-2 col-sm-6"
                            onClick={() => setEditAge(false)}
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
                                value={age}
                                placeholder={store.dogs.age}
                                onChange={(e) => setAge(e.target.value)}
                              ></input>
                              <div className="col-lg-4 col-sm-0"></div>
                              <div
                                type="submit"
                                className="btn btn-secondary col-lg-2 col-sm-6"
                                onClick={(e) => {
                                  handleSubmitNew(e);
                                  setEditAge(true);
                                }}
                              >
                                Editar
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                      <hr className="light" />
                      <h3>Raza: </h3>
                      {editBreed ? (
                        <div className="row">
                          <h4 className="col-10">{breed}</h4>
                          <div
                            className="btn btn-secondary rounded-pill col-lg-2 col-sm-6"
                            onClick={() => seteditBreed(false)}
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
                                value={breed}
                                placeholder={store.dogs.breed}
                                onChange={(e) => setBreed(e.target.value)}
                              ></input>

                              <div className="col-lg-4 col-sm-0"></div>

                              <div
                                type="submit"
                                className="btn btn-secondary col-lg-2 col-sm-6"
                                onClick={(e) => {
                                  handleSubmitNew(e);
                                  seteditBreed(true);
                                }}
                              >
                                Editar
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                      <hr className="light" />
                      <h3>Nombre del perro: </h3>
                      <div className="row">
                        {editName ? (
                          <div className="row">
                            <h4 className="col-10">{name}</h4>
                            <div
                              className="btn btn-secondary rounded-pill col-lg-2 col-sm-6"
                              onClick={() => setEditName(false)}
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
                                  value={name}
                                  placeholder={store.dogs.name}
                                  onChange={(e) => setName(e.target.value)}
                                ></input>

                                <div className="col-lg-4 col-sm-0"></div>

                                <div
                                  type="submit"
                                  className="btn btn-secondary col-lg-2 col-sm-6"
                                  onClick={(e) => {
                                    handleSubmitNew(e);
                                    setEditName(true);
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
                      <h3>Agrega una descripcion sobre tu perro: </h3>
                      <div className="row">
                        {editDesc ? (
                          <div className="row">
                            <h4 className="col-10">
                              {description == "null"
                                ? "Agrega una descripcion"
                                : description}
                            </h4>
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
                                  value={
                                    description == "null"
                                      ? "Agrega una descripcion"
                                      : description
                                  }
                                  placeholder={
                                    store.dogs.description == "null"
                                      ? "Agrega una descripcion"
                                      : store.dogs.description
                                  }
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

export default EditDogInfo;
