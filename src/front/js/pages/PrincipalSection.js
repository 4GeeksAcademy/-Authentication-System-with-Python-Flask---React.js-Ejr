import React from 'react';
import { Link } from "react-router-dom";
import backgroundImage from '/src/front/img/backgroundImage.png';

const PrincipalSection = () => {
    return (
        <div className="principal-section text-center" style={{ backgroundImage: `url(${backgroundImage})`, minHeight:"100vh", backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0' }}>
            <div className="description">
                <h1 className="description-title mt-5">Welcome to Urban Treasures</h1>
                <p className="description-text">Join the adventure and discover hidden treasures around you. Hide your own for others to find.</p>
            </div>
            <div className="action-buttons pt-5">
                <Link to="/treasures">
                    <button role="button" className="golden-button me-2">
                        <span className="golden-text">FIND TREASURES</span>
                    </button>
                </Link>
                <Link to="/hide">
                    <button role="button" className="golden-button">
                        <span className="golden-text">HIDE TREASURE</span>
                    </button>
                </Link>
            </div>
            <div className='video-div'><video src="https://res.cloudinary.com/dxzhssh9m/video/upload/v1714057201/video2_ykfqee.mp4" controls className="video"></video></div>
        </div>
    );
};

export default PrincipalSection
