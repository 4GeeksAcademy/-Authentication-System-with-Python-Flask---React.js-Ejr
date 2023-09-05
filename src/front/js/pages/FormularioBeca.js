import React from 'react';
import "../../styles/Formulario.css";

const FormularioBeca = () => {
  return (
    <div className='container'>
      <h2 className='form-title'>Formulario Sobre Beca</h2>
      <div className='container-fluid p-3'>
        {/* first row starts here */}
        <div className='row m-3'>
          <div className='col-9'>
            <label htmlFor="nombreInstitucion" className="form-label">Institución</label>
            <input type="email" className="form-control" id="nombreInstitucion" placeholder='Nombre de la institución' />
          </div>
          <div className='col-3'>
            <label htmlFor="fechaLimite" className="form-label">Fecha Límite de Inscripción</label>
            <input type="email" className="form-control" id="fechaLimite" placeholder='DD/MM/AA' />
          </div>
        </div>
        {/* second row starts here */}
        <div className='row m-3 pt-3'>
          <div className='col-9'>
            <label htmlFor="nombreBeca" className="form-label">Nombre de la Beca por Ofrecer</label>
            <input type="email" className="form-control" id="nombreBeca" placeholder='Nombre de la Beca' />
          </div>
          <div className='col-3'>
            <label htmlFor="modalidadBeca" className="form-label">Presencial o Virtual?</label>
            <select class="form-select" id="modalidadBeca">
              <option selected disabled muted>Escoja una opción</option>
              <option value="1">Presencial</option>
              <option value="2">Virtual</option>
            </select>
          </div>
        </div>
        {/* third row starts here */}
        <div className='row m-3 pt-3'>
          <div className='col-6'>
            <label htmlFor="areaBeca" className="form-label">Área Profesional a la que Pertenece la Beca </label>
            <input type="areaProfesional" className="form-control" id="areaBeca" placeholder='Área Profesional de la Beca' />
          </div>
          <div className='col-4'>
            <label htmlFor="coberturaBeca" className="form-label">Cobertura Financiera de la Beca</label>
            <select class="form-select" id="coberturaBeca">
              <option selected disabled>Escoja una opción</option>
              <option value="1">Completa</option>
              <option value="2">Parcial</option>
            </select>
          </div>
        </div>
        {/* fourth row starts here */}
        <div className='row mt-3 mx-3 mb-4 pt-3'>
          <div className='col-6'>
            <label htmlFor="urlBeca" className="form-label">URL para la Página de Inscripción</label>
            <input type="email" className="form-control" id="urlBeca" placeholder='https://' />
            <button className='mt-4 button-post'>Publicar</button>
          </div>
          <div className='col-6'>
            <label for="descripcionBeca" class="form-label">Descripción de los Beneficios y Requerimientos para Participar</label>
            <textarea class="form-control" id="descripcionBeca" rows="4"></textarea>
          </div>
        </div>


      </div>
    </div>
  );
}

export default FormularioBeca;
