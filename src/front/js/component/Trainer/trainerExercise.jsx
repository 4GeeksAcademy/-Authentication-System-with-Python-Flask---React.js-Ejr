import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store/appContext";
import { useParams } from 'react-router-dom';

const TrainerExercise = () => {
  const { store, actions } = useContext(Context);
  const [exercises, setExercises] = useState([]);
  const { id } = useParams();
  const [routine, setRoutine] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  useEffect(() => {
    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  const handleExerciseChange = (day, index, value) => {
    const newRoutine = { ...routine };
    newRoutine[day][index] = value;
    setRoutine(newRoutine);
  };

  const handleRepsChange = (day, index, reps) => {
    const newRoutine = { ...routine };
    const [exercise] = newRoutine[day][index].split(' ');
    newRoutine[day][index] = `${exercise} ${reps}x`;
    setRoutine(newRoutine);
  };

  const handleAddExercise = (day) => {
    const newRoutine = { ...routine };
    newRoutine[day].push('');
    setRoutine(newRoutine);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trainerDataId = 1;
    const user_id = id;

    const data = {
      trainer_data_id: trainerDataId,
      routine: {
        Monday: routine.monday,
        Tuesday: routine.tuesday,
        Wednesday: routine.wednesday,
        Thursday: routine.thursday,
        Friday: routine.friday,
        Saturday: routine.saturday,
        Sunday: routine.sunday
      }
    };

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/trainer/${user_id}/set_routine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + store.token
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Routine saved successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error saving routine:', errorData);
      }
    } catch (error) {
      console.error('Error saving routine:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
        <div key={day}>
          <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
          {routine[day].map((exercise, index) => (
            <div key={index}>
              <select
                value={exercise.split(' ')[0]} // Display only the exercise name
                onChange={(e) => handleExerciseChange(day, index, `${e.target.value} ${exercise.split(' ')[1] || ''}`)}
              >
                <option value="">Select exercise</option>
                {exercises.map(ex => (
                  <option key={ex.id} value={ex.exercise_name}>{ex.exercise_name}</option>
                ))}
              </select>
              <input
                type="number"
                value={exercise.split(' ')[1] ? exercise.split(' ')[1].replace('x', '') : ''}
                onChange={(e) => handleRepsChange(day, index, e.target.value)}
                placeholder="Reps"
                min="1"
              />
            </div>
          ))}
          <button type="button" onClick={() => handleAddExercise(day)}>Add Exercise</button>
        </div>
      ))}
      <button type="submit">Save Routine</button>
    </form>
  );
};

export default TrainerExercise;
