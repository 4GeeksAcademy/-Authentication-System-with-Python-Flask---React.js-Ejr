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
            cursos: [
                {
                    id: 1,
                    nombre: "Curso de Desarrollo Web",
                    categoria: "Desarrollo",
                    subcategoria: "Desarrollo Web",
                    valoracion: 5,
                    nivel: "principiante",
                    precio: 100,
                    fecha: "2023-09-01",
                    idioma: "espanol"
                },
                {
                    id: 2,
                    nombre: "Curso de Finanzas",
                    categoria: "Negocios",
                    subcategoria: "Finanzas",
                    valoracion: 4,
                    nivel: "intermedio",
                    precio: 200,
                    fecha: "2023-10-01",
                    idioma: "ingles"
                },
                {
                    id: 3,
                    nombre: "Curso de Diseño Web",
                    categoria: "Diseño",
                    subcategoria: "Diseño Web",
                    valoracion: 3,
                    nivel: "avanzado",
                    precio: 150,
                    fecha: "2023-11-01",
                    idioma: "aleman"
                }
                
            ], //  Almacena todos los cursos obtenidos del mockup mientras no funciona la API del el backend. Siempre tiene los cursos sin filtrar.
            cursosConFiltros: [], // Almacena los cursos después de aplicar filtros. Se actualiza cuando aplicas filtros
            //categorias: [], // Asegúrate de tener categorías en el estado
            //subcategorias: [], // Y también subcategorías si son independientes
            loading: false, // Estado para mostrar carga
            error: null, // Estado para errores
            cursosProfe: [], //Almacena los cursos asignados al profesor específico.
            cursosAlumno: [], // Almacena los cursos en los que el alumno está inscrito
            autentificacion: false, // Indica si el usuarioProfe está autenticado.
            usuarioPr:  null,  // Usuario que es un profesor.
            usuarioA: null, //información del usuario que se ha autenticado como alumno.
            filtros: { // Define los filtros aplicados para la búsqueda de cursos.
                categoria: "",
                valoracion: 0,
                nivel: "",
                precio: [0, 350],
                fecha: "",
                idioma: "",
                busqueda: "",
                
            },
            
        },
        actions: {
            //FUNCIONES DE JAVIER (mirar abajo)
            crearCurso: async (dataForm) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/cursos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataForm)
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        return {
                            success: true,
                            message: 'Curso creado con éxito'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante la creación'
                        };
                    }
                } catch (error) {
                    console.error('Error en crear curso:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                } 
            },
            //FUNCIONES DE JAVIER (mirar arriba)

            // Cargar los cursos desde el backend
            cargarCursos: async () => {
                const store = getStore();
                setStore({ ...store, loading: true }); // Muestra el estado de carga

                try { // Enviamos una solicitud GET para obtener todos los cursos.
                    const response = await fetch(process.env.BACKEND_URL+'/api/cursos'); // Solicita los datos de cursos
                    const data = await response.json(); // Convierte la respuesta en JSON
                    setStore({ ...store, cursos: data, cursosConFiltros: data, loading: false }); 
                    // Actualizamos ambos estados tanto de cursos y cursosConFiltrado y oculta el estado de carga
                } catch (error) {
                    setStore({ ...store, error: error.message, loading: false }); // Maneja el error
                    console.error('Error loading courses:', error);
                }
            },
            
        

            // Aplicar filtros a los cursos
            aplicarFiltrosCursos: () => {
                const store = getStore();
                const { cursos, filtros } = store;

                const cursosFiltrados = cursos.filter(curso => {
                    return (
                        (!filtros.categoria || curso.categoria === filtros.categoria) &&
                        (!filtros.valoracion || curso.valoracion >= filtros.valoracion) &&
                        (!filtros.nivel || curso.nivel === filtros.nivel) &&
                        (!filtros.precio || (curso.precio >= filtros.precio[0] && curso.precio <= filtros.precio[1])) &&
                        (!filtros.fecha || new Date(curso.fecha) >= new Date(filtros.fecha)) &&
                        (!filtros.idioma || curso.idioma === filtros.idioma) &&
                        (!filtros.busqueda || curso.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()))
                    );
                });
                   // Actualiza el estado global con los cursos filtrados
                setStore({ cursosConFiltros: cursosFiltrados });
            },

            // Función para actualizar los filtros aplicados
            actualizarFiltros: (nuevosFiltros) => {
                const store = getStore();
                // Combina los filtros existentes con los nuevos filtros proporcionados
                const filtrosActualizados = { ...store.filtros, ...nuevosFiltros };
                
                // Si el filtro de precio se actualiza, asegúrate de manejar el caso del rango.
                if (nuevosFiltros.precio) {
                    filtrosActualizados.precio = nuevosFiltros.precio;
                }
                // Actualiza el estado global con los filtros actualizados
                setStore({ filtros: filtrosActualizados });

                // Aplica los filtros actualizados a la lista de cursos
                getActions().aplicarFiltrosCursos();

            },
            //Actualizar el estado global,limpiando los cursos filtrados. 
            //Esto significa que el array cursosConFiltros se vacía.
            resetFiltros: ()=>{
                const store = getStore(); //devuelve el estado global.
                setStore ({...store, cursosConFiltros: [] })

            },

            // Cerrar sesión Alumno
            logoutAlumno: () => {
                localStorage.removeItem('token');
                setStore({ usuarioA: null, autentificacion: false, cursosAlumno: [] });
                //Restablece el estado del usuario alumno y borra los cursos del estado, pero NO significa que los cursos se eliminen permanentemente del sistema
                //simplemente se elimina la referencia a los cursos del usuario en la memoria de la aplicación
            },

            // Acción para obtener los cursos del alumno
            obtenerCursosAlumno: async (alumnoId) => {
                const store = getStore();
                const token = localStorage.getItem('token');

                try {
                    const response = await fetch(`/api/students/${alumnoId}/courses`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const cursosAlumno = await response.json();
                        setStore({ ...store, cursosAlumno });
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
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataForm) // Los datos del formulario de inicio de sesión
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setStore({ usuarioPr: userData.user, autentificado: true });
                        localStorage.setItem('token', userData.token);
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
                setStore({ usuarioPr: null, autentificado: false, cursosProfe: [] });
            },

            // Acción para obtener los cursos del profesor
            obtenerCursosProfesor: async (profesorId) => {
                const store = getStore();// Obtenemos el estado actual del store.
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
                        setStore({ ...store, cursosProfe });
                    } else {
                        console.error('Error al obtener los cursos del profesor');
                    }
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            },            

            // Acción para manejar errores
            handleError: (error) => {
                setStore({ error: error.message });
            },

            // Acción para registro de usuario
            register: async (formData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        return {
                            success: true,
                            message: 'Curso creado exitosamente.'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante la creación '
                        };
                    }
                } catch (error) {
                    console.error('Error en registerUser:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },

            // Acción para inicio de sesión
            loginUser: async ({ email, password }) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        return {
                            success: true,
                            user: data.user,
                            data: {
                                token: data.token
                            },
                            message: 'Conexión exitosa con el servidor'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido'
                        };
                    }
                } catch (error) {
                    console.error('Error en loginUser:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },
        }
    };
};

export default getState;



            // // Ejemplo de función para cargar categorías y subcategorías
            // cargarCategorias: async () => {
            //     const store = getStore();
            //     setStore({ ...store, loading: true });

            //     try {
            //         const response = await fetch(process.env.BACKEND_URL+'/api/categorias');
            //         const data = await response.json();
            //         setStore({ categorias: data, loading: false });
            //     } catch (error) {
            //         setStore({ error: error.message, loading: false });
            //         console.error('Error loading categories:', error);
            //     }
            // },

// Llama a cargarCategorias en algún lugar de tu aplicación para que las categorías estén disponibles

