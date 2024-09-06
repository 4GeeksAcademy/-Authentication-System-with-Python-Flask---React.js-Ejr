import React from 'react'

const DataAcordeon = ({data, index }) => {
  return (
    <div>
        
      
          <div className="accordion-item" key={data.id}>
            <h2 className="accordion-header" id={`heading${data.id}`}>
              <button
                className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} // Solo la primera sección abierta
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${data.id}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`collapse${data.id}`}
              >
                {data.pregunta}
              </button>
            </h2>
            <div
              id={`collapse${data.id}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`heading${data.id}`}
              data-bs-parent="#acordeonExample"
            >
              <div className="accordion-body">
              {data.respuesta}
              </div>
          </div>
        </div>
        
        
      </div>
 
  )
}

export default DataAcordeon