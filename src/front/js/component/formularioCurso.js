import React, { useState,useContext } from "react";
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
        modulos: ''
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
            modulos: ''
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
                </label>
                <label>Categoría
                    <input className="form-control" name="categoria" value={dataForm.categoria} placeholder="" onChange={handleChange} type="text"></input>
                </label>
                <label>Nivel
                    <input className="form-control" name="nivel" value={dataForm.nivel} placeholder="" onChange={handleChange} type="text"></input>
                </label>
                <label>Idioma
                    <input className="form-control" name="idioma" value={dataForm.idioma} placeholder="" onChange={handleChange} type="text"></input>
                    <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Elige un idioma
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Español</a></li>
                                <li><a className="dropdown-item" href="#">Inglés</a></li>
                                <li><a className="dropdown-item" href="#">Aleman</a></li>
                            </ul>
                        </div>
                </label>
                <input className="btn btn-primary" value="enviar" type="submit"/>
            </form>
        </div>
    );
};