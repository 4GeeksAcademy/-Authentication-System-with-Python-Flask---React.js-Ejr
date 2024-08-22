import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/accountandappointmentcreated.css";
import logoAutoAgenda from "../../img/autoagendalogo1080.png";

const AccountAndAppointmentCreated = () => {
  const navigate = useNavigate();

  const userDashboard = () => {
    navigate("/userdashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 page-background">
      <div className="card padding text-center">
        <div className="card-body">
          <h1 className="card-header">Account and Appointment Created!</h1>
          <br />
          <p className="appointment-description">
            Thank you for creating an account and scheduling an appointment with us.
            <br />
            <br />
            A confirmation email has been sent to your provided email address.
            <br />
            <br />
            We look forward to seeing you soon!
          </p>
          <div className="mt-4">
            <button onClick={userDashboard} className="btn btn-secondary">
              User Dashboard
            </button>
            <br />
            <img
              src={logoAutoAgenda}
              className="autoAgendaLogo mt-3"
              alt="AutoAgenda Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAndAppointmentCreated;
