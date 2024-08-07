import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'rsuite/dist/rsuite.min.css';

const DateTimePickerComponent = ({ onDateChange, initialDate }) => {
  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Select Date and Time"
          value={initialDate}
          onChange={(newValue) => onDateChange(newValue.toDate())}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateTimePickerComponent;
