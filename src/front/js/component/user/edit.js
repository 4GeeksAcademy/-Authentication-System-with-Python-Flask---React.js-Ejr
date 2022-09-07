import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(localStorage.getItem("full_name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const handleSubmit = async () => {
    if (password.length < 8) {
      swal("La contraseña debe tener al menos 8 caracteres");
    } else if (!email || !fullName) {
      swal("Debe rellenar todos los campos");
    }
    if (
      fullName !== localStorage.getItem("full_name") ||
      email !== localStorage.getItem("email") ||
      password
    ) {
      const resp = await actions.updateUser(fullName, email, password);
      if (resp.message == "Nothing to update") {
        swal("nada que actualizar");
      } else if (resp.message == "Updated user succesfully") {
        swal("Datos actualizados");
      }
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "100vh" }}
        >
          <div className="col-6 mt-5">
            <div className="card" style={{ width: "18rem;" }}>
              <div className="card-body text-center">
                <h5 className="card-title">Cambia tus datos</h5>
              </div>
              <ul className="list-group list-group-flush">
                <input
                  className="list-group-item"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                />
                <input
                  className="list-group-item"
                  value={email}
                  required
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </ul>
              <ul className="list-group list-group-flush">
                <input
                  className="list-group-item"
                  value={password}
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </ul>
              <div className="card-body text-center">
                <a href="#" className="btn btn-success" onClick={handleSubmit}>
                  Save
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "100vh" }}
        >
          <h5>Unauthorized...</h5>
        </div>
      )}
    </>
  );
};
