import React, { useState } from 'react';

export const ActivityModal = ({ show, handleClose, handleSave }) => {

    const [activities, setActivities] = useState([]); // Estado para almacenar las actividades
    const [newActivity, setNewActivity] = useState(''); // Estado para el valor de la nueva actividad

    // Maneja el cambio en el input de la nueva actividad
    const handleInputChange = (e) => {
        setNewActivity(e.target.value);
    };

    // Añade una nueva actividad a la lista
    const handleAddActivity = () => {
        if (newActivity.trim() !== '') {
            setActivities([...activities, newActivity]);
            setNewActivity(''); // Limpia el input después de agregar
        }
    };

    // Elimina una actividad de la lista
    const handleDeleteActivity = (index) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
    };

    // Maneja la acción de guardar cambios
    const handleSaveChanges = () => {
        handleSave(activities);
        handleClose(); // Cierra el modal después de guardar
    };

    return (
        <div className="modal" tabindex="-1" id="activityModal" aria-labelledby="activityModalLabel" aria-hidden="true" show={show} onHide={handleClose} centered>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">ShareTrips</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <h5>Día 1</h5>
                <div className="input-group" controlId="formNewActivity">
                    <input className="form-control rounded-pill" type="text" value={newActivity} onChange={handleInputChange} placeholder="Ingresar Actividad"></input>
                    <button type="button" className="btn rounded-pill" onClick={handleAddActivity}><i className="bi bi-plus-circle-fill"></i></button>   
                </div>
                

                <ul className="mt-3 list-group">
                        {activities.map((activity, index) => (
                        <li className="list-group-item d-flex justify-content-between" key={index}>
                            {activity}
                            <span ClassName="" onClick={() => handleDeleteActivity(index)}>  <i className="bi bi-backspace"></i></span>
                        </li>
                    ))}
                </ul>

            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Guardar</button>
            </div>
            </div>
        </div>
    </div>
);
};

export default ActivityModal;