import React, { useState } from "react";
import "../../styles/register.css";
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "./Formularios";
import Input from "./Input";

export const CompanyRegister = () => {
<<<<<<< HEAD
  const [nombreempresa, cambiarNombreempresa] = useState({
    campo: "",
    valido: null,
  });
=======

  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [nombreempresa, cambiarNombreempresa] = useState({ campo: "", valido: null });
>>>>>>> ea075b7181e9c97afcfff963366b7055e6a86950
  const [rutempresa, cambiarRutempresa] = useState({ campo: "", valido: null });
  const [nombrecontacto, cambiarNombrecontacto] = useState({
    campo: "",
    valido: null,
  });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [direccion, cambiarDireccion] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    errors: {},
    nombreempresa: /^[a-zA-Z0-9_-]{4,16}$/,
    rutempresa: /^.{4,12}$/, // 4 a 12 digitos.
    nombrecontacto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    direccion: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };

  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nombreempresa.valido === "true" &&
      rutempresa.valido === "true" &&
      nombrecontacto.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      direccion.valido === "true" &&
      terminos
    ) {
      cambiarFormularioValido(true);

      cambiarNombreempresa({ campo: "", valido: null });
      cambiarRutempresa({ campo: "", valido: null });
      cambiarNombrecontacto({ campo: "", valido: null });
      cambiarPassword({ campo: "", valido: null });
      cambiarPassword2({ campo: "", valido: "null" });
      cambiarCorreo({ campo: "", valido: null });
      cambiarTelefono({ campo: "", valido: null });
      cambiarDireccion({ campo: "", valido: null });

      // ...
    } else {
      cambiarFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario
        action="https://formsubmit.co/maria.millaherrera@gmail.com"
        method="POST"
      >
        <Input
          estado={nombreempresa}
          cambiarEstado={cambiarNombreempresa}
          tipo="text"
          label="Nombre Empresa"
          placeholder="Empresa S.A."
          name="nombreempresa"
          leyendaError="El nombre de empresa solo puede contener letras y espacios."
          expresionRegular={expresiones.nombreempresa}
          required
        />
        <Input
          estado={rutempresa}
          cambiarEstado={cambiarRutempresa}
          tipo="text"
          label="Rut Empresa"
          placeholder="77.888.999-9"
          name="rut"
          leyendaError="El rut solo puede contener números, punto y guión."
          expresionRegular={expresiones.rutempresa}
          required
        />
        <Input
          estado={nombrecontacto}
          cambiarEstado={cambiarNombrecontacto}
          tipo="text"
          label="Nombre Contacto"
          placeholder="Maria Herrera"
          name="nombrecontacto"
          leyendaError="El nombre de contacto solo puede contener letras y espacios."
          expresionRegular={expresiones.nombrecontacto}
          required
        />
        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Correo Electrónico"
          placeholder="maria@correo.com"
          name="correo"
          leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
          expresionRegular={expresiones.correo}
          required
        />

        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Contraseña"
          name="password1"
          leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
          expresionRegular={expresiones.password}
          required
        />
        <Input
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Repetir Contraseña"
          name="password2"
          leyendaError="Ambas contraseñas deben ser iguales."
          funcion={validarPassword2}
          required
        />

        <Input
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          tipo="text"
          label="Teléfono"
          placeholder="4491234567"
          name="telefono"
          leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
          expresionRegular={expresiones.telefono}
          required
        />
        <Input
          estado={direccion}
          cambiarEstado={cambiarDireccion}
          tipo="text"
          label="Dirección"
          placeholder="Direccion."
          name="direccion"
          leyendaError="Las dirección solo puede contener letras, espacios y números."
          expresionRegular={expresiones.direccion}
          required
        />

        <ContenedorTerminos>
          <Label>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terminos}
              onChange={onChangeTerminos}
            />
            Acepto los Terminos y Condiciones
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Por favor rellena el formulario correctamente.
            </p>
          </MensajeError>
        )}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === true && (
            <MensajeExito>Formulario enviado exitosamente!</MensajeExito>
          )}
        </ContenedorBotonCentrado>

      </Formulario>
    </main>
  );

};
