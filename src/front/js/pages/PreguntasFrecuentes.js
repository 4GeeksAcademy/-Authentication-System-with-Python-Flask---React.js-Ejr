import React, { useState } from 'react';
import "../../styles/preguntasfrecuentes.css";

const PreguntasFrecuentes = () => {
  const [q1Checked, setQ1Checked] = useState(false);
  const [q2Checked, setQ2Checked] = useState(false);
  const [q3Checked, setQ3Checked] = useState(false);
  const [q4Checked, setQ4Checked] = useState(false);
  const [q5Checked, setQ5Checked] = useState(false);

  const toggleQ1 = () => setQ1Checked(!q1Checked);
  const toggleQ2 = () => setQ2Checked(!q2Checked);
  const toggleQ3 = () => setQ3Checked(!q3Checked);
  const toggleQ4 = () => setQ4Checked(!q4Checked);
  const toggleQ5 = () => setQ5Checked(!q5Checked);

  return (
    <div className='container'>
      <div className="faq-header">Preguntas Frecuentes</div>

      <div className="faq-content">

        {/* question and answer box start */}
        <div className={`faq-question ${q1Checked ? 'open' : ''}`} onClick={toggleQ1}>
          <input id="q1" type="checkbox" className="panel" checked={q1Checked} onChange={toggleQ1} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">What is the meaning of life?</label>
            </div>
            {q1Checked && <div className="panel-content">se publican en lugares difíciles de encontrar o que toma mucho tiempo investigar al respecto para llegar a la oportunidad ideal para nosotros. Queremos que más personas tengan acceso a esta información y puedan realmente tener a su alcance oportunidades que puede cambiar la vida.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

            {/* question and answer box start */}
            <div className={`faq-question ${q2Checked ? 'open' : ''}`} onClick={toggleQ2}>
          <input id="q2" type="checkbox" className="panel" checked={q2Checked} onChange={toggleQ2} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">What is the meaning of life?</label>
            </div>
            {q2Checked && <div className="panel-content">se publican en lugares difíciles de encontrar o que toma mucho tiempo investigar al respecto para llegar a la oportunidad ideal para nosotros. Queremos que más personas tengan acceso a esta información y puedan realmente tener a su alcance oportunidades que puede cambiar la vida.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

         {/* question and answer box start */}
         <div className={`faq-question ${q3Checked ? 'open' : ''}`} onClick={toggleQ3}>
          <input id="q3" type="checkbox" className="panel" checked={q3Checked} onChange={toggleQ3} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">What is the meaning of life?</label>
            </div>
            {q3Checked && <div className="panel-content">se publican en lugares difíciles de encontrar o que toma mucho tiempo investigar al respecto para llegar a la oportunidad ideal para nosotros. Queremos que más personas tengan acceso a esta información y puedan realmente tener a su alcance oportunidades que puede cambiar la vida.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

  {/* question and answer box start */}
  <div className={`faq-question ${q4Checked ? 'open' : ''}`} onClick={toggleQ4}>
          <input id="q4" type="checkbox" className="panel" checked={q4Checked} onChange={toggleQ4} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">What is the meaning of life?</label>
            </div>
            {q4Checked && <div className="panel-content">se publican en lugares difíciles de encontrar o que toma mucho tiempo investigar al respecto para llegar a la oportunidad ideal para nosotros. Queremos que más personas tengan acceso a esta información y puedan realmente tener a su alcance oportunidades que puede cambiar la vida.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

         {/* question and answer box start */}
  <div className={`faq-question ${q5Checked ? 'open' : ''}`} onClick={toggleQ5}>
          <input id="q5" type="checkbox" className="panel" checked={q5Checked} onChange={toggleQ5} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">What is the meaning of life?</label>
            </div>
            {q5Checked && <div className="panel-content">se publican en lugares difíciles de encontrar o que toma mucho tiempo investigar al respecto para llegar a la oportunidad ideal para nosotros. Queremos que más personas tengan acceso a esta información y puedan realmente tener a su alcance oportunidades que puede cambiar la vida.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

        </div>
      </div>
  );
}

export default PreguntasFrecuentes