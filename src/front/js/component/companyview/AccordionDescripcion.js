import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const AccordionDescription = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-Description">
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
        backgroundColor: 'white',
        color: 'black',
        cursor: 'pointer',
        borderRadius: '10px',
        marginTop: '10px'
    },
    content: {
        backgroundColor: 'rgba(103, 147, 174, 1)',
        borderRadius: '10px',
    }
};

export default AccordionDescription;
