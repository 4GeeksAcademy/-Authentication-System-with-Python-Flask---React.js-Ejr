import React, { useState, useEffect, useRef } from 'react';

const TabataTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const intervalRef = useRef(null);

  const [workMinutes, setWorkMinutes] = useState(0);
  const [workSeconds, setWorkSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [totalRounds, setTotalRounds] = useState(8);

  const [showWorkModal, setShowWorkModal] = useState(false);
  const [showRestModal, setShowRestModal] = useState(false);
  const [showRoundsModal, setShowRoundsModal] = useState(false);

  const [isConfigured, setIsConfigured] = useState(false);

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

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

  useEffect(() => {
    const workDuration = workMinutes * 60 + workSeconds;
    if (time === workDuration && isWork) {
      if (round < totalRounds) {
        setShowPopupMessage('Tan solo una más, ¡tú puedes!', 3000);
        setIsWork(false);
        setTime(0);
      } else {
        setShowPopupMessage('Ronda de trabajo finalizada, ¡felicidades!', 3000);
        setIsRunning(false);
        setTime(0);
        setRound(1);
        setIsWork(true);
      }
    } else if (time === restSeconds && !isWork) {
      setIsWork(true);
      setTime(0);
      setRound(prevRound => prevRound + 1);
      if (round < totalRounds) {
        setShowPopupMessage(`Enhorabuena, esta es tu ronda número ${round + 1}`, 3000);
      }
    }
  }, [time, isWork, round, workMinutes, workSeconds, restSeconds, totalRounds]);

  const setShowPopupMessage = (message, duration) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), duration);
  };

  useEffect(() => {
    if (isRunning && isWork && time === 0) {
      setShowPopupMessage('En sus marcas, listos, ¡vamos!', 3000);
    }
    if (isRunning && !isWork && time === 0) {
      setShowPopupMessage('Aprovecha de tomar y descansar un poco', restSeconds * 3000);
    }
  }, [isRunning, isWork, time, restSeconds]);

  const openWorkModal = () => setShowWorkModal(true);
  const closeWorkModal = () => setShowWorkModal(false);
  const openRestModal = () => setShowRestModal(true);
  const closeRestModal = () => setShowRestModal(false);
  const openRoundsModal = () => setShowRoundsModal(true);
  const closeRoundsModal = () => setShowRoundsModal(false);

  const handleSaveWork = (newWorkMinutes, newWorkSeconds) => {
    setWorkMinutes(newWorkMinutes);
    setWorkSeconds(newWorkSeconds);
    setIsConfigured(true);
    closeWorkModal();
  };

  const handleSaveRest = (newRestSeconds) => {
    setRestSeconds(newRestSeconds);
    setIsConfigured(true);
    closeRestModal();
  };

  const handleSaveRounds = (newTotalRounds) => {
    setTotalRounds(newTotalRounds);
    setIsConfigured(true);
    closeRoundsModal();
  };

  const handleStart = () => {
    if (isConfigured) {
      setIsRunning(true);
    } else {
      alert('Por favor configure los tiempos antes de empezar.');
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setRound(1);
    setIsWork(true);
  };

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
    fontSize: '1em',
    marginBottom: '20px'
  };

  const buttonsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  };

  const popupStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '10px',
    zIndex: 1000
  };

  return (
    <div style={cuerpoStyle}>
      <div style={marcoStyle}>
        <h1>Tabata Timer</h1>
        <div className="app" style={appStyle}>
          <div className='time-circle' style={timeCircleStyle}>
            <div className="time">
              {formatTime(time)}
            </div>
          </div>
        </div>
        <div>
          <button className="config-button" style={btnStyle} onClick={openWorkModal}>
            Configurar Trabajo
          </button>
          <button className="config-button" style={btnStyle} onClick={openRestModal}>
            Configurar Descanso
          </button>
          <button className="config-button" style={btnStyle} onClick={openRoundsModal}>
            Configurar Rondas
          </button>
        </div>
        <div>
          <span>Ronda: {round} / {totalRounds}</span>
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
      {showPopup && <div style={popupStyle}>{popupMessage}</div>}
      {showWorkModal && (
        <WorkModal
          workMinutes={workMinutes}
          workSeconds={workSeconds}
          onSave={handleSaveWork}
          onClose={closeWorkModal}
        />
      )}
      {showRestModal && (
        <RestModal
          restSeconds={restSeconds}
          onSave={handleSaveRest}
          onClose={closeRestModal}
        />
      )}
      {showRoundsModal && (
        <RoundsModal
          totalRounds={totalRounds}
          onSave={handleSaveRounds}
          onClose={closeRoundsModal}
        />
      )}
    </div>
  );
};

const WorkModal = ({ workMinutes, workSeconds, onSave, onClose }) => {
  const [newWorkMinutes, setNewWorkMinutes] = useState(workMinutes);
  const [newWorkSeconds, setNewWorkSeconds] = useState(workSeconds);

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  };

  const modalInputStyle = {
    marginBottom: '10px'
  };

  const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Configurar Trabajo</h2>
        <div style={modalInputStyle}>
          <label>Minutos de Trabajo:</label>
          <input
            type="number"
            value={newWorkMinutes}
            onChange={(e) => setNewWorkMinutes(Number(e.target.value))}
            min="0"
          /> min
        </div>
        <div style={modalInputStyle}>
          <label>Segundos de Trabajo:</label>
          <input
            type="number"
            value={newWorkSeconds}
            onChange={(e) => setNewWorkSeconds(Number(e.target.value))}
            min="0"
            max="59"
          /> sec
        </div>
        <div style={modalButtonsStyle}>
          <button onClick={() => onSave(newWorkMinutes, newWorkSeconds)}>
            Guardar
          </button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

const RestModal = ({ restSeconds, onSave, onClose }) => {
  const [newRestSeconds, setNewRestSeconds] = useState(restSeconds);

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  };

  const modalInputStyle = {
    marginBottom: '10px'
  };

  const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Configurar Descanso</h2>
        <div style={modalInputStyle}>
          <label>Segundos de Descanso:</label>
          <input
            type="number"
            value={newRestSeconds}
            onChange={(e) => setNewRestSeconds(Number(e.target.value))}
            min="0"
            max="59"
          /> sec
        </div>
        <div style={modalButtonsStyle}>
          <button onClick={() => onSave(newRestSeconds)}>
            Guardar
          </button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

const RoundsModal = ({ totalRounds, onSave, onClose }) => {
  const [newTotalRounds, setNewTotalRounds] = useState(totalRounds);

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  };

  const modalInputStyle = {
    marginBottom: '10px'
  };

  const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Configurar Rondas</h2>
        <div style={modalInputStyle}>
          <label>Número de Rondas:</label>
          <input
            type="number"
            value={newTotalRounds}
            onChange={(e) => setNewTotalRounds(Number(e.target.value))}
            min="1"
          />
        </div>
        <div style={modalButtonsStyle}>
          <button onClick={() => onSave(newTotalRounds)}>
            Guardar
          </button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default TabataTimer;

