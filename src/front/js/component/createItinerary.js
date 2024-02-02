import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/createItinerary.css';
import avatar1 from "../../img/avatar1.png";

const CreateItinerary = () => {
  const initialQuestions =
    {"Location":'We have 8 questions for you..Where do you want to go?',
    "Group size":'How many people are there in your group?',
    "Time at disposal":'How many days do you plan to stay?',
    "Time of the year":'What time of the year would you like to go?',
    "Interests":'What are your interests? Like food, history, nature, arts..',
    "Level of fitness":'What is your level of fitness?',
    "Dietary requirement":'Almost there, please indicate your dietary preferences?',
    "Budget":'And finally.. your daily budget?',};

  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    {
      "Location": null,
      "Group size": null,
      "Time at disposal": null,
      "Time of the year": null,
      "Interests": null,
      "Level of fitness": null,
      "Dietary requirement": null,
      "Budget": null,
    }
  );
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [quizInProgress, setQuizInProgress] = useState(true);

  const handleAnswerInput = (e) => {
    setUserAnswers(e.target.value);

    if (e.key === 'Enter') {
      askNextQuestion();
    }
  };

  const askNextQuestion = async () => {
    if (!quizInProgress) {
      return;
    }

    if (!userAnswers.trim()) {
      alert("Please provide an answer before moving to the next question.");
      return;
    }

    setUserAnswers([...userAnswers, userAnswers]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswers((oldValue) => (
      {
      ...oldValue,
      [getKeyByIndex()]: answer
      }
      ));

    if (currentQuestionIndex === 8 ) {
      const response = await fetch(process.env.BACKEND_URL + '/api/createItinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAnswers }),
      });

      const result = await response.json();

      if (response.ok) {
        setGeneratedItinerary(result);
        setQuizInProgress(false);
      } else {
        console.error('Error generating itinerary:', result.error);
      }
    }
  };

  const handleSaveItinerary = async () => {
    try {
      const accessToken = getActions().getAccessToken();

      const response = await fetch('/saveItinerary', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itineraryDetails: generatedItinerary,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('Error saving itinerary:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleStartAgain = () => {
    setQuestions(initialQuestions);
    setUserAnswers([]);
    setGeneratedItinerary(null);
    setQuizInProgress(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && currentQuestionIndex === 0) {
        handleStartAgain();
      }
    };

    if (currentQuestionIndex === 0) {
      document.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentQuestionIndex]);

  const getKeyByIndex = () => {
    return Object.keys(questions)[currentQuestionIndex]
  };

  return (
    <>
      <div className="container">
        <div className="avatar-container" id='avatarcontainer'>
          <div className="card mb-5">
            <div className='avatar-box '>
              <div className='avatar me-5' id='avatar-placeholder'><img src={avatar1} alt="avatar" id='avatar' /> </div>
              <div className='box n1 ' id='question'>
                  
                   {questions[getKeyByIndex()]}
              </div>
            </div>
            <div className="card-body">
              <p className="card-text" id='Dio'>Assistant DioDio</p>
              
                <div>
                  <input
                    type='text'
                    id='answerInput'
                    placeholder='Your answer'
                    value={userAnswers}
                    onChange={handleAnswerInput}
                    onKeyPress={handleAnswerInput}
                    required
                  />
                  <button id='nextbutton' onClick={askNextQuestion}>{'Next Question'}</button>
                </div>                           
                <button id='nextbutton' onClick={handleStartAgain}>Start Again</button>
            </div>
          </div>
          <div className='answer-box'>
            <div className='answer-item'>
              {generatedItinerary ? (
                <div>
                  <h3>Generated Itinerary</h3>
                  <p>{generatedItinerary}</p>
                  <Button onClick={handleSaveItinerary}>Save Itinerary</Button>
                </div>
              ) : (
                'AI Answer'
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
export default CreateItinerary;