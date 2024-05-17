import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store/appContext";
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';

const UserRoutine = () => {
    const { store, actions } = useContext(Context);
    const [routine, setRoutine] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const response = await fetch(`/api/user/${id}/actual_routine`, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setRoutine(data.actual_routine);
                } else {
                    console.error('Error fetching routine:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching routine:', error);
            }
        };

        fetchRoutine();
    }, [id, store.token]);

    if (!routine) {
        return <Loader />;
    }

    return (
        <div>
            <h2>Your Current Routine</h2>
            {Object.entries(routine).map(([day, exercises]) => (
                <div key={day}>
                    <h3>{day}</h3>
                    <ul>
                        {exercises.length > 0 ? (
                            exercises.map((exercise, index) => (
                                <li key={index}>{exercise}</li>
                            ))
                        ) : (
                            <li>Rest Day</li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default UserRoutine;