import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/login.css";
import swal from "sweetalert";

//Instalar npm install react-hook-form
//Instalar npm install @emailjs/browser --save
//npm install sweetalert

export const Register = () => {
  const navigate = useNavigate();
  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // FETCH PARA REGISTRO
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      direccion: data.direccion,
      telefono: data.telefono,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://3001-alexanderwe-proyectofin-n78ib0622n7.ws-us70.gitpod.ionpm/api/registro",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(typeof result);
        console.log(result);
        console.log(JSON.parse(result));
        console.log(JSON.parse(result).mensaje);

        if (JSON.parse(result).mensaje === "Usuario Registrado") {
          swal("Registro realizado exitosamente", "", "success");
          navigate("/demo");
        }
        if (JSON.parse(result).mensaje === "Email ya registrado") {
          swal("Email ya registrado", "", "warning");
        }
      })
      .catch((error) => {
        console.log("error", error);
        swal("Ha ocurrido un error", "", "warning");
      });
  };

  return (
    <div class="container login-container">
      <div class="row login-row">
        <div class="col-md-6 login-form-1">
          <h3>Registro</h3>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              Nombre:
              <input
                type="text"
                placeholder="Tu nombre"
                className="form-control"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <small className="fail">Ingresa tu nombre</small>
              )}
            </div>
            <div class="form-group">
              Correo electrónico:
              <input
                type="text"
                class="form-control"
                placeholder="Tu correo electrónico"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <small className="fail">Ingresa un correo electrónico</small>
              )}
              {errors.email?.type === "pattern" && (
                <small className="fail">El formato no es válido</small>
              )}
            </div>
            <div class="form-group">
              Contraseña:
              <input
                type="password"
                class="form-control"
                placeholder="Tu contraseña"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
                })}
              />
              {errors.password?.type === "required" && (
                <small className="fail">Ingresa una contraseña</small>
              )}
              {errors.password?.type === "pattern" && (
                <div className="fail">
                  <span>El formato no es válido. Debe contener, al menos:</span>
                  <li className="auth">6 caracteres</li>
                  <li className="auth">1 letra mayúscula</li>
                  <li className="auth">1 letra minúscula</li>
                  <li className="auth">1 número</li>
                </div>
              )}
            </div>
            <div class="form-group">
              Dirección:
              <input
                type="text"
                placeholder="Tu dirección"
                className="form-control"
                {...register("direccion", { required: true })}
              />
              {errors.direccion?.type === "required" && (
                <small className="fail">
                  Ingresa una dirección de despacho
                </small>
              )}
            </div>
            <div class="form-group">
              Teléfono:
              <input
                type="text"
                class="form-control"
                placeholder="Tu teléfono"
                {...register("telefono", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors.telefono?.type === "required" && (
                <small className="fail">Ingresa un teléfono</small>
              )}
              {errors.telefono?.type === "pattern" && (
                <small className="fail">Formato no válido. Sólo números.</small>
              )}
            </div>
            <div class="form-group">
              <input type="submit" class="btnSubmit" />
            </div>
          </form>
        </div>
        <div class="col-md-6 login-form-2">
          <div class="login-logo">
{/*             <Link to="/">
              <i className="fa-solid  fa-house icon-house"></i>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
