import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import backgroundImage from '/src/front/img/backgroundImage.png';

const PrincipalSection = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
                setIsExpanded(true); 
                setShowOverlay(true); 
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
                setIsExpanded(false);
                setShowOverlay(false); 
            }
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setIsExpanded(false);
        setShowOverlay(false); 
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('ended', handleVideoEnd);
        }
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended', handleVideoEnd);
            }
        };
    }, []);

    return (
        <div className={`principal-section text-center ${showOverlay ? 'blur-background' : ''}`} style={{ backgroundImage: `url(${backgroundImage})`, minHeight:"100vh", backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0' }}>
            {showOverlay && <div className="overlay"></div>}
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
            <div className='video-div'>
                <div className={`video-wrapper ${isExpanded ? 'video-centered' : ''}`}>
                    <video ref={videoRef} src="https://res.cloudinary.com/dxzhssh9m/video/upload/v1714159637/Proyecto_DEJ_4Geeks_epkohr.mp4" className="video" controls></video>
                    {!isPlaying && (
                        <button className="play-button" onClick={togglePlay}>▶</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrincipalSection;
