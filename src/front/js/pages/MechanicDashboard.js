import React from 'react';
import MechanicAppointmentList from '../component/MechanicAppointmentList';
import '../../styles/mechanicdashboard.css';

const MechanicDashboard = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center">Mechanic Dashboard</h1>
      <MechanicAppointmentList />
    </div>
  );
};

export default MechanicDashboard;
