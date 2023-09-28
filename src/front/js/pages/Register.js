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
              <div className="col-md-5 d-md-block d-none p-0 box">
                <img
                  src="https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_1280.jpg"
                  className="imagenEegister"
                  style={{
                    objectFit: "cover",
                    height: "640px",
                    width: "320px",
                    borderTopLeftRadius: "1rem",
                    borderBottomLeftRadius: "1rem",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                  alt=""
                />
              </div>

              <div
                className="card border-0 card2 col-md-7 col-sm-12 p-3  pe-4 mb-0 box"
                id="paypage"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <form
                  className="form-control form-card"
                  onSubmit={(e) => actions.submitRegister(e, navigate)}
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
                    value={store.newUser.name}
                    onChange={actions.handleChangeRegister}
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
                    value={store.newUser.lastname}
                    onChange={actions.handleChangeRegister}
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
                    value={store.newUser.email}
                    onChange={actions.handleChangeRegister}
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
                        value={store.newUser.password}
                        onChange={actions.handleChangeRegister}
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
                        value={store.newUser.rep_password}
                        onChange={actions.handleChangeRegister}
                      />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <label>Region</label>
                    <select
                      className="form-select m-2 p-2 ps-3"
                      name="region"
                      required
                      value={store.newUser.region}
                      onChange={actions.handleChangeRegister}
                    >
                      <option value="">Selecciona region...</option>
                      <option value={1}>I</option>
                      <option value={2}>II</option>
                      <option value={3}>III</option>
                      <option value={4}>IV</option>
                      <option value={5}>V</option>
                      <option value={6}>VI</option>
                      <option value={7}>VII</option>
                      <option value={8}>VIII</option>
                      <option value={9}>IX</option>
                      <option value={10}>X</option>
                      <option value={11}>XI</option>
                      <option value={12}>XII</option>
                      <option value={13}>XIII</option>
                      <option value={14}>XIV</option>
                      <option value={15}>XV</option>
                      <option value={16}>RM</option>
                    </select>
                  </div>
                  <div className="row my-3 form-check">
                    <input
                      type="checkbox"
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

  // const { store, actions } = useContext(Context);

  // const navigate = useNavigate();

  // return (
  //   <div className="container col-md-4 my-3 shadow p-0">
  //     <form
  //       className="form-control shadow p-3 "
  //       onSubmit={(e) => actions.submitRegister(e, navigate)}
  //     >
  //       <div className="mb-3">
  //         <label htmlFor="form" className="form-label">
  //           Nombre
  //         </label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="nombre"
  //           aria-describedby="emailHelp"
  //           placeholder="Ingresa tu nombre"
  //           maxLength="12"
  //           minLength="3"
  //           required
  //           name={"name"}
  //           value={store.newUser.name}
  //           onChange={actions.handleChangeRegister}
  //         />
  //         <label htmlFor="exampleInputEmail1" className="form-label">
  //           Apellido
  //         </label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="apellido"
  //           aria-describedby="emailHelp"
  //           placeholder="Ingresa tu apellido"
  //           maxLength="12"
  //           minLength="3"
  //           required
  //           name={"lastname"}
  //           value={store.newUser.lastname}
  //           onChange={actions.handleChangeRegister}
  //         />
  //         <label htmlFor="exampleInputEmail1" className="form-label">
  //           Email
  //         </label>
  //         <input
  //           type="email"
  //           className="form-control"
  //           id="inputEmail1"
  //           aria-describedby="emailHelp"
  //           placeholder="Ingresa tu email"
  //           required
  //           //validacion email
  //           name={"email"}
  //           value={store.newUser.email}
  //           onChange={actions.handleChangeRegister}
  //         />
  //       </div>
  //       <div className="mb-3 password">
  //         <label htmlFor="exampleInputPassword1" className="form-label">
  //           Contraseña
  //         </label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           id="password"
  //           placeholder="Contraseña"
  //           required
  //           name={"password"}
  //           value={store.newUser.password}
  //           onChange={actions.handleChangeRegister}
  //         />
  //       </div>
  //       <div className="mb-3 password">
  //         <label htmlFor="exampleInputPassword1" className="form-label">
  //           Repetir Contraseña
  //         </label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           id="re_password"
  //           placeholder="Repita contraseña"
  //           required
  //           name={"rep_password"}
  //           value={store.newUser.rep_password}
  //           onChange={actions.handleChangeRegister}
  //         />
  //       </div>
  //       <div className="input-group mb-3">
  //         <label className="input-group-text" htmlFor="inputGroupSelect01">
  //           Region
  //         </label>
  //         <select
  //           className="form-select"
  //           name="region"
  //           required
  //           value={store.newUser.region}
  //           onChange={actions.handleChangeRegister}
  //         >
  //           <option value="">Selecciona region...</option>
  //           <option value={1}>I</option>
  //           <option value={2}>II</option>
  //           <option value={3}>III</option>
  //           <option value={4}>IV</option>
  //           <option value={5}>V</option>
  //           <option value={6}>VI</option>
  //           <option value={7}>VII</option>
  //           <option value={8}>VIII</option>
  //           <option value={9}>IX</option>
  //           <option value={10}>X</option>
  //           <option value={11}>XI</option>
  //           <option value={12}>XII</option>
  //           <option value={13}>XIII</option>
  //           <option value={14}>XIV</option>
  //           <option value={15}>XV</option>
  //           <option value={16}>RM</option>
  //         </select>
  //       </div>
  //       <div className="my-3 form-check">
  //         <input
  //           type="checkbox"
  //           className="form-check-input"
  //           id="Check1"
  //           required
  //         />
  //         <label className="form-check-label" htmlFor="exampleCheck1">
  //           Acepto términos y condiciones
  //         </label>
  //       </div>
  //       <button type="submit" className="btn btn-primary my-3">
  //         Registrarse
  //       </button>
  //     </form>
  //   </div>
  // );
};
export default Register;
