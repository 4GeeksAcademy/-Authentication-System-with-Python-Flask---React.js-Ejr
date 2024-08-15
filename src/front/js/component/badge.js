import React from 'react'

export const Badge = ({ imc }) => {
    let bgColor, textColor, label;

    if (imc < 18.5) {
        bgColor = ' dark:bg-yellow-900'
        textColor = 'dark:text-yellow-300'
        label = 'Bajo'
    } else if (imc >= 18.5 && imc < 24.9) {
        bgColor = 'bg-green-100 dark:bg-green-900'
        textColor = 'text-green-800 dark:text-green-300'
        label = 'Normal'
    } else if (imc >= 25 && imc < 29.9) {
        bgColor = ' dark:bg-yellow-900'
        textColor = 'dark:text-yellow-300'
        label = 'Alto'
    } else {
        bgColor = 'dark:bg-red-900'
        textColor = 'dark:text-red-300'
        label = 'Muy alto'
    }

    return (
        <span className={`${bgColor} ${textColor} text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>
            {label}
        </span>
    );
};
