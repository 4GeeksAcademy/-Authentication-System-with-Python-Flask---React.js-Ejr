import React, { useState, useEffect } from "react";
import { useTypingEffect } from "./useTypingEffect";

const texts = [
    "Organiza tus rutinas fácil y rápido",
    "Ten a mano tus rutinas diarias",
    "Observa tu progreso día a día",
];

const TIME_TO_FADE = 300;
const TIME_INTERVAL = 3000;
const TIME_PER_LETTER = 100;

export const TextTypingEffectWithTextsFadeOut = () => {
    const [textIndex, setTextIndex] = useState(0);
    const [fadeText, setFadeText] = useState(true);
    const [fadeCircle, setFadeCircle] = useState(true);
    const textToShow = useTypingEffect(texts[textIndex], TIME_PER_LETTER, false);

    const timeToTypeText = texts[textIndex].split(" ").length * TIME_PER_LETTER;

    useEffect(() => {
        const circleTimeout = setTimeout(() => {
            setFadeCircle(false);
        }, timeToTypeText + 1000);

        const textTimeout = setTimeout(() => {
            setFadeText(false);

            setTimeout(() => {
                setTextIndex((prevIndex) =>
                    prevIndex >= texts.length - 1 ? 0 : prevIndex + 1
                );
                setFadeCircle(true);
                setFadeText(true);
            }, TIME_TO_FADE);
        }, TIME_INTERVAL);

        return () => {
            clearTimeout(circleTimeout);
            clearTimeout(textTimeout);
        };
    }, [textIndex]);

    return (
        <span
            className={`overflow-visible min-h-16 flex items-center text-center text-xl md:text-4xl text-pretty text-black duration-300 dark:text-white ${fadeText ? "opacity-1 translate-y-0" : "translate-y-2 opacity-0"
                }`}
            key={textIndex}
        >
            {textToShow}{" "}
            <div
                className={`block ml-2 h-3 w-3 rounded-full bg-black duration-300 dark:bg-white ${fadeCircle ? "" : "h-0 w-0 opacity-0"
                    }`}
            />
        </span>
    );
};

export default TextTypingEffectWithTextsFadeOut;
