//localStorage es una API de almacenamiento web que proporciona una forma de almacenar datos en el navegador de manera persistente, 
//es decir, los datos almacenados en localStorage permanecen incluso después de cerrar el navegador o recargar la página.
//está asociado con un dominio web. Solo el mismo dominio puede acceder a los datos que almacenó.

//localStorage.setItem('token', 'mi_token_de_autenticacion'); para guardar un token
//const token = localStorage.getItem('token'); para recuperar un token
//localStorage.removeItem('token');Eliminar un token 
// Ejemplo en un flujo de autenticación:
// El usuario inicia sesión con sus credenciales.
// La aplicación recibe un token de autenticación desde el servidor.
// El token se guarda en localStorage.
// Para futuras solicitudes, el token se envía en los encabezados para autenticar al usuario.
// Si el usuario cierra la sesión, se elimina el token de localStorage


const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            cursos: [], //  Almacena todos los cursos obtenidos desde el backend.
            cursosConFiltros: [], // Almacena los cursos después de aplicar filtros
            loading: false, // Estado para mostrar carga
            error: null, // Estado para errores
            cursosProfe: [], //Almacena los cursos asignados al profesor específico.
            cursosAlumno: [], // Almacena los cursos en los que el alumno está inscrito
            autentificacion: false, // Indica si el usuarioProfe está autenticado.
            usuarioPr:null,  // Usuario que es un profesor.
            usuarioA: null, //información del usuario que se ha autenticado como alumno.
            filtros: { // Define los filtros aplicados para la búsqueda de cursos.
                categoria: "",
                valoracion: 0,
                nivel: "",
                precio: [0, 350],
                fecha: "",
                idioma: "",
                busqueda: "",
                
            }
        },
        actions: {

            // Acción para iniciar sesión alumno
            loginAlumno: async (dataForm) => {
                try {
                    const response = await fetch('/api/login', { // Solicitud POST a la API para autenticar al usuario alumno.
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataForm) // Convierte el formulario de inicio de sesión en JSON.
                    });

                    if (response.ok) {
                        const userData = await response.json(); // Si la respuesta es exitosa, obtenemos los datos del usuario.
                        setStore({ usuarioA: userData.user, autentificacion: true }); // Se guardan el usuario alumno en el store.usuarioA y se marca como autenticado.
                        localStorage.setItem('token', userData.token); // Guarda el token de autenticación en localStorage para futuras solicitudes.
                        return true;
                    } else {
                        console.error('Login fallido');
                        return false;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },

            // Cerrar sesión Alumno
            logoutAlumno: () => {
                localStorage.removeItem('token'); // Elimina el token del almacenamiento local para cerrar sesión.
                setStore({ usuarioA: null, autentificacion: false, cursosAlumno: [] }); 
                //Restablece el estado del usuario alumno y borra los cursos del estado, pero NO significa que los cursos se eliminen permanentemente del sistema
                //simplemente se elimina la referencia a los cursos del usuario en la memoria de la aplicación
            },


            // Acción para obtener los cursos del alumno
            obtenerCursosAlumno: async (alumnoId) => {
                const store = getStore();
                const token = localStorage.getItem('token');

                try {
                    const response = await fetch(`/api/students/${alumnoId}/courses`, { //solicitud GET a la API para obtener los cursos inscritos por el alumno.
                        headers: {
                            'Authorization': `Bearer ${token}`, // Autenticación de la solicitud con el token.
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const cursosAlumno = await response.json(); // Si la respuesta es ok,  obtiene los datos de los cursos.
                        setStore({ ...store, cursosAlumno }); // Actualizacion  cursos del alumno
                    } else {
                        console.error('Error al obtener los cursos del alumno');
                    }
                } catch (error) {
                    console.error('Error fetching student courses:', error);
                }
            },




            // Acción para iniciar sesión profe
            login: async (dataForm) => {
                try {
                    // solicitud POST a la API para autenticar al usuario profe.
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataForm) // Los datos del formulario de inicio de sesión.
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setStore({ usuarioPr: userData.user, autentificado: true }); // Actualizamos el store con los datos del usuarioPr y autenticación.
                        localStorage.setItem('token', userData.token); // Guarda el token en el localStorage para futuras solicitudes.
                        return true;
                    } else {
                        console.error('Login fallido');
                        return false;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },

             // Cerrar sesión Profe
             logout: () => {
                localStorage.removeItem('token'); // Elimina el token del localStorage
                setStore({ usuarioPr: null, autentificado: false, cursosProfe: [] }); // // Reseteamos el estado del usuario y los cursos del profesor.
            },
            
            // Acción para obtener los cursos del profesor
            obtenerCursosTutor: async (profesorId) => {
                const store = getStore(); // Obtenemos el estado actual del store.
                const token = localStorage.getItem('token'); // Obtén el token de autenticación

                try {
                    const response = await fetch(`/api/tutors/${profesorId}/courses`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Autorización de la solicitud con el token.
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const cursosProfe = await response.json();
                        setStore({ ...store, cursosProfe }); // Actualiza los cursos en el store
                    } else {
                        console.error('Error al obtener los cursos del profesor');
                    }
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            },



            // Cargar los cursos desde el backend
            cargarCursos: async () => {
                const store = getStore();
                setStore({ ...store, loading: true }); // Muestra el estado de carga

                try { // Enviamos una solicitud GET para obtener todos los cursos.
                    const response = await fetch('/api/cursos'); // Solicita los datos de cursos
                    const data = await response.json(); // Convierte la respuesta en JSON
                    setStore({ cursos: data, cursosConFiltros: data, loading: false }); 
                    // Actualizamos ambos estados tanto de cursos y cursosConFiltrado
                } catch (error) {
                    setStore({ error: error.message, loading: false }); // Maneja el error
                    console.error('Error loading courses:', error);
                }
            },

            // Alicamos filtros a los cursos
            aplicarFiltrosCursos: () => {
                const store = getStore();
                const { cursos, filtros } = store;

                // Filtra los cursos según los filtros proporcionados
                const cursosFiltrados = cursos.filter(curso => {
                    return (
                        (!filtros.categoria || curso.categoria === filtros.categoria) &&
                        (!filtros.valoracion || curso.valoracion >= filtros.valoracion) &&
                        (!filtros.nivel || curso.nivel === filtros.nivel) &&
                        (!filtros.precio || (curso.precio >= filtros.precio[0] && curso.precio <= filtros.precio[1])) &&
                        (!filtros.fecha || new Date(curso.fecha) >= new Date(filtros.fecha)) &&
                        (!filtros.idioma || curso.idioma === filtros.idioma) &&
                        (!filtros.busqueda || curso.nombre.includes(filtros.busqueda)) &&
                        (!filtros.cursoRelacionado || curso.relacionados.includes(filtros.cursoRelacionado))
                    );
                });

                setStore({ cursosConFiltros: cursosFiltrados }); // Actualiza los cursos filtrados
            },

            // Acción para actualizar los filtros
            actualizarFiltros: (nuevosFiltros) => {
                const store = getStore();
                setStore({ filtros: { ...store.filtros, ...nuevosFiltros } });
                // Actualizamos el estado de los filtros con los nuevos filtros proporcionados.
            },

            // Acción para manejar errores
            handleError: (error) => {
                setStore({ error: error.message });
            }

            
        }
    };
};

export default getState;