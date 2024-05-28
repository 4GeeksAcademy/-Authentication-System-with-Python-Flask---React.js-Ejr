import React, { useState } from 'react';
import '../../styles/CardComponent.css';

const CardComponent = ({ icon, platformName, onInputChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState('');

  const handleExpandClick = () => setExpanded(true);
  const handleCollapseClick = (e) => {
    e.stopPropagation();
    setExpanded(false);
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    onInputChange(platformName, e.target.value);
  };

  return (
    <div className={`custom-card ${expanded ? 'expanded' : ''}`} onClick={!expanded ? handleExpandClick : undefined}>
      <div className="card-body">
        {expanded && <button className="close-button" onClick={handleCollapseClick}>X</button>}
        <img src={icon} alt={`${platformName} icon`} className="platform-icon" />
        {expanded && (
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
