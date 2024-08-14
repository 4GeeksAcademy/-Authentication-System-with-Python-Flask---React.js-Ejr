import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../styles/CustomArrows.css';

const CustomArrows = ({ className, onClick, onMouseEnter, onMouseLeave }) => {
  const icon = className === 'slick-prev' ? faChevronLeft : faChevronRight;

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon icon={icon} className="arrow-icon" />
    </div>
  );
};

CustomArrows.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default CustomArrows;
