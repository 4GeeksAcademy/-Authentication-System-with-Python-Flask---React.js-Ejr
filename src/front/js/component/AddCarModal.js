import React, { useState } from 'react';

function AddCarModal({ onSave, onClose, error }) {
  const [newCar, setNewCar] = useState({ model: '', licensePlate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(newCar);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Car</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Model</label>
              <input type="text" className="form-control" name="model" value={newCar.model} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">License Plate</label>
              <input type="text" className="form-control" name="licensePlate" value={newCar.licensePlate} onChange={handleChange} />
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

export default AddCarModal;
