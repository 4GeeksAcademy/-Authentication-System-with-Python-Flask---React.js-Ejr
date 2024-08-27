import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/RegisterLogin_modal.css";
import { ForgotPassword } from "../component/recuperar-contraseña.jsx";

export const LoginRegister = () => {
  const { store, actions } = useContext(Context);
  const [register, setRegister] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false)
  const [error, setError] = useState('')
  const [regFormData, setRegFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  });
  // const [logFormData, setLogFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const resetFormData = () => {
    setRegFormData({
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    });
    // setLogFormData({
    //   email: "",
    //   password: "",
    // });
    setPasswordValidate(false);  // Resetea la validación de contraseña
    setError('');
    setRegister(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(register && regFormData.password == regFormData.passwordConfirm){
      const response = await actions.register(regFormData)
        if(!response.success){
          setError(response.msg)
        } else {
          const modalElement = document.getElementById('loginModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide()
        }
    }
    else if(register && regFormData.password != regFormData.passwordConfirm)
      setPasswordValidate(true)
    else{
      const response = await actions.login(regFormData)
      if(!response.success){
        setError(response.msg)
      } else {
        const modalElement = document.getElementById('loginModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide()
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if(register)
      setRegFormData({...regFormData, [name]: value})
    // else
      // setLogFormData({...logFormData, [name]: value})
  }

  useEffect(() => {
    const modalElement = document.getElementById('loginModal');
    const modal = new bootstrap.Modal(modalElement);

    // Resetear el formulario cuando el modal se cierra
    modalElement.addEventListener('hide.bs.modal', resetFormData);

    return () => {
      // Cleanup para evitar posibles fugas de memoria
      modalElement.removeEventListener('hide.bs.modal', resetFormData);
    };
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content border-0 rounded-4">
            <div className="modal-header">
              <h1 className="modal-title fs-5 logo">ShareTrips</h1>
              <button
                type="button"
                className="btn-close me-1"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className=" text-center">
                <h1 className="action fs-5 text-black">
                  {!register ? "Iniciar sesión" : "Crear cuenta"}
                </h1>
              </div>
              <form onSubmit={handleSubmit} className="">
                {error ? (
                  <div className="w-75 mx-auto alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : (
                  ""
                )}
                <div className="w-75 mx-auto mt-3 input-group-sm">
                  <label htmlFor="email" className="ms-2">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    className="form-control rounded-pill input-sm mx-auto mt-1"
                    pattern="[A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    title="Introduce un email válido."
                    value={regFormData.email}
                    required
                  />
                </div>
                <div className="w-75 mx-auto mt-2 input-group-sm">
                  <label htmlFor="password" className="ms-2">
                    Contraseña
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    className="form-control rounded-pill mx-auto mt-1"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
                    title="Al menos 8 caracteres.
                          Debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número.
                          Puede contener caracteres especiales."
                    value={regFormData.password}
                    required
                  />
                </div>
                {register === true ? (
                  <>
                    <div
                      className="alert alert-light mx-auto w-75 mt-2"
                      role="alert"
                    >
                      <ul style={{ fontSize: "small" }}>
                        <li>Al menos 8 caracteres.</li>
                        <li>
                          Debe contener al menos 1 letra mayúscula, 1 letra
                          minúscula y 1 número.
                        </li>
                        <li>Puede contener caracteres especiales.</li>
                      </ul>
                    </div>
                    <div className="w-75 mx-auto mt-2 input-group-sm">
                      <label htmlFor="passwordConfirm" className="ms-2">
                        Repetir contraseña
                      </label>
                      <input
                        onChange={handleChange}
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        className="form-control 
                        rounded-pill mx-auto mt-1"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
                        aria-describedby="passwordHelp"
                        value={regFormData.passwordConfirm}
                        required
                      />
                      {passwordValidate ? (
                        <div id="passwordHelp" class="form-text">
                          La contraseña ha de coincidir.
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="w-75 mx-auto mt-2 input-group-sm">
                      <label htmlFor="username" className="ms-2">
                        Nombre de usuario
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        id="username"
                        name="username"
                        value={regFormData.username}
                        className="form-control rounded-pill mx-auto mt-1"
                        required
                      />
                    </div>
                  </>
                ) : null}
                {!register ? (
                  <p className="mt-2 mb-0 w-75 mx-auto text-secondary">
                    <span
                      data-bs-target="#forgot-password"
                      data-bs-toggle="modal"
                    >
                      ¿Has olvidado tu contraseña?
                    </span>
                  </p>
                ) : null}
                <p className="mt-0 w-75 mx-auto text-secondary">
                  <span onClick={() => setRegister(!register)}>
                    {!register
                      ? "¿No tienes cuenta?"
                      : "¿Ya tienes una cuenta?"}
                  </span>
                </p>
                <div className="text-center">
                  <button
                    style={{ background: "#257895" }}
                    type="submit"
                    className="btn btn-primary mt-2 my-3 rounded-pill px-3 mx-auto"
                  >
                    {!register ? "Iniciar sesión" : "Crear cuenta"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ForgotPassword />
    </>
  );
};