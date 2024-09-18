import React from "react";
import PropTypes from "prop-types";

export const SessionCard = ({ imageSrc, gameName, time, date, players }) => (
  <div
    className="card mb-3 custom-div-sessions"
    style={{ border: "2px solid #6f42c1", borderRadius: "0.5rem" }}
  >
    <div className="row g-0">
      <div className="col-md-4">
        <img
          src={imageSrc}
          alt={gameName}
          className="img-fluid rounded-start"
          style={{ height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        className="col-md-8 d-flex flex-column rounded-2"
        style={{ backgroundColor: "#2a2a2a", color: "white", padding: "20px" }}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          <p className="card-text text-start mb-0">Game</p>
          <p className="card-text text-end mb-0">
            {" "}
            <i className="fas fa-user"></i> {players} jugadores
          </p>
        </div>
        <h5 className="card-title">{gameName}</h5>
        <p className="card-text">
          <i className="bi bi-clock"></i> {time}
        </p>
        <p className="card-text">
          <i className="bi bi-calendar"></i> {date}
        </p>
        <div className="d-flex justify-content-end mt-auto">
          <button className="btn custom-button">Join</button>
        </div>
      </div>
    </div>
  </div>
);

SessionCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  gameName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  players: PropTypes.number.isRequired,
};
