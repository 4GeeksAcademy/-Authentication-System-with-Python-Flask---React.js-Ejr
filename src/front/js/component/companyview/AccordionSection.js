import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const AccordionSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-section">
            <div className="d-flex justify-content-between align-items-center p-3" style={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <h5>{title}</h5>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </div>
            {isOpen && (
                <div className="p-3" style={styles.content}>
                    {children}
                </div>
            )}
        </div>
    );
};

const styles = {
    header: {
        backgroundColor: '#6e9bb8',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '10px',
        marginTop: '10px'
    },
    content: {
        backgroundColor: 'white',
        borderRadius: '10px',
       
    }
};

export default AccordionSection;
