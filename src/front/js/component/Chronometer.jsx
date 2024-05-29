import React, { useState, useEffect, useRef } from 'react';
import styles from './Chronometer.css';

const TabataTimer = () => {
  // esto hace que los Estados manejen el tiempo, si está corriendo, la ronda actual y el estado de trabajo/descanso.
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const intervalRef = useRef(null);

  // Este useEffect es para actualizar el tiempo cada segundo cuando el cronómetro está corriendo.
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Aca esto realiza una limpieza del intervalo cuando el componente se desmonta.
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // useEffect para manejar la lógica de las rondas y el cambio entre trabajo y descanso.
  useEffect(() => {
    if (time === 20 && isWork) {
      setIsWork(false);
      setTime(0);
    } else if (time === 10 && !isWork) {
      if (round < 8) {
        setRound((prevRound) => prevRound + 1);
        setIsWork(true);
        setTime(0);
      } else {
        setIsRunning(false);
      }
    }
  }, [time, isWork, round]);

  // Función para iniciar el cronómetro.
  const handleStart = () => {
    setIsRunning(true);
  };

  // Función para detener el cronómetro.
  const handleStop = () => {
    setIsRunning(false);
  };

  // Función para reiniciar el cronómetro.
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setRound(1);
    setIsWork(true);
  };

  // Función para formatear el tiempo en minutos y segundos.
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="cuerpo">
      <div className="marco text-center">
        <h1>Tabata Timer</h1>
        <div>
          <span>{isWork ? 'Entrenamiento' : 'Descanso'}: {formatTime(time)}</span>
        </div>
        <div>
          <span>Ronda: {round} / 8</span>
        </div>
        <div className="botones-contenedor">
          <button className="btn" onClick={handleStart}>Iniciar</button>
          <button className="btn" onClick={handleStop}>Detener</button>
          <button className="btn" onClick={handleReset}>Reiniciar</button>
        </div>
      </div>
    </div>
  );
};

export default TabataTimer;
