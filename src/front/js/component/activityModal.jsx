import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext.js";


export const ActivityModal = () => {
    const { store, actions } = useContext(Context)
    const [activities, setActivities] = useState([]); // Estado para almacenar las actividades
    const [newActivity, setNewActivity] = useState(''); // Estado para el valor de la nueva actividad

    const handleKeyPress = (e) => {
        if(e.key === 'Enter')
            handleAddActivity()
    }

    // Maneja el cambio en el input de la nueva actividad
    const handleInputChange = (e) => {
        setNewActivity(e.target.value);
    };

    const handleAddActivity = () => {
        if (newActivity.trim() !== '') {
            setActivities([...activities, newActivity]);
            setNewActivity(''); // Limpia el input después de agregar
        }
    };

    const addDay = () => {
        const dayNumber = Object.keys(store.newItineraryData.itinerary).length + 1;

        actions.addDay(dayNumber, activities);

        const modalElement = document.getElementById('createDay');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        setNewActivity('');
        setActivities([]);
    }

    // Elimina una actividad de la lista
    const handleDeleteActivity = (index) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
    };

    return (
        <div className="modal" tabIndex="-1" id="createDay" aria-labelledby="createDayLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">ShareTrips</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <h5>Día {Object.keys(store.newItineraryData.itinerary).length + 1}</h5>
                <div className="input-group">
                    <input id='newActivity' className="form-control rounded-pill" type="text" value={newActivity} onKeyUp={handleKeyPress} onChange={handleInputChange} placeholder="Ingresar Actividad"></input>
                    <button type="button" className="btn rounded-pill" onClick={handleAddActivity}><i className="bi bi-plus-circle-fill"></i></button>   
                </div>
                
                <ul className="mt-3 list-group">
                        {activities.map((activity, index) => (
                        <li className="list-group-item d-flex justify-content-between" key={index}>
                            {activity}
                            <span className="" onClick={() => handleDeleteActivity(index)}><i className="bi bi-backspace"></i></span>
                        </li>
                    ))}
                </ul>

            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                <button onClick={addDay} type="button" className="btn btn-primary">Guardar</button>
            </div>
            </div>
        </div>
    </div>
);
};

export default ActivityModal;