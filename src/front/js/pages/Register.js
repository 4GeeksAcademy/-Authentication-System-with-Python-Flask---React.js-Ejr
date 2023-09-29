import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login_register.css";

const Register = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card0 ">
            <div className="row rowForm">
              <div className="col-md-5 d-md-block d-none p-0">
                <img
                  src="https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_1280.jpg"
                  className="imagenEegister"
                  /* style={{
                    objectFit: "cover",
                    height: "640px",
                    width: "320px",
                    borderTopLeftRadius: "1rem",
                    borderBottomLeftRadius: "1rem",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }} */
                  alt=""
                />
              </div>

              <div
                className="card border-0 card2 col-md-7 col-sm-12 p-3  pe-4 mb-0 box"
                id=""
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <form
                  className="form-control form-card"
                  onSubmit={(e) => actions.submitUserImage(e, navigate)}
                >
                  <label htmlFor="form" className="form-label mt-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control m-2 p-2 mb-3 ps-3"
                    id="nombre"
                    aria-describedby="emailHelp"
                    placeholder="Ingresa tu nombre"
                    maxLength="12"
                    minLength="3"
                    required
                    name={"name"}
                    value={store.name}
                    onChange={actions.inputUserValue}
                    // value={store.newUser.name}
                    // onChange={actions.handleChangeRegister}
                  />
                  <label htmlFor="exampleInputEmail1" className="form-label ">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control m-2 p-2 mb-3 ps-3"
                    id="apellido"
                    aria-describedby="emailHelp"
                    placeholder="Ingresa tu apellido"
                    maxLength="12"
                    minLength="3"
                    required
                    name={"lastname"}
                    // value={store.newUser.lastname}
                    // onChange={actions.handleChangeRegister}
                    value={store.lastname}
                    onChange={actions.inputUserValue}
                  />
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control m-2 p-2 mb-3 ps-3"
                    id="inputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ingresa tu email"
                    required
                    name={"email"}
                    /* value={store.newUser.email}
                    onChange={actions.handleChangeRegister} */
                    value={store.email}
                    onChange={actions.inputUserValue}
                  />
                  <div className="row mb-2">
                    <div className="col-8 col-md-6">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control m-2 p-2 ps-3"
                        id="password"
                        placeholder="Contraseña"
                        required
                        name={"password"}
                        /* value={store.newUser.password}
                        onChange={actions.handleChangeRegister} */
                        value={store.password}
                        onChange={actions.inputUserValue}
                      />
                    </div>
                    <div className="col-4 col-md-6">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Repetir Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control m-2 p-2 ps-3"
                        id="re_password"
                        placeholder="Repita contraseña"
                        required
                        name={"rep_password"}
                        /* value={store.newUser.rep_password}
                        onChange={actions.handleChangeRegister} */
                        value={store.rep_password}
                        onChange={actions.inputUserValue}
                      />
                    </div>
                  </div>
                  <div className="seleccion-region">
                    <label htmlFor="form">Region</label>
                    <select
                      className="seleccion-region form-select m-2 p-2 ps-3 "
                      id="region"
                      required
                      name="region"
                      value={store.region.toString()}
                      onChange={actions.inputUserValue}
                      multiple={false}
                    >
                      <option value="" className="seleccion-region">
                        Seleccionar Región
                      </option>
                      <option value="Arica y Parinacota">
                        Arica y Parinacota
                      </option>
                      <option value="Tarapacá">Tarapacá</option>
                      <option value="Antofagasta">Antofagasta</option>
                      <option value="Atacama">Atacama</option>
                      <option value="Coquimbo">Coquimbo</option>
                      <option value="Valparaíso">Valparaíso</option>
                      <option value="O'Higgins">O'Higgins</option>
                      <option value="Maule">Maule</option>
                      <option value="Ñuble">Ñuble</option>
                      <option value="Biobío">Biobío</option>
                      <option value="La Araucanía">La Araucanía</option>
                      <option value="Los Ríos">Los Ríos</option>
                      <option value="Los Lagos">Los Lagos</option>
                      <option value="Aysén">Aysén</option>
                      <option value="Magallanes">Magallanes</option>
                      <option value="Metropolitana">Metropolitana</option>
                    </select>

                    <div className="">
                      <label htmlFor="form" className="form-label">
                        Foto de perfil
                      </label>
                      <input
                        type="file"
                        className="form-control ms-2"
                        id="userImage"
                        placeholder="Sube foto"
                        name="userImage"
                        onChange={(e) =>
                          actions.inputUserImage(e.target.files[0])
                        }
                      />
                    </div>
                  </div>
                  <div className="row my-3 form-check">
                    <input
                      type="checkbox"
                      htmlFor="form"
                      className="form-check-input col-2 col-md-1 p-0"
                      id="Check1"
                      required
                    />
                    <p
                      className="form-check-label col-8 col-md-6"
                      htmlFor="exampleCheck1"
                    >
                      Acepto términos y condiciones
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="buttonRegister btn btn-dark  m-2 p-2 px-4"
                  >
                    Registrarme
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
