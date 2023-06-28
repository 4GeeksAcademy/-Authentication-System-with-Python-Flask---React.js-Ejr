import React from 'react';
import '/workspaces/Watacar_v2/src/front/styles/uploadproduct.css';

export const UploadProduct = () => {
  return (
    <div className='upload-container'>
      <div className='upload-box'>
        <div className='upload-innerbox'>
          <div className='upload-title'>
            <h3><strong>¿Qué vas a vender?</strong></h3>
          </div>

          <div className='row innerselect'>
            <div className='col-3 me-3'>
              <label htmlFor='name'> <h6><strong>Título</strong></h6> </label>
              <input className='select input-left' type='text' id='name' name='name' placeholder='Nombre' />
            </div>
 
            <div className='col-3 me-5 ms-5'>
              <label htmlFor='select-middle'> <h6><strong>Vehículo</strong></h6> </label>
              <select id='select-middle' name='select' className='select select-middle'>
                <option value='value1' selected>Coche</option>
                <option value='value2' >Moto</option>
                <option value='value3'>Remolque</option>
              </select>
            </div>

            <div className='col-3 ms-3'>
              <label htmlFor='select-right'> <h6><strong>Marca</strong></h6> </label>
              <select id='select-right' name='select' className='select select-right'>
                <option value='value1'>Value 1</option>
                <option value='value2' selected>Value 2</option>
                <option value='value3'>Value 3</option>
              </select>
            </div>
          </div>

          <div className='row innerselect'>
            <div className='col-3 me-3'>
              <label htmlFor='name'> <h6><strong>Precio</strong></h6> </label>
              <input className='select input-left' type='text' id='name' name='name' placeholder='400€' />
            </div>

            <div className='col-3 me-5 ms-5'>
              <label htmlFor='select-middle'> <h6><strong>Estado del vehículo</strong></h6> </label>
              <select id='select-middle' name='select' className='select select-middle'>
                <option value='value1' selected>Nuevo</option>
                <option value='value2'>Semi-nuevo</option>
              </select>
            </div>

            <div className='col-3 ms-3'>
              <label htmlFor='select-right'> <h6><strong>Kilómetros</strong></h6> </label>
              <select id='select-right' name='select' className='select select-right'>
                <option value='value1'>De x a x</option>
                <option value='value2' selected>De x a x</option>
                <option value='value3'>De x a x</option>
              </select>
            </div>
          </div>

          <div className='row innerselect'>
            <div className='col-3 me-3'>
              <label htmlFor='name'> <h6><strong>Año de fabricación</strong></h6> </label>
              <input className='select input-left' type='text' id='name' name='name' placeholder='Nombre' />
            </div>

            <div className='col-3 ms-5 me-5'>
              <label htmlFor='select-middle'> <h6><strong>Número de plazas</strong></h6> </label>
              <select id='select-middle' name='select' className='select select-middle'>
                <option value='value1'>2 plazas</option>
                <option value='value2' selected>4 plazas</option>
                <option value='value3'>Más de 4 plazas</option>
              </select>
            </div>

            <div className='col-3 ms-3'>
              <label htmlFor='select-right'> <h6><strong>Número de puertas</strong></h6> </label>
              <select id='select-right' name='select' className='select select-right'>
                <option value='value1'>2 puertas</option>
                <option value='value2' selected>4 puertas</option>
                <option value='value3'>Más de 4 puertas</option>
              </select>
            </div>
          </div>


          <div className='row innerselect'>
            <div className='col-3 me-3'>
              <label htmlFor='name'> <h6><strong>Cambio</strong></h6> </label>
              <select id='select-middle' name='select' className='select select-middle'>
                <option value='value1' selected>Automático</option>
                <option value='value2' >Manual</option>
              </select>
            </div>

            <div className='col-3 ms-5 me-5'>
              <label htmlFor='select-middle'> <h6><strong>Tipo de coche</strong></h6> </label>
              <select id='select-middle' name='select' className='select select-middle'>
                <option value='value1'>Value 1</option>
                <option value='value2' selected>Value 2</option>
                <option value='value3'>Value 3</option>
              </select>
            </div>

            <div className='col-3 ms-3'>
              <label htmlFor='select-right'> <h6><strong>Motor</strong></h6> </label>
              <select id='select-right' name='select' className='select select-right'>
                <option value='value1'>Value 1</option>
                <option value='value2' selected>Value 2</option>
                <option value='value3'>Value 3</option>
              </select>
            </div>
          </div>


          <div className='row innerselect'>
            <div className='col-3'> </div>

            <div className='col-3'>
              <label htmlFor='select-middle'> <h6><strong>Caballos</strong></h6> </label>
              <select id='select-middle' name='select' className='select select-middle'>
                <option value='value1'>De x a x</option>
                <option value='value2' selected>De x a x</option>
                <option value='value3'>De x a x</option>
              </select>
            </div>

            <div className='col-3'> </div>
          </div>
        </div>
      </div>
    </div>
  );
};
