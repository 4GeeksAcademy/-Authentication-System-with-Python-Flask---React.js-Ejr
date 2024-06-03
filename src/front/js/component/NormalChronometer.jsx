import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Normaltimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [initialTime, setInitialTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [showAlert, setShowAlert] = useState(false);
    const intervalRef = useRef(null);

    const initialTimeInMilliseconds = 
        initialTime.hours * 3600000 +
        initialTime.minutes * 60000 +
        initialTime.seconds * 1000;

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime >= initialTimeInMilliseconds) {
                        clearInterval(intervalRef.current);
                        setShowAlert(true);
                        setIsRunning(false);
                        return prevTime;
                    }
                    return prevTime + 10;
                });
            }, 10);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, initialTimeInMilliseconds]);

    const handleStart = () => {
        setIsRunning(true);
        setShowAlert(false);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setShowAlert(false);
        setTime(initialTimeInMilliseconds);
    };

    const handleSetInitialTime = (event) => {
        const { name, value } = event.target;
        setInitialTime(prevState => ({
            ...prevState,
            [name]: parseInt(value) || 0
        }));
    };

    const formatTime = (time) => {
        const milliseconds = Math.floor(time / 10) % 100;
        const totalSeconds = Math.floor(time / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);

        const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    };

    const cuerpoStyle = {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '300%',
        fontFamily: 'calibri',
        color: 'white',
        background: 'linear-gradient(skyblue, white)'
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
        marginBottom: '20px',
        width: '100%'
    };

    const inputStyle = {
        display: 'flex',
        alignItems: 'center',
        margin: '5px 0',
        width: '100%'
    };

    const buttonStyle = {
        margin: '0 5px',
        padding: '5px 10px',
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
        fontSize: '30px',
        textAlign: 'center',
        wordBreak: 'break-all'
    };

    const buttonsStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    };

    return (
        <div style={cuerpoStyle}>
            <div style={marcoStyle}>
                <h1>Cronómetro</h1>
                {showAlert && (
                    <div className="alert alert-danger" role="alert">
                        ¡El tiempo ha terminado!
                    </div>
                )}
                <div className="app" style={appStyle}>
                    <div className='time-circle' style={timeCircleStyle}>
                        <div className="time" style={timeStyle}>
                            {formatTime(time)}
                        </div>
                    </div>
                </div>
                <div style={inputContainerStyle}>
                    <label className="mb-3">Establecer tiempo inicial:</label>
                    <div className="input-group mb-2" style={inputStyle}>
                        <span className="input-group-text">Horas</span>
                        <input type="number" className="form-control form-control-sm" name="hours" value={initialTime.hours} onChange={handleSetInitialTime} />
                    </div>
                    <div className="input-group mb-2" style={inputStyle}>
                        <span className="input-group-text">Minutos</span>
                        <input type="number" className="form-control form-control-sm" name="minutes" value={initialTime.minutes} onChange={handleSetInitialTime} />
                    </div>
                    <div className="input-group mb-2" style={inputStyle}>
                        <span className="input-group-text">Segundos</span>
                        <input type="number" className="form-control form-control-sm" name="seconds" value={initialTime.seconds} onChange={handleSetInitialTime} />
                    </div>
                </div>
                <div className="app" style={appStyle}>
                    <div className="buttons" style={buttonsStyle}>
                        <button className="btn btn-primary" style={buttonStyle} onClick={handleStart}>
                            Iniciar
                        </button>
                        <button className="btn btn-secondary" style={buttonStyle} onClick={handleStop}>
                            Pausar
                        </button>
                        <button className="btn btn-danger" style={buttonStyle} onClick={handleReset}>
                            Reiniciar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Normaltimer;
