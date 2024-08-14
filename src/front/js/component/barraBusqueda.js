import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'; //biblioteca que reescribe los componentes de Bootstrap como componentes de React.
import '../../styles/barraBusqueda.css'; // Importa los estilos para el componente
import { Context } from '../store/appContext'; // Importa el contexto global

const BarraBusqueda = () => {
    // Accede al estado global y las acciones desde el contexto
    const { store, actions } = useContext(Context);

    // Estado local para manejar el estado de carga y errores
    const [loading, setLoading] = useState(store.loading);
    const [error, setError] = useState(store.error);

    // Función para aplicar los filtros y cargar los datos
    const filtrosAplicar = async () => {
        setLoading(true); // Indica que se está cargando los datos
        setError(null); // Limpiar errores anteriores

        try {
            await actions.cargarCursos(); // Llama a la acción (cargarCursos del flux) desde el backend y el await asegura que la función fetchCursos esperará a que cargarCursos termine antes de continuar.
        } catch (err) {
            setError(err.message); // Maneja errores en la carga de datos
        } finally {
            setLoading(false); // Indica que la carga ha terminado, independientemente de si la carga de datos fue exitosa o fallida
        }
    };

    // // llama la acción de cargar cursos cuando el componente BarraBusqueda se monta.
    // useEffect(() => {
    //     const fetchCursos = async () => {
    //         setLoading(true); // Indica que se está cargando y se usa para mostrar un indicador de carga en la interfaz de usuario.
    //         try {
    //             await actions.cargarCursos(); // Llama a la acción (cargarCursos del flux) desde el backend y el await asegura que la función fetchCursos esperará a que cargarCursos termine antes de continuar.
    //         } catch (err) {
    //             setError(err.message); // Maneja cualquier error que ocurra
    //         } finally {
    //             setLoading(false); // Indica que la carga ha terminado, independientemente de si la carga de datos fue exitosa o fallida
    //         }
    //     };
    //     fetchCursos(); // Llama a la función para cargar cursos y la ejecuta siempre que actions cambie
    // }, [actions, store.filtros]); // la llamada a fetchCursos()) se ejecutará nuevamente si [actions] o los filtros se actualiza o se reemplaza por una nueva referencia.

    // // Función para aplicar los filtros
    // const filtrosAplicar = () => {
    //     actions.aplicarFiltrosCursos(); // Llama a la acción para aplicar los filtros a los cursos
    // };

    // Función para restablecer los filtros a sus valores por defecto
    const resetFiltros = () => {
        actions.actualizarFiltros({
            categoria: "",
            valoracion: 0,
            nivel: "",
            precio: [0, 100],
            fecha: "",
            idioma: "",
            busqueda: "",
            cursoRelacionado: ""
        }); // Resetea los filtros en el estado global
    };

    // Función para manejar los cambios en los filtros
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre  del campo de formulario que cambió (por ejemplo, "categoria", "valoracion", "precio", etc.) 
        //y valor del input del campo de formulario que cambió
        actions.actualizarFiltros({ [name]: value }); // Actualiza el filtro específico en el estado global
    };

    return (
        <div className="barra-busqueda">
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formCategoria">
                            <Form.Label>Categorías</Form.Label>
                            <Form.Control as="select" name="categoria" onChange={handleChange}>
                                <option value="">Seleccione una categoría</option>
                                <option value="categoria1">Categoría 1</option>
                                <option value="categoria2">Categoría 2</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formValoracion">
                            <Form.Label>Valoraciones</Form.Label>
                            <div className="filtro">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} onClick={() => handleChange({ target: { name: 'valoracion', value: i + 1 } })}>
                                        {i < store.filtros.valoracion ? "★" : "☆"}
                                    </span>
                                ))}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formNivel">
                            <Form.Label>Niveles</Form.Label>
                            <Form.Control as="select" name="nivel" onChange={handleChange}>
                                <option value="">Seleccione un nivel</option>
                                <option value="principiante">Principiante</option>
                                <option value="intermedio">Intermedio</option>
                                <option value="avanzado">Avanzado</option>
                                <option value="master">Máster</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Precios</Form.Label>
                            <Form.Control 
                                type="range" 
                                min="0" 
                                max="100" 
                                name="precio" 
                                value={store.filtros.precio[1]} 
                                onChange={(e) => handleChange({ target: { name: 'precio', value: [0, e.target.value] } })} 
                            />
                            <span>{`$0 - $${store.filtros.precio[1]}`}</span>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFecha">
                            <Form.Label>Fechas</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="fecha" 
                                value={store.filtros.fecha} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formIdioma">
                            <Form.Label>Idioma</Form.Label>
                            <Form.Control as="select" name="idioma" onChange={handleChange}>
                                <option value="">Seleccione un idioma</option>
                                <option value="espanol">Español</option>
                                <option value="ingles">Inglés</option>
                                <option value="aleman">Alemán</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBusqueda">
                            <Form.Label>Búsqueda</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="busqueda" 
                                value={store.filtros.busqueda} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCursoRelacionado">
                            <Form.Label>Cursos relacionados</Form.Label>
                            <Form.Control as="select" name="cursoRelacionado" onChange={handleChange}>
                                <option value="">Seleccione un curso</option>
                                <option value="curso1">Curso 1</option>
                                <option value="curso2">Curso 2</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <div className="botones">
                        <Button variant="primary" onClick={filtrosAplicar}>Aplicar</Button>
                        <Button variant="secondary" onClick={resetFiltros}>Restablecer</Button>
                    </div>
                </Row>
            </Form>
    
            {store.cursosConFiltros && store.cursosConFiltros.map(curso => (
                <div key={curso.id}>{curso.nombre}</div>
            ))}
        </div>
    );    
};

export default BarraBusqueda;