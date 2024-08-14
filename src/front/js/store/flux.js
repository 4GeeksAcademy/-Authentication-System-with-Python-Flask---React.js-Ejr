const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            cursos: [], // Almacena todos los cursos
            cursosConFiltros: [], // Almacena los cursos después de aplicar filtros
            loading: false, // Estado para mostrar carga
            error: null, // Estado para errores
            filtros: { // Estado para los filtros aplicados
                categoria: "",
                valoracion: 0,
                nivel: "",
                precio: [0, 100],
                fecha: "",
                idioma: "",
                busqueda: "",
                cursoRelacionado: ""
            }
        },
        actions: {
            // Cargar los cursos desde el backend
            cargarCursos: async () => {
                const store = getStore();
                setStore({ ...store, loading: true }); // Muestra el estado de carga

                try {
                    const response = await fetch('/api/cursos'); // Solicita los datos de cursos
                    const data = await response.json(); // Convierte la respuesta en JSON
                    setStore({ cursos: data, cursosConFiltros: data, loading: false }); 
                    // Inicializa ambos estados tanto de cursos y cursosConFiltrado
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
            },

            // Acción para manejar errores
            handleError: (error) => {
                setStore({ error: error.message });
            }
        }
    };
};

export default getState;