import React, { useState } from 'react';
import { storage } from './firebaseConfig';

const UpdateEventForm = ({ event }) => {
  const [eventName, setEventName] = useState(event.name);
  const [eventDescription, setEventDescription] = useState(event.description);
  const [eventVenue, setEventVenue] = useState(event.venue);
  const [eventCity, setEventCity] = useState(event.city);
  const [eventCategory, setEventCategory] = useState(event.category);
  const [eventDate, setEventDate] = useState(event.date);
  const [eventPrice, setEventPrice] = useState(event.price);
  const [eventImage, setEventImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [percent, setPercent] = useState(0);

  const handleChange = (event) => {
    setEventImage(event.target.files[0]);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const eventData = {
        name: eventName,
        description: eventDescription,
        venue: eventVenue,
        city: eventCity,
        category: eventCategory,
        date: eventDate,
        price: eventPrice,
        image: eventImage ? eventImage : event.image, // Retain existing image if no new image selected
      };

      const response = await fetch(`${process.env.BACKEND_URL}/api/edit-event/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      console.log('Event updated successfully');
    } catch (error) {
      setError('An error occurred while updating the event');
      console.error('Error updating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/delete-event/${event.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      console.log('Event deleted successfully');
      // Optionally, redirect the user or perform other actions upon successful deletion
    } catch (error) {
      setError('An error occurred while deleting the event');
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container-full py-5 h-100 black-background">
      <div className="signup row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card custom-card shadow-2-strong" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5">
              <h2 className="mb-5">Update Your Event!</h2>
              <form onSubmit={handleUpdateEvent}>
                {/* Form fields */}
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event City"
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Category"
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Price"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    onChange={handleChange}
                  />
                </div>
                {percent > 0 && <p>{percent}% done</p>}
                {error && <p className="text-danger">{error}</p>}
                <div className="d-flex flex-column align-items-center mb-4">
                  <button className="btn btn-primary custom-btn" type="submit" disabled={loading}>
                    {loading ? 'Updating Event...' : 'Update Event'}
                  </button>
                  <button className="btn btn-danger mt-3" onClick={handleDeleteEvent}>Delete Event</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventForm;
