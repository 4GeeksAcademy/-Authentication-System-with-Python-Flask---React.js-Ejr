import React from 'react'

const CardAyuda = ({text}) => {
  
  return (
    <div className='col-4 bg-white text-danger w-40 mx-2 rounded'>
      <div>Iconos</div>
      <h3>{text}</h3>
      <hr/>
      <p>Descripcion</p>
    </div>
  )
}

export default CardAyuda