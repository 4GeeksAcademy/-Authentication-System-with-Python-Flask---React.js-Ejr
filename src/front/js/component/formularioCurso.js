import React, { useState,useContext } from "react";
import { Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext";

export const FormularioCurso = () =>{
    const { store, actions } = useContext(Context);
    const [dataForm,setDataForm]=useState({
        title: '',
        portada: '',
        resumen: '',
        categoria: '',
        nivel: '',
        idioma: '',
    })

    const handleChange = (e) =>{
        const{name,value}=e.target
        setDataForm({...dataForm, [name]: value})
    }

    const handleSubmit = (e) =>{ 
        e.preventDefault() //evita que se recargue la página
        actions.crearCurso(dataForm)
        setDataForm({
            title: '',
            portada: '',
            resumen: '',
            categoria: '',
            nivel: '',
            idioma: '',
        }) 
        console.log(dataForm)
    }

    return(<div>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
			    <label>Título
                    <input className="form-control" name="title" value={dataForm.title} placeholder="" onChange={handleChange} type="text"></input>
                </label>
                <label>Portada
                    <input className="form-control" name="portada" value={dataForm.portada} placeholder="" onChange={handleChange} type="text"></input>
                </label>
			    <label>Resumen
                    <input className="form-control" name="resumen" value={dataForm.resumen} placeholder="" onChange={handleChange} type="text"></input>
                    <div class="col-md-6 mb-3">
                        <label for="Message" class="form-label">Message</label>
                        <textarea class="form-control" id="Message" rows="3"></textarea>
                    <p class="text-secondary">Add any notes here.</p>
                </div>
                </label>
                <label>Categoría
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-categoria" title={dataForm.categoria || "Seleccionar categoría"}>
                            {dataForm.categoria || "Seleccionar categoría"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'categoria', value: "Desarrollo" } })}>
                                Desarrollo               
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'categoria', value: "Negocios" } })}>
                                Negocios
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'categoria', value: "Diseño" } })}>
                                Diseño
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </label>
                <label>Nivel
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-nivel" title={dataForm.nivel || "Seleccionar nivel"}>
                            {dataForm.categoria || "Seleccionar nivel"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Principiante" } })}>
                                Principiante               
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Intermedio" } })}>
                                Intermedio
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Avanzado" } })}>
                                Avanzado
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Master" } })}>
                                Master
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </label>
                <label>Precio
                    <input className="form-control" name="precio" value={dataForm.precio} placeholder="" onChange={handleChange} type="range" min="0" max="350">{dataForm.precio}</input>
                </label>        
                <label>Idioma
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-idioma" title={dataForm.idioma || "Seleccionar idioma"}>
                            {dataForm.idioma || "Seleccionar idioma"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "Español" } })}>
                                Español               
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "Inglés" } })}>
                                Inglés
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "Aleman" } })}>
                                Alemán
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </label>
                <input className="btn btn-primary" value="enviar" type="submit"/>
            </form>
        </div>
    );
};