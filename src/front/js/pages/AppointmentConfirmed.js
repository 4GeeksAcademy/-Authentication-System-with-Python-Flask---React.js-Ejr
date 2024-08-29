import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/appointmentconfirmed.css";
import logoAutoAgenda from "../../img/autoagendalogo1080.png";
import trustpilotLogo from "../../img/trustpilotlogo.png";
import googleReviewsLogo from "../../img/googlereviewslogo.png";

const AppointmentConfirmed = () => {
  const navigate = useNavigate();

  const userDashboard = () => {
    navigate("/userdashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 appointmentConfirmed-page-background">
      <div className="appointmentConfirmed-card padding text-center">
        <div className="appointmentConfirmed-card-body">
          <h1 className="appointmentConfirmed-card-header">Appointment Confirmed!</h1>
          <p className="appointmentConfirmed-description">
            <br />
            Thank you for confirming your appointment with us.
            <br />
            <br />
            A confirmation email has been sent to your provided email address.
            <br />
            <br />
            Please take a moment to rate us on:
          </p>
          <div className="d-flex justify-content-center appointmentConfirmed-mt-4">
            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="appointmentConfirmed-mx-3"
            >
              <img src={trustpilotLogo} alt="TrustPilot Logo" width="100" />
            </a>
            <a
              href="https://business.google.com/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="appointmentConfirmed-mx-3"
            >
              <img
                src={googleReviewsLogo}
                alt="Google Reviews Logo"
                width="100"
              />
            </a>
          </div>
          <div className="text-center appointmentConfirmed-mt-4">
            <button onClick={userDashboard} className="btn btn-secondary">
              User Dashboard
            </button>
            <br />
            <img
              src={logoAutoAgenda}
              className="appointmentConfirmed-logo mt-3"
              alt="AutoAgenda Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmed;
