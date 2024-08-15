import React, { useState } from 'react';

function EditCarModal({ car, onSave, onClose, error }) {
  // Inicializa el estado usando las propiedades correctas
  const [updatedCar, setUpdatedCar] = useState({
    car_model: car.car_model || "",
    license_plate: car.license_plate || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Asegúrate de pasar el ID del coche junto con los datos actualizados
    onSave({ ...updatedCar, id: car.id });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Car</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Model</label>
              <input 
                type="text" 
                className="form-control" 
                name="car_model" 
                value={updatedCar.car_model} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">License Plate</label>
              <input 
                type="text" 
                className="form-control" 
                name="license_plate" 
                value={updatedCar.license_plate} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCarModal;
