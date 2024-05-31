import React, { useState, useEffect, useRef } from 'react';

const TabataTimer = () => {
  // Estados para el cronómetro
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const intervalRef = useRef(null);

  // Estados para la configuración del usuario
  const [workMinutes, setWorkMinutes] = useState(0);
  const [workSeconds, setWorkSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [totalRounds, setTotalRounds] = useState(8); 

  // Actualización del tiempo cada segundo cuando el cronómetro está corriendo
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Lógica de las rondas y el cambio entre trabajo y descanso
  useEffect(() => {
    const workDuration = workMinutes * 60 + workSeconds;
    if (time === workDuration && isWork) {
      setIsWork(false);
      setTime(0);
    } else if (time === restSeconds && !isWork) {
      if (round < totalRounds) {
        setRound(prevRound => prevRound + 1);
        setIsWork(true);
        setTime(0);
      } else {
        setIsRunning(false);
      }
    }
  }, [time, isWork, round, workMinutes, workSeconds, restSeconds, totalRounds]);

  // Funciones para incrementar y decrementar los valores
  const increment = (setter) => setter(prev => prev + 1);
  const decrement = (setter) => setter(prev => (prev > 0 ? prev - 1 : 0));

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
    setTime(0);
    setRound(1);
    setIsWork(true);
  };

  // Función para formatear el tiempo en minutos y segundos
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
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
    width: '200px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2em',
    marginBottom: '20px'
  };

  const buttonsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  };

  return (
    <div style={cuerpoStyle}>
      <div style={marcoStyle}>
        <h1>Tabata Timer</h1>
        <div style={inputContainerStyle}>
          <div style={inputStyle}>
            <label>Duración de Trabajo: </label>
            <button style={buttonStyle} onClick={() => decrement(setWorkMinutes)}>-</button>
            <span>{workMinutes} min</span>
            <button style={buttonStyle} onClick={() => increment(setWorkMinutes)}>+</button>
            <button style={buttonStyle} onClick={() => decrement(setWorkSeconds)}>-</button>
            <span>{workSeconds} sec</span>
            <button style={buttonStyle} onClick={() => increment(setWorkSeconds)}>+</button>
          </div>
          <div style={inputStyle}>
            <label>Duración de Descanso: </label>
            <button style={buttonStyle} onClick={() => decrement(setRestSeconds)}>-</button>
            <span>{restSeconds} sec</span>
            <button style={buttonStyle} onClick={() => increment(setRestSeconds)}>+</button>
          </div>
          <div style={inputStyle}>
            <label>Rondas: </label>
            <button style={buttonStyle} onClick={() => decrement(setTotalRounds)}>-</button>
            <span>{totalRounds}</span>
            <button style={buttonStyle} onClick={() => increment(setTotalRounds)}>+</button>
          </div>
        </div>
        <div>
          <span>{isWork ? 'Entrenamiento' : 'Descanso'}: {formatTime(time)}</span>
        </div>
        <div>
          <span>Ronda: {round} / {totalRounds}</span>
        </div>

        <div className="app" style={appStyle}>
          <div className='time-circle' style={timeCircleStyle}>
            <div className="time">
              {formatTime(time)}
            </div>
          </div>
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

export default TabataTimer;
