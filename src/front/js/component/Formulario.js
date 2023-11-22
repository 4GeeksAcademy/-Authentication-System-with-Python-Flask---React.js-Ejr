import React, { useState } from 'react';

const Formulario = ({ onRegister, onReturn }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    comuna: 'Santiago Centro', // Valor por defecto
    oficio: 'Carpintería', // Valor por defecto
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // Puedes realizar alguna acción con los datos, por ejemplo, enviarlos a un servidor.
    onRegister(formData);
  };

  return (
    <div>
      <h2>Easy Job Form</h2>
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
      </label>
      <label>
        Apellido:
        <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} />
      </label>
      <label>
        Rut:
        <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} />
      </label>
      <label>
        Correo electrónico:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Teléfono:
        <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} />
      </label>
      <label>
        Fecha de nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Comuna:
        <select name="comuna" value={formData.comuna} onChange={handleSelectChange}>
          <option value="Santiago Centro">Santiago Centro</option>
          <option value="Independencia">Independencia</option>
          <option value="La Florida">La Florida</option>
          <option value="Providencia">Providencia</option>
          <option value="La Reina">La Reina</option>
        </select>
      </label>
      <label>
        Oficio:
        <select name="oficio" value={formData.oficio} onChange={handleSelectChange}>
          <option value="Carpintería">Carpintería</option>
          <option value="Electricista">Electricista</option>
          <option value="Gasfiteria">Gasfiteria</option>
          <option value="Pintor">Pintor</option>
          <option value="Aseo">Aseo</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Registrar</button>
      <button onClick={onReturn}>Regresar</button>
    </div>
  );
};

export default Formulario;