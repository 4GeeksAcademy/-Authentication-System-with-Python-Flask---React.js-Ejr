import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import Swal from 'sweetalert2'

const FormSolicitudProf = () => {
    const { store, actions } = useContext(Context);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [escolaridad, setEscolaridad] = useState(null);
    const [motivacion, setMotivacion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombreCompleto', nombreCompleto);
        formData.append('cedula', cedula);
        formData.append('correo', correo);
        formData.append('direccion', direccion);
        formData.append('motivacion', motivacion);

        // Verificar si hay archivos seleccionados
        if (escolaridad && escolaridad.length > 0) {
            Array.from(escolaridad).forEach(file => {
                formData.append('escolaridad', file);
            });
        }
       const correoEnviado = actions.solicitudProfesional(formData)
       if(correoEnviado){
        Swal.fire({
            text: "Se envío la solicitud correctamente.",
            icon: "success"
        });
       }
    };

    return (
        <div className="col-md-12 text-start profile-info">
            <h4 className="mb-3 text-inicio">Formulario de Solicitud de Perfil Profesional</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombreCompleto" className="form-label text-inicio"><strong>Nombre Completo</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombreCompleto" 
                        placeholder="Ingrese su nombre completo" 
                        value={nombreCompleto} 
                        onChange={(e) => setNombreCompleto(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cedula" className="form-label text-inicio"><strong>Cédula</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="cedula" 
                        placeholder="Ingrese su cédula" 
                        value={cedula} 
                        onChange={(e) => setCedula(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="correo" className="form-label text-inicio"><strong>Correo Electrónico</strong></label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="correo" 
                        placeholder="Ingrese su correo electrónico" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label text-inicio"><strong>Dirección</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="direccion" 
                        placeholder="Ingrese su dirección" 
                        value={direccion} 
                        onChange={(e) => setDireccion(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="escolaridad" className="form-label text-inicio"><strong>Escolaridad que Acredite Conocimientos</strong></label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="escolaridad" 
                        multiple 
                        onChange={(e) => setEscolaridad(e.target.files)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="motivacion" className="form-label text-inicio"><strong>¿Por qué quieres trabajar con nosotros?</strong></label>
                    <textarea 
                        className="form-control" 
                        id="motivacion" 
                        rows="4" 
                        placeholder="Cuéntanos tus motivaciones" 
                        value={motivacion} 
                        onChange={(e) => setMotivacion(e.target.value)} 
                        required
                    />
                </div>

                <div className="d-flex justify-content-center row mt-3">
                    <small className="text-inicio text-center">
                        En el caso de que el equipo de RRHH te considere un buen candidato para integrar nuestro equipo de profesionales, se pondrán en contacto a la brevedad para coordinar una entrevista.
                    </small>
                    <button type="submit" className="col-12 col-md-8 btn btn-primary btn-login-registro mt-3">Enviar Solicitud</button>
                </div>
            </form>
        </div>
    );
};

export default FormSolicitudProf;
