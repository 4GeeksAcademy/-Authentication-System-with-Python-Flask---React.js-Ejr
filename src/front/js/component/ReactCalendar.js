import React from 'react';
import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import "../../styles/reactcalendar.css";

const ReactCalendar = ({ onDateChange, initialDate }) => {
  return (
    <div className="calendar-container">
      <Calendar
        compact
        bordered
        defaultValue={initialDate}
        onSelect={onDateChange}
      />
    </div>
  );
};

export default ReactCalendar;
