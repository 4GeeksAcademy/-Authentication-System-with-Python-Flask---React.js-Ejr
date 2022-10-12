import React, {useRef } from "react";
import { useForm } from "react-hook-form";

import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import emailjs from "@emailjs/browser";
import swal from "sweetalert";

//Instalar npm install @emailjs/browser --save
//Instalar npm install react-hook-form

export const Contacto = () => {
  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    emailjs
      .sendForm(
        "service_3q83svb",
        "template_ds0qae1",
        form.current,
        "iEJeEfqPLuw3KXA1l"
      )
      .then(
        (result) => {
          console.log(result.text);
          swal("Mensaje enviado correctamente", "", "success").then((value) => {
            formulario.reset();
            location.reload();
          });
        },
        (error) => {
          console.log(error.text);
          swal("Ha ocurrido un error", "", "warning");
        }
      );
  };

  return (
    <div class="row imghome">
      <Navbar />
      <div class="row login-row">
        <div class="col-md-6 login-form-1">
          <h3>Formulario de Contacto</h3>

          <form id="formulario" ref={form} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Nombre</label>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                {...register("user_name", { required: true })}
              />
            </div>
            {errors.user_name?.type === "required" && (
              <small className="fail">Ingresa tu nombre</small>
            )}
            <div>
              <label>Correo electrónico</label>
              <input
                type="text"
                className="form-control"
                {...register("user_email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })}
              />
            </div>
            <div>
              {errors.user_email?.type === "required" && (
                <small className="fail">Ingresa un correo electrónico</small>
              )}
              {errors.user_email?.type === "pattern" && (
                <small className="fail">El formato no es válido</small>
              )}
            </div>
            <div>
              <label>Mensaje</label>
            </div>
            <div>
              <textarea
                className="form-control"
                {...register("message", { required: true })}
              />
            </div>
            <div>
              {errors.message?.type === "required" && (
                <small className="fail">Escribe aquí tu mensaje</small>
              )}
            </div>
            <div>
              <input
                className=" btn btn-secondary mt-3"
                type="submit"
                value="Enviar"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
