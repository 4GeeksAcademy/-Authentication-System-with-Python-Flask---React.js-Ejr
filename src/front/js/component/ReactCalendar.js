import React from 'react';
import { Calendar, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; // Add this line to import rsuite styles

const ReactCalendar = ({ onDateChange }) => {
  return (
    <div style={{ width: 280 }}>
      <Calendar
        compact
        bordered
        onSelect={onDateChange} // Add onSelect handler to capture date changes
      />
    </div>
  );
};

export default ReactCalendar;
