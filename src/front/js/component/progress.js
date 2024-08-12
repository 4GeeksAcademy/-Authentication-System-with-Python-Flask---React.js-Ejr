import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export const Progress = ({ day }) => {
    const { store, actions } = useContext(Context);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        setPercentage(actions.returnElementAtIndex(day - 1))
        console.log(percentage);
    }, [store.porcentajes])

    useEffect(() => {
        console.log(percentage);
    }, [store.porcentaje])


    return (
        <div className="flex flex-col items-center justify-center gap-4 pb-11">
            <h1 className="text-neutral-50 mx-auto w-max text-2xl">Tu progreso</h1>
            <div className="w-[200px]
            ">
                <CircularProgressbar value={percentage}
                    text={`${percentage}%`} styles={buildStyles({

                        strokeLinecap: 'butt',

                        textSize: '16px',

                        pathTransitionDuration: 0.1,

                        pathColor: `rgba(14,165,233, ${percentage})`,
                        textColor: '#0ea5e9',
                        trailColor: '#262626',
                        backgroundColor: '#0a0a0a',
                    })} />
            </div>

            <div className="text-neutral-400">Llevas una racha de 4 días 🔥</div>
        </div>
    )
};