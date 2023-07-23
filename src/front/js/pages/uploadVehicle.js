import React, { useState, useEffect, useRef } from 'react';
import '/workspaces/Watacar_v2/src/front/styles/uploadproduct.css';
import { Link, useNavigate } from 'react-router-dom';

export const UploadVehicle = () => {
  const [mouseX, setMouseX] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const mouseX = e.clientX - containerRef.current.offsetLeft;
    const containerWidth = containerRef.current.clientWidth;
    const percentage = (mouseX / containerWidth) * 100;

    if (percentage >= 60) {
      setMouseX(100);
    } else if (percentage <= 40) {
      setMouseX(0);
    } else {
      setMouseX(percentage);
    }
  };

  useEffect(() => {
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      containerRef.current.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
 
        <div className=''>
          <div className='upload-title'>
            <h3>
              <strong>¿Qué Vehículo vas a vender?</strong>
            </h3>
          </div>

          <div className='  innerselect image-container' ref={containerRef}>
            <div className='image_vehicles bike' style={{ width: `${100 - mouseX}%` }}></div>
            <div className='image_vehicles car' style={{ width: `${mouseX}%` }}></div>
          </div>
        </div>
    
  );
};
