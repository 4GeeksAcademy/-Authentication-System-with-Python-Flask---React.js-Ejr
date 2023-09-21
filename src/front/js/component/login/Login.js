import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container shadow my-5 rounded p-3">
      <form
        className="form"
        onSubmit={(e) => actions.handleSubmitLogin(e, navigate)}
      >
        <div className="container">
          <label htmlFor="logForm" className="text-dark">
            Email
          </label>
          <input
            type="email"
            className="form-control m-3"
            id="correo"
            placeholder="Email"
            name="email"
            /* value={store.currentUser ? store.currentUser.email : ""} //value={store.email} */
            value={store.email}
            // onChange={() => actions.handleChangeLogin}
            onChange={actions.handleChangeLogin}
            autoComplete="off"
          />
        </div>
        <div className="container">
          <label htmlFor="inputPassword2" className=" text-dark">
            Password
          </label>
          <input
            type="password"
            className="form-control m-3"
            id="inputPassword2"
            placeholder="Password"
            name="password"
            value={store.password}
            // value={store.currentUser ? store.currentUser.password : ""} //value={store.password}
            // onChange={() => actions.handleChangeLogin()}
            onChange={actions.handleChangeLogin} //onChange={()=>actions.handleChangeLogin()}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary ">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
