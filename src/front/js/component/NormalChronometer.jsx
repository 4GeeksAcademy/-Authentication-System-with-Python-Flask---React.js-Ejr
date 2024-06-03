import React, { useState, useEffect, useRef } from 'react';

const Normaltimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(2);
    const [seriesCount, setSeriesCount] = useState(2);
    const [currentSeries, setCurrentSeries] = useState(1);
    const [showIntervalDropdown, setShowIntervalDropdown] = useState(false);
    const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1000); // Incrementa por segundos
            }, 1000);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        const intervalMillis = intervalDuration * 60 * 1000;
        if (time >= intervalMillis && isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setAlertMessage(`Intervalo ${currentSeries} terminado!`);
            setTimeout(() => {
                setAlertMessage('');
                if (currentSeries < seriesCount) {
                    setCurrentSeries(prevSeries => prevSeries + 1);
                    setTime(0);
                    setAlertMessage(`Continuando con la siguiente serie...`);
                    setTimeout(() => {
                        setAlertMessage('');
                        setIsRunning(true);
                    }, 10000); // Espera 10 segundos antes de comenzar la siguiente serie
                } else {
                    setAlertMessage('¡Ronda de ejercicios terminada!');
                }
            }, 10000); // La alerta dura 10 segundos
        }
    }, [time, isRunning, intervalDuration, seriesCount, currentSeries]);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setCurrentSeries(1);
        setAlertMessage('');
    };

    const handleIntervalChange = (event) => {
        setIntervalDuration(parseInt(event.target.value));
        setShowIntervalDropdown(false);
    };

    const handleSeriesChange = (event) => {
        setSeriesCount(parseInt(event.target.value));
        setShowSeriesDropdown(false);
    };

    const formatTime = (time) => {
        const totalSeconds = Math.floor(time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const cuerpoStyle = {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '300%',
        fontFamily: 'calibri',
        color: 'white',
        background: 'linear-gradient(skyblue, white)',
        position: 'relative'
    };
    const marcoStyle = {
        borderRadius: '30px',
        background: 'black',
        padding: '30px',
        border: '5px solid white',
        textAlign: 'center'
    };
    const btnStyle = {
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '60%',
        padding: '20px'
    };
    const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px'
    };
    const dropdownStyle = {
        margin: '5px',
        padding: '10px',
        fontSize: '1em'
    };
    const appStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '1em'
    };
    const timeCircleStyle = {
        borderRadius: '50%',
        border: '10px solid white',
        width: '250px',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px'
    };
    const timeStyle = {
        fontSize: '40px',
        textAlign: 'center',
        wordBreak: 'break-all'
    };
    const buttonsStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    };
    const alertStyle = {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px 20px',
        borderRadius: '5px',
        border: '1px solid #f5c6cb',
        textAlign: 'center',
        fontSize: '1.5em'
    };

    return (
        <div style={cuerpoStyle}>
            <div style={marcoStyle}>
                <h1>Cronómetro</h1>
                {alertMessage && <div style={alertStyle}>{alertMessage}</div>}
                <div className="app" style={appStyle}>
                    <div className='time-circle' style={timeCircleStyle}>
                        <div className="time" style={timeStyle}>
                            {formatTime(time)}
                        </div>
                    </div>
                </div>
                <div style={inputContainerStyle}>
                    <label>Configurar cronómetro:</label>
                    <div style={dropdownStyle}>
                        <label>Duración del intervalo (minutos):</label>
                        <button onClick={() => setShowIntervalDropdown(!showIntervalDropdown)}>
                            {intervalDuration} minutos
                        </button>
                        {showIntervalDropdown && (
                            <select value={intervalDuration} onChange={handleIntervalChange}>
                                {[...Array(99)].map((_, i) => (
                                    <option key={i + 2} value={i + 2}>{i + 2}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div style={dropdownStyle}>
                        <label>Cantidad de series:</label>
                        <button onClick={() => setShowSeriesDropdown(!showSeriesDropdown)}>
                            {seriesCount} series
                        </button>
                        {showSeriesDropdown && (
                            <select value={seriesCount} onChange={handleSeriesChange}>
                                {[...Array(9)].map((_, i) => (
                                    <option key={i + 2} value={i + 2}>{i + 2}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                <div className="app" style={appStyle}>
                    <div className="buttons" style={buttonsStyle}>
                        <button className="play-pause" style={btnStyle} onClick={handleStart}>
                            <i className="fa fa-play fa-2x" />
                        </button>
                        <button className="play-pause" style={btnStyle} onClick={handleStop}>
                            <i className="fa fa-pause fa-2x" />
                        </button>
                        <button className="reset" style={btnStyle} onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Normaltimer;
