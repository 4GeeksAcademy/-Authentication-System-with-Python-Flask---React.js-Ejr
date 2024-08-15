import { useState, useEffect } from "react";



export const useTypingEffect = (
    text,
    duration,
    isTypeByLetter
) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const items = isTypeByLetter ? text.split("") : text.split(" ");

    useEffect(() => {
        setCurrentPosition(0);
    }, [text]);

    useEffect(() => {
        if (currentPosition >= items.length) return;

        const intervalId = setInterval(() => {
            setCurrentPosition((prevPosition) => prevPosition + 1);
        }, duration);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentPosition, items, duration]);

    return items.slice(0, currentPosition).join(isTypeByLetter ? "" : " ");
};