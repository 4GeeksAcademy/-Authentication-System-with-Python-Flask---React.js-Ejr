import React, {useState, useEffect} from "react";
import {companyRegister} from "../services/company";



const initialState = {
  user_name: "",
  name: "",
  last_name: "",
  email: "",
  password: "",
  city: "",
  cif: "",
  address: "",
  cp: "",
};

export const RegisterCompany = () => {
  const [form, setForm] = useState(initialState);


  // Función que actualiza el user_name basado en el campo email
  const updateUserName = (email) => {
    const userName = email.replace(/\s+/g, ""); // Elimina espacios en blanco
    setForm({...form, user_name: userName});
  };

  // Actualiza el user_name cada vez que el campo email cambia
  useEffect(() => {
    updateUserName(form.email);
  }, [form.email]);

  const handleChange = (e) => {
    const value = e.target.value; //se obtiene el valor del input
    const name = e.target.name; //se obtiene el nombre del campo del input
    setForm({...form, [name]: value}); //se añade el valor al campo de nombre de input haciendo una copia del objeto
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await companyRegister(form);
    setForm(initialState)
  };

  return (
    <>
      <div className="container text-center mt-5">
        <h2>CREAR NUEVA CUENTA</h2>
        <h5>Accede a todos los servicios de Jobs Hood !</h5>
      </div>
      <div className="container mt-5">
        <h4>Datos de Acceso</h4>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <div className="row align-items-start my-3">
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Nombre de la empresa
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$"
                title="Please enter a valid name"
                className="form-control rounded-0"
                maxLength="80"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                className="form-control rounded-0"
                maxLength="100"
                required
              />
            </div>
          </div>
          <div className="row align-items-start my-3">
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Dirección Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                className="form-control rounded-0"
                placeholder="name@example.com"
                maxLength="250"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="inputPassword6" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                className="form-control rounded-0"
                aria-labelledby="passwordHelpInline"
                placeholder="Debe tener entre 8-20 caracteres."
                maxLength="20"
                required
              />
            </div>
          </div>
          <div className="row align-items-end my-3">
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                className="form-control rounded-0"
                placeholder="Ciudad"
                maxLength="100"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                CIF
              </label>
              <input
                type="text"
                name="cif"
                value={form.cif}
                className="form-control rounded-0"
                placeholder="CIF"
                maxLength="10"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="form-register-company" className="form-label">
                Código postal
              </label>
              <input
                type="text"
                name="cp"
                value={form.cp}
                className="form-control rounded-0"
                placeholder="Código postal"
                maxLength="5"
                required
              />
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-dark mx-3  rounded-0"
            value="Registrarme"
          ></input>
        </form>
      </div>
    </>
  );
};
