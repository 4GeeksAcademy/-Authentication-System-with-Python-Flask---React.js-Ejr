import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSessionStorage } from 'react-use';

const CarrerSelector = () => {
  const [selectedCarrer, setSelectedCarrer] = useState(null);
  const [storedCarrer, setStoredCarrer] = useSessionStorage('selectedCarrer', null);

  const handleSelect = (e) => {
    setSelectedCarrer(e);
    setStoredCarrer(e);
  };

  React.useEffect(() => {
    if (storedCarrer) {
      setSelectedCarrer(storedCarrer);
    }
  }, [storedCarrer]);

  return (
    <div className="d-flex align-items-center">
      <span
        style={{
          color: selectedCarrer ? 'black' : 'gray',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '20px',
          marginLeft: '10px',
        }}
      >
        {selectedCarrer || '¿Qué Tipo de diseñador eres?:'}
      </span>
      <Dropdown onSelect={handleSelect} className="ms-2">
        <Dropdown.Toggle
          variant="link"
          id="dropdown-basic"
          className="dropdown-toggle-custom"
          style={{ color: 'rgba(103, 147, 174, 1)' }}
        >
          ▼
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="FullStack">FullStack</Dropdown.Item>
          <Dropdown.Item eventKey="Diseñador Frontend">Diseñador Frontend</Dropdown.Item>
          <Dropdown.Item eventKey="Diseñador Backend">Diseñador Backend</Dropdown.Item>
          <Dropdown.Item eventKey="Diseñador UX/UI">Diseñador UX/UI</Dropdown.Item>
          <Dropdown.Item eventKey="FullStack Junior">FullStack Junior</Dropdown.Item>
          <Dropdown.Item eventKey="FullStack Senior">FullStack Senior</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CarrerSelector;