import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/register.css";
import Shape from "../component/shape";

export const RegistroPerro = () => {
  const login = "/login";
  let navigate = useNavigate();

  // States for regristration
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [file, setFile] = useState();

  // BackEnd url

  const apiUrl = process.env.BACKEND_URL + "/dogs";
  const ownerUrl = process.env.BACKEND_URL + "/api/dogs/";

  // Handling the values change
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBreed = (e) => {
    setBreed(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("breed", breed);
    formData.append("name", name);
    formData.append("file", file);
    formData.append("age", age);
    let body_content = JSON.stringify({
      name: name,
      breed: breed,
      age: age,
      file: file,
    });
    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        return result.json().then((data) => ({ status: result.status, data }));
      })
      .then((data) => {
        if (data.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.data.message,
          });
        } else {
          navigate(login);
          Swal.fire(
            "Tu perro ha sido registrado!",
            "Inicia sesión!",
            "success"
          );
        }
      })
      .catch((error) => error);
  };

  return (
    <div className="container-fluid">
      <div className="container align-items-center">
        <div className="row d-flex justify-content-center align-items-center h-100 w-75 mx-auto">
          <div className="col">
            <form
              className="card card-registration my-4 register"
              encType="multipart/form-data"
            >
              <div className="row g-0">
                <div className="col-xl-12">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 mt-5">REGISTRA A TU MASCOTA</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleName}
                            value={name}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Nombre</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleBreed}
                            value={breed}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Raza</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleAge}
                            value={age}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Edad</label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <label className="form-label">
                        Sube una foto de tu perro:
                      </label>
                      <input type="file" name="file" onChange={handleImage} />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-check mb-5"></div>
                      </div>
                      <div className="col-md-6 mb-4 ">
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn btn-lg ms-2 rounded-pill text-light"
                          id="btn_register"
                        >
                          Registrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Shape />
      </div>
    </div>
  );
};

RegistroPerro.propTypes = {
  match: PropTypes.object,
};
