import React, { useState, useEffect, useRef } from 'react';

const Normaltimer = () => {
    // Estados para el cronómetro
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [initialTime, setInitialTime] = useState({ hours: 0, minutes: 0, seconds: 0 }); // Estado para el tiempo inicial
    const intervalRef = useRef(null);

    // Actualización del tiempo cada 10 milisegundos cuando el cronómetro está corriendo
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    // Función para iniciar el cronómetro
    const handleStart = () => {
        setIsRunning(true);
    };

    // Función para detener el cronómetro
    const handleStop = () => {
        setIsRunning(false);
    };

    // Función para reiniciar el cronómetro
    const handleReset = () => {
        setIsRunning(false);
        setTime(
            initialTime.hours * 3600000 +
            initialTime.minutes * 60000 +
            initialTime.seconds * 1000
        );
    };

    // Función para establecer el tiempo inicial
    const handleSetInitialTime = (event) => {
        const { name, value } = event.target;
        setInitialTime(prevState => ({
            ...prevState,
            [name]: parseInt(value) || 0
        }));
    };

    // Función para formatear el tiempo en horas, minutos, segundos y milisegundos
    const formatTime = (time) => {
        const milliseconds = Math.floor(time / 10) % 100;  // Dos dígitos para milisegundos
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
        marginBottom: '20px'
    };
    const inputStyle = {
        display: 'flex',
        alignItems: 'center',
        margin: '5px 0'
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
        width: '250px',  // Ajustamos el tamaño del círculo
        height: '250px', // Ajustamos el tamaño del círculo
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px'
    };
    const timeStyle = {
        fontSize: '30px', // Ajustamos el tamaño de la fuente
        textAlign: 'center', // Aseguramos que el texto esté centrado
        wordBreak: 'break-all' // Aseguramos que el texto no se salga del contenedor
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
                <div className="app" style={appStyle}>
                    <div className='time-circle' style={timeCircleStyle}>
                        <div className="time" style={timeStyle}>
                            {formatTime(time)}
                        </div>
                    </div>
                </div>
                <div style={inputContainerStyle}>
                    <label>Establecer tiempo inicial:</label>
                    <div style={inputStyle}>
                        <label>Horas:</label>
                        <input type="number" name="hours" value={initialTime.hours} onChange={handleSetInitialTime} />
                    </div>
                    <div style={inputStyle}>
                        <label>Minutos:</label>
                        <input type="number" name="minutes" value={initialTime.minutes} onChange={handleSetInitialTime} />
                    </div>
                    <div style={inputStyle}>
                        <label>Segundos:</label>
                        <input type="number" name="seconds" value={initialTime.seconds} onChange={handleSetInitialTime} />
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
