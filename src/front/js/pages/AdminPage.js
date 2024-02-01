import React, { useEffect, useState } from 'react';


export const AdminPage = () => {
 const [users, setUsers] = useState([]);
 const [selectedEmail, setSelectedEmail] = useState("");
 const [loading, setLoading] = useState(true);
 const [day, setDay] = useState("");
const [location, setLocation] = useState("");
const [meetingPoint, setMeetingPoint] = useState("");


 useEffect(() => {
    const routeRequirement = "/api/users";
    const url = `${process.env.BACKEND_URL}${routeRequirement}`;
    fetch(url)
 .then(response => response.json())
 .then(data => {
    setUsers(data.results);
    setLoading(false);
 })
      .catch(error => {
        console.error(`Error fetching users: ${error}`);
        setLoading(false);
      });
 }, []);

 const handlePromote = () => {
  const adminRouteRequirement = "/api/admin";
  const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
  
  fetch(url, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          email: selectedEmail
       }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message || data.error);
      alert('User updated successfully!'); 
    })
    .catch(error => {
      console.error(`Error promoting user: ${error}`);
    });
 };
 

 if (loading) {
    return <div>Loading...</div>;
 }

 const handleSubmit = (event) => {
  event.preventDefault();
 
  const adminRouteRequirement = "/api/event";
  const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
  
  const eventData = {
     day: day,
     location: location,
     meeting_point: meetingPoint,
     
  };
 
  fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(eventData),
  })
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
     })
     .catch((error) => {
       console.error('Error:', error);
     });
 };

 return (
    <div>
      <h3>Select and upgrade a user</h3>
      <select onChange={e => setSelectedEmail(e.target.value)}>
      {users.map(user => (
 <option key={user.email} value={user.email}>
    {user.email}
 </option>
        ))}
      </select>
      <button onClick={handlePromote}>Promote</button>
      <h3>Create the next event</h3>
      <form onSubmit={handleSubmit}>
    <label>
      Day:
      <input type="date" value={day} onChange={e => setDay(e.target.value)} />
    </label>
    <label>
      Location:
      <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
    </label>
    <label>
      Meeting Point:
      <input type="text" value={meetingPoint} onChange={e => setMeetingPoint(e.target.value)} />
    </label>
    <input type="submit" value="Submit" />
 </form>
    </div>
    
 );
};
