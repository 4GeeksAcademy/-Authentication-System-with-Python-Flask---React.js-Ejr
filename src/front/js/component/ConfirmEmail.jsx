import React, { useState, useEffect, useContext } from "react"; // Importa React junto con varios hooks de React.
import styles from "./ConfirEmail.module.css"; // Importa los estilos CSS específicos para este componente.
import { Link } from "react-router-dom"; // Importa Link de react-router-dom para la navegación.
import { Context } from "../store/appContext"; // Importa el contexto de la aplicación.
import { useNavigate, useLocation} from "react-router-dom"; // Importa useNavigate y useLocation para la navegación programática y acceso a la ubicación URL.

function useQuery() { // Define un hook personalizado para obtener parámetros de búsqueda de URL.
  return new URLSearchParams(useLocation().search); // Retorna una instancia de URLSearchParams basada en la query actual.
}

function ConfirmarEmail() { // Define el componente React para confirmar el email.
  const [isConfirmed, setIsConfirmed] = useState(null); // Inicializa el estado para seguir si el email fue confirmado o no.
  const navigate = useNavigate(); // Obtiene el hook navigate para redirigir al usuario.
  const query = useQuery(); // Obtiene los parámetros de búsqueda de la URL.
  const token = query.get('token'); // Extrae el token de los parámetros de búsqueda.

  useEffect(() => { // React hook que se ejecuta cuando el componente se monta o las dependencias cambian.
    if (token) { // Verifica si el token está presente.
      fetch(`${process.env.BACKEND_URL}api/confirm/${token}`, { method: 'POST' }) // Realiza una solicitud POST para confirmar el email con el token.
        .then(response => response.json()) // Transforma la respuesta en JSON.
        .then(data => { // Procesa los datos recibidos.
          if (data.confirm_email) { // Verifica si el email fue confirmado con éxito.
            setIsConfirmed(true); // Actualiza el estado a confirmado.
            setTimeout(() => {
              navigate('/'); // Redirige al usuario a la página de inicio después de 3 segundos.
            }, 2000);
          } else {
            setIsConfirmed(false); // Actualiza el estado a no confirmado si falla.
          }
        })
        .catch(error => { // Captura y maneja errores de la solicitud fetch.
          console.error('Error al conectar al servidor:', error); // Log de error.
          setIsConfirmed(false); // Establece el estado a no confirmado en caso de error.
        });
    }
  }, [token, navigate]); // Dependencias del useEffect.

  return ( // Renderiza el componente JSX.
    <div className={`confirmation-box ${isConfirmed ? 'success' : 'error'}`} id={styles.confirmationBox}>
      <h1>Confirmando tu email...</h1>
      {isConfirmed !== null && ( // Renderiza condicionalmente el mensaje de éxito o error basado en el estado de confirmación.
        isConfirmed ? (
          <p id={styles.confirmationSuccess}><i className="fa-solid fa-circle-check"></i> Tu email ha sido confirmado</p> // Mensaje de confirmación exitosa.
        ) : (
          <p id={styles.confirmationError}><i className="fa-solid fa-circle-exclamation"></i> ¡Ups! Algo salió mal</p> // Mensaje de error en la confirmación.
        )
      )}
    </div>
  );
}

export default ConfirmarEmail; // Exporta el componente para su uso en otros archivos.
