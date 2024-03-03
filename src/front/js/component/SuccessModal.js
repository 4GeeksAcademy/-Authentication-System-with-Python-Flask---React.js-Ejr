import React from 'react';
function SuccessModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Éxito</h2>
        <p>El evento ha sido creado exitosamente.</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
export default SuccessModal;