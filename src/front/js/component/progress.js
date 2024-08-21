import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Progress = ({ percentage }) => {

    return (
        <div className="flex flex-col items-center justify-center gap-4 pb-11">
            <h1 className="text-neutral-50 mx-auto w-max text-2xl">Tu progreso</h1>
            <div className="w-[200px]
            ">
                <CircularProgressbar value={percentage}
                    text={`${typeof percentage === 'number' ? percentage.toFixed(0) : '0'}%`}
                    styles={buildStyles({

                        strokeLinecap: 'butt',

                        textSize: '16px',

                        pathTransitionDuration: 0.1,

                        pathColor: `rgba(14,165,233, ${percentage})`,
                        textColor: '#0ea5e9',
                        trailColor: '#262626',
                        backgroundColor: '#0a0a0a',
                    })} />
            </div>
        </div>
    )
};