import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';


function CreateEventForm() {
  const {store, actions } = useContext(Context)
  useEffect(()=> {
    actions.getCategories()

  },[])
  const [formData, setFormData] = useState({
    title: '',
    eventType: '',
    date: '',
    time: '',
    duration: '',
    picture: '',
    description: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further validation here

    // You can now use the formData object as needed, for example, sending it to a server via AJAX
    console.log(formData);
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /><br />

        <label htmlFor="eventType">Type of Event:</label>
        <input type="text" id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} /><br />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required /><br />

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required /><br />

        <label htmlFor="duration">Duration (hours):</label>
        <input type="number" id="duration" name="duration" min="1" value={formData.duration} onChange={handleChange} required /><br />

        <label htmlFor="picture">Picture:</label>
        <input type="file" id="picture" name="picture" value={formData.picture} onChange={handleChange} /><br />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" rows="4" cols="50" value={formData.description} onChange={handleChange} required ></textarea><br />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required /><br />

        <input type="submit" value="Create Event" />
      </form>
    </div>
  );
}

export default CreateEventForm;