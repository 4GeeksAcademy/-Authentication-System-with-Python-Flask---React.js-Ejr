import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../store/appContext';


const EditarInformacion = ({perfil,setPerfil}) => {
    const { store, actions } = useContext(Context);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [codigoArea, setCodigoArea] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    // Establecer valores cuando perfil esté disponible
    useEffect(() => {
        if (perfil) {
            setNombre(perfil.nombre_usuario || '');
            setApellido(perfil.apellido || '');
            setDescripcion(perfil.descripcion || '');
            setTelefono(perfil.telefono || '');
            setCodigoArea(perfil.codigo_de_area || '');
            setFechaNacimiento(perfil.fecha_de_nacimiento || '')
        }
    }, [perfil]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario,
        // posiblemente llamando a una acción de 'actions' para actualizar el store
        console.log(nombre, apellido, descripcion, telefono, codigoArea, fechaNacimiento)
        console.log(perfil)
       const result = await actions.editarPerfil(nombre, apellido, descripcion, telefono, codigoArea, fechaNacimiento)
        if (result){
            setPerfil({...perfil, 
                nombre_usuario:nombre,
                apellido:apellido,
                descripcion:descripcion,
                telefono:telefono,
                codigoArea:codigoArea,
                fechaNacimiento:fechaNacimiento
            })
        }
    };

    return (
        <div className="col-md-12 text-start profile-info">
            <h4 className="mb-3 text-inicio">Editar Información Personal</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label text-inicio"><strong>Nombre</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Ingrese su nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label text-inicio"><strong>Apellido</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        placeholder="Ingrese su apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>
                {perfil && perfil.is_psicologo && (
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label text-inicio"><strong>Descripción profesional</strong></label>
                        <textarea
                            className="form-control"
                            id="descripcion"
                            rows="4"
                            placeholder="Ingrese una breve descripción sobre usted"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            style={{ resize: 'none' }}  // Ejemplo de estilos en línea
                            required
                        />
                    </div>
                )}


                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label text-inicio"><strong>Teléfono</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        placeholder="Ingrese su número de teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="codigo_de_area_input" className="form-label text-inicio"><strong>Código de Área</strong></label>
                    <input
                        list="codigos-pais"
                        className="form-control"
                        id="codigo_de_area_input"
                        name="codigo_de_area"
                        placeholder="+589"
                        value={codigoArea}
                        onChange={(e) => setCodigoArea(e.target.value)}
                        required
                    />
                    <datalist id="codigos-pais">
                        <option value="+54">Argentina (+54)</option>
                        <option value="+56">Chile (+56)</option>
                        <option value="+57">Colombia (+57)</option>
                        <option value="+52">México (+52)</option>
                        <option value="+595">Paraguay (+595)</option>
                        <option value="+51">Perú (+51)</option>
                        <option value="+598">Uruguay (+598)</option>
                        <option value="+58">Venezuela (+58)</option>
                    </datalist>
                </div>

                <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-inicio"><strong>Fecha de Nacimiento</strong></label>
                    <input
                        type="date"
                        className="form-control"
                        id="fechaNacimiento"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                    />
                </div>

                <div className="d-flex justify-content-center row mt-3">
                    <small className="text-inicio text-center">
                        La información que nos ha proporcionado será utilizada para actualizar su perfil personal.
                    </small>
                    <button type="submit" className="col-12 col-md-8 btn btn-primary btn-login-registro mt-3">Guardar Información</button>
                </div>
            </form>
        </div>
    );
};

export default EditarInformacion;
