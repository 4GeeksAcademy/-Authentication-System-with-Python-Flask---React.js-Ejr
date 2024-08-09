import React, { useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { ExercisesList } from "../component/exercisesList";
import { Progress } from "../component/progress";

// const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CarouselComplete = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.oneWeeklyRoutineUser(1);
    }, [])
    console.log(store.oneWeeklyRoutineUserList);

    return (

        <Carousel showThumbs={false} showStatus={false}>

            {store.oneWeeklyRoutineUserList.sort((a, b) => a.day - b.day).map((item, index) => (
                <div key={index} className="w-2/3 mx-auto">
                    <ExercisesList routine={item.routine} />
                    <h1>{item.day}</h1>
                    {/* <Progress randomValue={item} /> */}
                </div>
            ))}
        </Carousel>
    );
};

export const CarouselHome = () => {
    const { store, actions } = useContext(Context);

    // const randomValues = Array.from({ length: 3 }).map(() => ({
    //     exerciseValue: getRandomValue(1, 100),
    //     progressValue: getRandomValue(1, 100)
    // }));

    return (
        <>
            <CarouselComplete />
            {/* randomValues={randomValues} */}
        </>
    );
};