import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/appointmentdetails.css";
import { Context } from "../store/appContext";


const apiUrl = process.env.BACKEND_URL + "/api";

const AppointmentDetails = () => {
  const { store } = useContext(Context);
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  
  const [appointment, setAppointment] = useState(null);
  const [service, setService] = useState(null);
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${apiUrl}/appointments/${appointmentId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...store.corsEnabled // Deshabilitar una vez en producción
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load appointment details");
        }

        const data = await response.json();
        setAppointment(data.result);

        if (data.result.service_id) {
          const serviceResponse = await fetch(`${apiUrl}/services/${data.result.service_id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              ...store.corsEnabled // Deshabilitar una vez en producción
            },
          });
          const serviceData = await serviceResponse.json();
          setService(serviceData.result);
        }

        if (data.result.car_id) {
          const carResponse = await fetch(`${apiUrl}/cars/${data.result.car_id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              ...store.corsEnabled // Deshabilitar una vez en producción
        }, 
          });
          const carData = await carResponse.json();
          setCar(carData.result);
        }

        if (data.result.user_id) {
          const userResponse = await fetch(`${apiUrl}/users/${data.result.user_id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              ...store.corsEnabled // Deshabilitar una vez en producción
        },
          });
          const userData = await userResponse.json();
          setUser(userData.result);
        }

        const commentsResponse = await fetch(`${apiUrl}/comments?appointment_id=${appointmentId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            ...store.corsEnabled // Deshabilitar una vez en producción
          },
        });
        const commentsData = await commentsResponse.json();

        setComments(commentsData);

      } catch (error) {
        console.error("Error loading appointment details:", error);
      }
    };

    loadAppointmentDetails();
  }, [appointmentId]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");
    const role_id = localStorage.getItem("role_id"); 
    const isMechanic = role_id === "2"; 

    if (newComment.trim()) {
      try {
        const response = await fetch(`${apiUrl}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...store.corsEnabled // Deshabilitar una vez en producción
          },
          body: JSON.stringify({
            comment: newComment,
            user_id: user.id,
            appointment_id: appointment.id,
            is_mechanic: isMechanic, 
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add comment");
        }

        const commentData = await response.json();

        const commentWithRole = {
          ...commentData,
          is_mechanic: isMechanic, 
        };

        setComments([...comments, commentWithRole]);
        setNewComment("");
        setError("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    } else {
      setError("Comment cannot be blank");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const handleBackClick = () => {
    navigate("/mechanicdashboard");
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container pt-5">
        <h1 className="text-center">Appointment Details</h1>
        <div className="text-end">
          <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
            Back to Dashboard
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-5">
            <div className="appointment-details">
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(appointment.date).toLocaleTimeString()}</p>
              <p><strong>Service:</strong> {service ? service.name : "Service data unavailable"}</p>
              <p><strong>Vehicle:</strong> {car ? car.car_model : "Car data unavailable"}</p>
              <p><strong>Client:</strong> {user ? user.name : "Client data unavailable"}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </div>
          </div>
          <div className="col-12">
            <p><strong>Comments:</strong></p>
            <ul>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <li key={index} className="m-3">
                    <strong>{comment.is_mechanic ? "Mechanic" : "Client"}:</strong> {comment.content} <small>({new Date(comment.timestamp).toLocaleString()})</small>
                  </li>
                ))
              ) : (
                <p>No comments available</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="appoinmentAddComments">
          <div className="mb-3">
            <label className="form-label">Add Comment</label>
            <input
              type="text"
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button className="btn btn-primary mt-2" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails;
