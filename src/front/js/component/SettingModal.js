import React, { useState } from 'react';

function SettingModal({ onClose }) {
  const [maxAppointments, setMaxAppointments] = useState(4);

  const handleSave = () => {
    // Logic to save the new value
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Max Appointments per Hour</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input 
              type="number" 
              className="form-control"
              value={maxAppointments} 
              onChange={(e) => setMaxAppointments(e.target.value)} 
            />
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

export default SettingModal;
