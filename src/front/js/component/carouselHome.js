import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { ExercisesList } from "../component/exercisesList";
import { Progress } from "../component/progress";

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CarouselComplete = ({ randomValues }) => {
    return (
        <Carousel showThumbs={false} showStatus={false}>
            {randomValues.map((values, index) => (
                <div key={index} className="w-2/3 mx-auto">
                    <ExercisesList randomValue={values.exerciseValue} />
                    <Progress randomValue={values.progressValue} />
                </div>
            ))}
        </Carousel>
    );
};

export const CarouselHome = () => {
    const { store, actions } = useContext(Context);

    const randomValues = Array.from({ length: 3 }).map(() => ({
        exerciseValue: getRandomValue(1, 100),
        progressValue: getRandomValue(1, 100)
    }));

    return (
        <>
            <CarouselComplete randomValues={randomValues} />
        </>
    );
};