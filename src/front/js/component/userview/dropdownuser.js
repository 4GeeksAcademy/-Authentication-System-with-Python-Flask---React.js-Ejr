import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';


const CarrerSelector = () => {
    const [selectedCarrer, setSelectedCarrer] = useState();

    const handleSelect = (e) => {
        setSelectedCarrer(e);
    };

    return (
        <div className="d-flex align-items-center">
           

            <div >
                <span className="fw-bold">¿Qué Tipo de diseñador eres?: </span>
                {selectedCarrer}
            </div>     
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="link" id="dropdown-basic" className="ms-2 dropdown-toggle-custom" style={{color: 'rgba(103, 147, 174, 1)'}}>
                    
                   
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
