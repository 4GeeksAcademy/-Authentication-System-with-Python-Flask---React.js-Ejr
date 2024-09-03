import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const UserLenguages = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="user-Lenguages" style={styles.container}>
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
   
        container: {
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '10px',
            border: '1px solid #ddd',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
        },
        header: {
            backgroundColor: 'rgba(112, 135, 156, 1)',
            color: 'black',
            cursor: 'pointer',
            borderRadius: '10px',            
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
        },
        content: {
            backgroundColor: 'white',
            borderRadius: '10px',
            height: '160px',
            overflowY: 'auto',
        },
};

export default UserLenguages;
