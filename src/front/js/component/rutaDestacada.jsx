import React from 'react'
import "../../styles/rutaDestacada.css"

const RutaDestacada = () => {
  return (
  <div className=''>
    <div id="rutaDestacada1" class="carousel slide mt-3">
  <div class="carousel-inner  ">
    <div class="carousel-item active">
      <img src="https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg" class="d-block " alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg" class="d-block " alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg" class="d-block " alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#rutaDestacada1" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#rutaDestacada1" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<h3 className='mt-3 mb-4 ms-1'>Título de la ruta</h3>
  
  
  </div>


  )
}

export default RutaDestacada