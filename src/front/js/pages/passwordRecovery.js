import React from "react";

const PasswordRecoveryEmail = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="my-5">
            <h3>Recuperación de Contraseña</h3>
            <hr />
          </div>
          <form>
            <div className="row mb-5 gx-5">
              <div className="col-xxl-8 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h3>Busca tu dirección de correo electrónico</h3>
                    <p>
                      Introduce tu número de teléfono o tu dirección de correo
                      electrónico de recuperación
                    </p>

                    <div className="mb-3 w-50">
                      <label for="exampleInputEmail1" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu Correo"
                      />
                      <div id="emailHelp" className="form-text">
                        Nunca compartiremos tu correo con nadie más
                      </div>
                      <hr />
                      <button type="submit" className="btn btn-success">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryEmail;
