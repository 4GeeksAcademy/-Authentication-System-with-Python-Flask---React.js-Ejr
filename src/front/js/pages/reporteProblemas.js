import React from "react";
import { Context } from "../store/appContext";
import { useContext, useState } from "react";
import { check } from "prettier";

const Reporte = () => {
  const { store, actions } = useContext(Context);

  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const [check3, setCheck3] = React.useState(false);
  const [check4, setCheck4] = React.useState(false);
  const [userid, setUserid]=useState(0)

  const [contenido1, setContenido1]=useState("No pedí colación, pero esta llegó a mi casa")
  const [contenido2, setContenido2]=useState("Pedí menú, y esta no llegó")
  const [contenido3, setContenido3]=useState("Tuve un problema con mi colación")
  const [contenido4, setContenido4]=useState("Otro. Por favor envia un correo a soporte@casinocorporativo.com")

 // if(contenido == contenido1){
//   return contenido1
// } else {
//   return None
// }


  const checked1 = () => {
    setCheck1(!check1);
    setContenido1(contenido1)
  console.log(contenido1)
  };

  const checked2 = () => {
    setCheck2(!check2);
    setContenido2(contenido2)
    console.log(contenido)
  };

  const checked3 = () => {
    setCheck3(!check3);
    setContenido3(contenido3)
    console.log(contenido3)
  };

  const checked4 = () => {
    setCheck4(!check4);
    setContenido4(contenido4)
    console.log(contenido4)

  };

  const problema = (event) => {
    event.preventDefault();
    contenido=contenido1;
    contenido=contenido2;
    contenido=contenido3;
    contenido=contenido4;

    actions.reporteProblema(contenido,userid);
   console.log(contenido,userid)
};

var contenido =""


  return (

   
    <div className="container">
      <div className="row">
    
        <div className="col">
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>Hola, lamentamos mucho los problemas ocasionados</p>
          <p>Cuéntanos, ¿Cuál es tu problema?</p>
          <br />
          <p>Por favor selecciona tu numero de empresa y selecciona solo uno de los campos</p>
          <input 
          
      placeholder="UserId"
      className="mt-3"
      type="text"
      name="userid"
      value={userid}
      onChange={event => setUserid(event.target.value)}/>
         <br />


          <label className="mb-3 mt-4">
            <input
              type="checkbox"
              name="check1"
              value={check1}
              autoComplete="off"
              checked={check1}
              onChange={checked1}

            />{" "}
            {contenido1}
          </label>{" "}
          <br />
          <label className="mb-3 mt-4">
            <input
              type="checkbox"
              name="check2"
              value={check2}
              autoComplete="off"
              checked={check2}
              onChange={checked2}
            />{" "}
            {contenido2}
          </label>{" "}
          <br />
          <label className="mb-3 mt-4">
            <input
              type="checkbox"
              name="check3"
              value={check3}
              autoComplete="off"
              checked={check3}
              onChange={checked3}
            />{" "}
            {contenido3}
          </label>{" "}
          <br />
       
           <label className="mb-3 mt-4">
            <input
              type="checkbox"
              name="check4"
              value={check4}
              autoComplete="off"
              checked={check4}
              onChange={checked4}
            />{" "}
            {contenido4}
          </label>{" "}
          <br />
          <button onClick={problema} type="button" className="btn btn-success w-100 mb-4">
              Enviar
            </button>
        </div>
    
      </div>
    </div>
   
  );
};

export default Reporte;
