import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const UserExperience = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="User-Experience">
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
        backgroundColor: 'rgba(217, 217, 217, 1)',
        color: 'black',
        cursor: 'pointer',
        borderRadius: '10px',
        marginTop: '10px'
    },
    content: {
        backgroundColor: 'rgba(112, 135, 156, 1)',
        borderRadius: '10px',
    }
};

export default UserExperience;
