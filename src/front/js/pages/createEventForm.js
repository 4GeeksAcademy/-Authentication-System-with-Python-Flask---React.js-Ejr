import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';


function CreateEventForm() {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getCategories();
  }, [actions]);

  const [formData, setFormData] = useState({
    evento: '',
    ciudad: '',
    ubicacion: '',
    descripcion: '',
    fecha: '',
    precio: '',
    max_personas: '',
    categoria: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await actions.crearEvento(formData);
  };

  return (
    <div className='row'>
      <h2>Create Event</h2>
      <form className='col-sm-12 col-md-6 col-lg-3' onSubmit={handleSubmit}>
        <label htmlFor="evento">Evento: </label>
        <input type="text" name='evento' value={formData.evento} onChange={handleChange} required /><br />

        <label htmlFor="ciudad">Ciudad: </label>
        <input type="text" name='ciudad' value={formData.ciudad} onChange={handleChange} /><br required/>

        <label htmlFor="ubicacion">Ubicacion: </label>
        <input type="text" name='ubicacion' value={formData.ubicacion} onChange={handleChange} required/>

        <label htmlFor="descripcion">Descripcion: </label>
        <input type="text" name='descripcion' value={formData.descripcion} onChange={handleChange} required /><br />

        <label htmlFor="fecha">Fecha: </label>
        <input type="date" name='fecha' value={formData.fecha} onChange={handleChange} required /><br />

        <label htmlFor="precio">Precio: </label>
        <input type="text"  name='precio' value={formData.precio} onChange={handleChange}required/><br />

        <label htmlFor="max_personas">Max personas: </label>
        <input type="text" name='max_personas' value={formData.max_personas} onChange={handleChange} required/><br />

        <label htmlFor="categoria">Categoria: </label>
        {/* <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required /><br /> */}
        <select class="form-select"  name='categoria' value={formData.categoria} onChange={handleChange} aria-label="Default select example">
          <option selected>Open this select menu</option>
          {store.categories?.map((el,i) => <option key={i} value={el.id}>{el.categoria}</option> )}
          
        </select>

        <input type="submit" value="Create Event" />
      </form>
    </div>
  );
}

export default CreateEventForm;