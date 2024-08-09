import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoAutoAgenda from "../../img/autoagendalogo1080.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    actions.logout();
    handleNavCollapse();
    navigate("/login");
  };

  const userRole = null; // Placeholder: replace with actual user role check ('client', 'mechanic', 'admin')

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={logoAutoAgenda}
            className="mr-3 h-6 sm:h-9"
            alt="AutoAgenda Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleNavCollapse}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              {userRole === null && (
                <Link
                  to="/bookappointment"
                  className="nav-link"
                  onClick={handleNavCollapse}
                >
                  Book an Appointment
                </Link>
              )}
              {userRole === "client" && (
                <Link
                  to="/createappointmentregistereduser"
                  className="nav-link"
                  onClick={handleNavCollapse}
                >
                  Create New Appointment
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-link"
                onClick={handleNavCollapse}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {userRole === null && (
              <>
                <Link
                  to="/login"
                  className="btn btn-primary me-2"
                  onClick={handleNavCollapse}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                  onClick={handleNavCollapse}
                >
                  Signup
                </Link>
              </>
            )}
            {userRole === "client" && (
              <>
                <Link
                  to="/userdashboard"
                  className="btn btn-secondary me-2"
                  onClick={handleNavCollapse}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
                <div className="row">
                  <div className="profile-header-container">
                    <div className="role-label-container">
                      <span className="label label-default role-label">
                        Client
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {userRole === "mechanic" && (
              <>
                <Link
                  to="/mechanicdashboard"
                  className="btn btn-secondary me-2"
                  onClick={handleNavCollapse}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
                <div className="row">
                  <div className="profile-header-container">
                    <div className="role-label-container">
                      <span className="label label-default role-label">
                        Mechanic
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {userRole === "admin" && (
              <>
                <Link
                  to="/admindashboard"
                  className="btn btn-secondary me-2"
                  onClick={handleNavCollapse}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
                <div className="row">
                  <div className="profile-header-container">
                    <div className="role-label-container">
                      <span className="label label-default role-label">
                        Admin
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};



// # Routes de CredentialsContainer, copia de seguridad:

@api.route('/appointments', methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    date = data.get('date')
    user_id = data.get('user_id')
    car_id = data.get('car_id')
    service_id = data.get('service_id')
    
    if not date or not user_id or not car_id or not service_id:
        return jsonify({"error": "Date, user ID, car ID, and service ID are required"}), 400
    
    existing_user = User.query.filter_by(id=user_id).first()
    if not existing_user:
        return jsonify({"error": "Bad user_id"}), 400
    service = Service.query.get(service_id)

    if not service:
        return jsonify({"error": "Service not found"}), 404

    max_appointments_per_hour = Setting.query.first().max_appointments_per_hour

    start_time = datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
    end_time = start_time + timedelta(hours=1)

    appointments_in_hour = Appointment.query.filter(
        Appointment.date >= start_time,
        Appointment.date < end_time
    ).all()

    total_slots_booked = sum([app.service.slots_required for app in appointments_in_hour])

    if (total_slots_booked + service.slots_required) <= max_appointments_per_hour:
        new_appointment = Appointment(
            date=start_time,
            user_id=user_id,
            car_id=car_id,
            service_id=service_id,
            status="pending"
        )
        db.session.add(new_appointment)
        db.session.commit()

        response_body = new_appointment.serialize()
        return jsonify(response_body), 201
    else:
        return jsonify({"error": "No available slots for this time"}), 400