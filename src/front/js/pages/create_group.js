import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; 

export const Create_group = () => {

    const { store, actions } = useContext(Context);

    const [nombreGrupo, setNombreGrupo] = useState('');
    const [descripcionGrupo, setDescripcionGrupo] = useState('');
    const [correoInvitado, setCorreoInvitado] = useState('');
    const [listaCorreosInvitados, setListaCorreosInvitados] = useState([]);
  
    const handleNombreGrupoChange = (event) => {
      setNombreGrupo(event.target.value);
    };
  
    const handleDescripcionGrupoChange = (event) => {
      setDescripcionGrupo(event.target.value);
    };
  
    const handleCorreoInvitadoChange = (event) => {
      setCorreoInvitado(event.target.value);
    };
  
    const handleAgregarCorreo = () => {
      if (correoInvitado.trim() !== '') {
        setListaCorreosInvitados([...listaCorreosInvitados, correoInvitado]);
        setCorreoInvitado('');
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      const response = await actions.crearGrupo(nombreGrupo, descripcionGrupo);

      if (response && response.message) {
        console.log(response.message);
        setNombreGrupo('');
        setDescripcionGrupo('');
        setListaCorreosInvitados([]);
      } else {
        console.error("Error al crear el grupo:", response);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreGrupo">Nombre de Grupo:</label>
          <input
            type="text"
            id="nombreGrupo"
            value={nombreGrupo}
            onChange={handleNombreGrupoChange}
          />
        </div>
        <div>
          <label htmlFor="descripcionGrupo">Descripción de Grupo:</label>
          <textarea
            id="descripcionGrupo"
            value={descripcionGrupo}
            onChange={handleDescripcionGrupoChange}
          />
        </div>
        <div>
          <label htmlFor="correoInvitado">Correo de Invitado:</label>
          <input
            type="email"
            id="correoInvitado"
            value={correoInvitado}
            onChange={handleCorreoInvitadoChange}
          />
          <button type="button" onClick={handleAgregarCorreo}>
            Agregar
          </button>
        </div>
        <div>
          <p>Correos Invitados:</p>
          <ul>
            {listaCorreosInvitados.map((correo, index) => (
              <li key={index}>{correo}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Enviar</button>
      </form>
    );
};
