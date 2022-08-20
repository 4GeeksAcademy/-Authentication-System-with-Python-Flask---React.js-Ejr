import React from "react";
import Shape from "../component/shape";

const Questions = () => {
  return (
    <div className="container-fluid m-auto mt-5 mb-5">
      <div className="container mb-5">
        <h4>Preguntas frecuentes:</h4>
        <div className="row text-align pb-9 text-black mb-4 mt-4">
          <p className="text-black">
            ¿Quienes Somos?: Dogger es una aplicación que permite a dueños de
            mascotas encontrar una persona confiable y amable con los perros
            para que los cuiden y lleven a pasear, al mismo tiempo que brinda la
            oportunidad a los que aman los perros de obtener un ingreso extra
            mientras disfrutan de un paseo.
          </p>
          <p className="text-black">
            ¿Que hacer si tengo problemas tecnicos? Contactanos a nuestro
            correo: doggercr@info.com
          </p>
          <p className="text-black">
            Quiero convertirme en un paseador de perros, ¿que tengo que hacer?:
            Tener afinidad hacia los perros, ser responsable y tener toda la
            disposicion de pasear a estos. Registrarte y seguir los pasos
            indicados en nuestro video introductorio despues de dicho registro.
          </p>
          <p className="text-black">
            Quiero que alguien pasee a mi perro, ¿que tengo que hacer?:
            Registrarte y seguir los pasos especificados de dicho registro en el
            video introductorio.
          </p>
          <p className="text-black">
            ¿Hasta cuanto perros puedo pasear?: "Cuatro y nos estamos
            arriesgando"...
          </p>
          <p className="text-black">
            Por fuera de lo economico, ¿hay algun otro tipo de incentivo?:
            Proximamente conforme vayamos creciendo como aplicacion, esperamos o
            por lo menos contemplamos la posibilidad de aplicar un sistema de
            incentivos para dar articulos de paseo, cuidado y aseo de estos,
            ademas de facilitar el tratamiento de estos en veterinarias y
            instruccion o entrenamiento de la mascota, entre otras sorpresas.
          </p>
          <p className="text-black">
            ¿Es necesario tener bachillerato completado?: No. Con que cumplas
            con la acreditacion basica como la mayoria de edad, identificacion y
            por supuesto que tengas etica laboral (responsabilidad, disciplina,
            buena actitud, etc), y que seas selecccionado y aceptado por el
            dueño del perro, es suficiente.
          </p>
          <p className="text-black">
            ¿Se le da algun tipo de preferencia a los paseadores?: Se le dara
            preferencia a aquellos que asi lo consideren los mismos dueños de
            las mascotas, es decir, aquellos que obtengan buena calificacion,
            que muestren mayor transparencia y compromiso, que tengas un mayor
            historial o experiencia y por supuesto, las habilidades que te
            puedan hacer destacar de los demas.
          </p>
        </div>
        <Shape />
      </div>
    </div>
  );
};

export default Questions;
