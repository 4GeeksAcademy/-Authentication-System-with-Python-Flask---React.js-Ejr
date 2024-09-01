import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from './icons';

const BackButton = ({ iconSize = 48 }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleGoBack} className='text-white hover:scale-110 transition duration-150 pl-4'>
            <ArrowLeftIcon size={iconSize} />
        </button>
    );
};

export default BackButton;