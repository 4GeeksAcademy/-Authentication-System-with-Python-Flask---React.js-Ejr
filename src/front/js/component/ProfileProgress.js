import React from 'react';
import CircularProgressBar from './CircularProgressBar';

const ProfileProgress = ({ progress }) => {
    return (
        <div className="card-body text-center">                
            <CircularProgressBar value={progress} />
            <div className="progress-text" style={{fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold'}}>
                {progress}%
            </div>
            <h5>Del perfil completado</h5>
        </div>
    );
};

export default ProfileProgress;
