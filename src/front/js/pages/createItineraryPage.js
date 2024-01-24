import React from 'react';
import CreateItinerary from '../component/createItinerary.js';
import { Link } from 'react-router-dom';
import '../../styles/createItinerary.css';

const CreateItineraryPage = () => {
  return (
    <div className="form-container">
      <div className="page-title">CreateItinerary</div>
      <CreateItinerary />
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default CreateItineraryPage;