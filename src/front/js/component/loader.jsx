import React from 'react';

const Loader = ({ width = '100%', height = '10px' }) => {
  return (
    <div
      className="loader"
      style={{ '--loader-width': width, '--loader-height': height }}
    ></div>
  );
};

export default Loader;
