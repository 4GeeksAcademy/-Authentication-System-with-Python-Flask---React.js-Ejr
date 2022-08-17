import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Shape from "../component/shape";

export const Login = () => {
  const [isShown, setIsShown] = useState(true);

  const { store, actions } = useContext(Context);
  const ownerRoute = "/homedueno";
  const walkerRoute = "/homecaminador";
  let navigate = useNavigate();

  // States for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiUrlLogin =
    "https://3001-ramsescode-doggerapp-5wnce8fu2jg.ws-us61.gitpod.io/login";
  const ownerUrl =
    "https://3001-ramsescode-doggerapp-5wnce8fu2jg.ws-us61.gitpod.io/api/owners/";
  const walkerUrl =
    "https://3001-ramsescode-doggerapp-5wnce8fu2jg.ws-us61.gitpod.io/api/walkers/";

  // Handling the values change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handle login Owner --------------------------------------------------

  const handleLogin = (e) => {
    e.preventDefault();

    let body_content = JSON.stringify({
      email: email,
      password: password,
    });

    fetch(apiUrlLogin, {
      method: "POST",
      body: body_content,
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        return result.json().then((data) => ({ status: result.status, data }));
      })
      .then((data) => {
        if (data.status === 400) {
          Swal.fire(data.data.message);
        } else if (data.status === 401) {
          Swal.fire("Correo o contraseña incorrectos");
        } else if (data.data.user_type == "owner") {
          localStorage.setItem("token", data.data.access_token);

          actions.getInfo(ownerUrl, data.data.user_id);
          navigate(ownerRoute);
          actions.handleLog();
        } else {
          localStorage.setItem("token", data.data.access_token);

          actions.getInfo(walkerUrl, data.data.user_id);
          navigate(walkerRoute);
          actions.handleLog();
        }
      })
      .catch((error) => error);
  };

  return (
    <div className="container-fluid">
      <div className="container align-items-center">
        <div className="row d-flex justify-content-center align-items-center m-auto mb-5 mt-5">
          <div className="col">
            <div className="card card-registration my-4 register mb-5">
              <div className="col-xl-12 mb-3">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-5 ">Login</h3>
                  <form>
                    <div className="row">
                      <div className="col-md-12 mb-6">
                        <div className="form-outline">
                          <input
                            onChange={handleEmail}
                            value={email}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label mt-2">Email</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-2 mt-3">
                        <div className="form-outline">
                          <input
                            onChange={handlePassword}
                            value={password}
                            type="password"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label mt-2">Contraseña</label>
                        </div>
                      </div>
                    </div>
                    {isShown == true ? (
                      <div className="row mt-3">
                        <button
                          onClick={handleLogin}
                          type="submit"
                          className="btn btn-lg rounded-pill text-light "
                          id="btn_register"
                          onMouseEnter={() => setIsShown(false)}
                        >
                          Login
                        </button>
                      </div>
                    ) : (
                      <div className="row mt-3">
                        <button
                          onClick={handleLogin}
                          type="submit"
                          className="btn btn-lg rounded-pill text-light "
                          id="btn_register2"
                          onMouseLeave={() => setIsShown(true)}
                        >
                          Login
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Shape />
      </div>
    </div>
  );
};

Login.propTypes = {
  match: PropTypes.object,
};
