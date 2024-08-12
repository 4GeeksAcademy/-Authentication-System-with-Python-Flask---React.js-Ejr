import React, { useContext, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../../styles/barraBusqueda.css';
import { Context } from '../store/appContext';

const BarraBusqueda = () => {
    const { store, actions}=useContext(Context)
    // Extraer el estado y las acciones del store
    
    // Efecto para cargar los cursos al montar el componente
    useEffect(() => {
        cargarCursos(); // Llama a la acción para cargar los cursos
    }, [cargarCursos]);

    // Función para aplicar los filtros
    const filtrosAplicar = () => {
        aplicarFiltrosCursos(); // Llama a la acción para aplicar los filtros
    };

    // Función para restablecer los filtros
    const resetFiltros = () => {
        actualizarFiltros({
            categoria: "",
            valoracion: 0,
            nivel: "",
            precio: [0, 100],
            fecha: "",
            idioma: "",
            busqueda: "",
            cursoRelacionado: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        actualizarFiltros({ [name]: value });
    };

    if (loading) return <p>Loading...</p>; // Muestra un mensaje mientras se cargan los datos
    if (error) return <p>Error: {error}</p>; // Muestra un mensaje en caso de error

    return (
        <div className="barra-busqueda p-3">
            <Form>
                {/* Fila para Categorías, Valoraciones y Niveles */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formCategoria">
                            <Form.Label>Categorías</Form.Label>
                            <Form.Control as="select" name="categoria" value={filtros.categoria} onChange={handleChange}>
                                <option value="">Seleccione una categoría</option>
                                <option value="categoria1">Categoría 1</option>
                                <option value="categoria2">Categoría 2</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formValoracion">
                            <Form.Label>Valoraciones</Form.Label>
                            <div>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} onClick={() => actualizarFiltros({ valoracion: i + 1 })}>
                                        {i < filtros.valoracion ? "★" : "☆"}
                                    </span>
                                ))}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formNivel">
                            <Form.Label>Niveles</Form.Label>
                            <Form.Control as="select" name="nivel" value={filtros.nivel} onChange={handleChange}>
                                <option value="">Seleccione un nivel</option>
                                <option value="principiante">Principiante</option>
                                <option value="intermedio">Intermedio</option>
                                <option value="avanzado">Avanzado</option>
                                <option value="master">Máster</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                {/* Fila para Precios, Fechas e Idioma */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Precios</Form.Label>
                            <Form.Control 
                                type="range" 
                                min="0" 
                                max="100" 
                                name="precio" 
                                value={filtros.precio[1]} 
                                onChange={(e) => actualizarFiltros({ precio: [0, e.target.value] })} 
                            />
                            <span>{`$0 - $${filtros.precio[1]}`}</span>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFecha">
                            <Form.Label>Fechas</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="fecha" 
                                value={filtros.fecha} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formIdioma">
                            <Form.Label>Idioma</Form.Label>
                            <Form.Control as="select" name="idioma" value={filtros.idioma} onChange={handleChange}>
                                <option value="">Seleccione un idioma</option>
                                <option value="espanol">Español</option>
                                <option value="ingles">Inglés</option>
                                <option value="aleman">Alemán</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                {/* Fila para Búsqueda y Cursos relacionados */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formBusqueda">
                            <Form.Label>Búsqueda</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="busqueda" 
                                value={filtros.busqueda} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCursoRelacionado">
                            <Form.Label>Cursos relacionados</Form.Label>
                            <Form.Control as="select" name="cursoRelacionado" value={filtros.cursoRelacionado} onChange={handleChange}>
                                <option value="">Seleccione un curso</option>
                                <option value="curso1">Curso 1</option>
                                <option value="curso2">Curso 2</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                {/* Botones de Aplicar y Restablecer */}
                <Row>
                    <Col>
                        <Button variant="primary" onClick={filtrosAplicar}>Aplicar</Button>
                        <Button variant="secondary" onClick={resetFiltros} className="ml-2">Restablecer</Button>
                    </Col>
                </Row>
            </Form>
            {/* Mostrar los cursos filtrados */}
            {cursosConFiltros && cursosConFiltros.map(curso => (
                <div key={curso.id}>{curso.nombre}</div>
            ))}
        </div>
    );
};

export default BarraBusqueda;
