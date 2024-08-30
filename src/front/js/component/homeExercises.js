import { InfiniteSlider } from "./infiniteslider";
import React from "react";

export const HomeExercises = () => {

    /*   const { store, actions } = useContext(Context);
      const location = useLocation(); */

    return (
        <>
            <h2 className="text-md text-center text-neutral-200 md:text-2xl">Escoge entre una variedad de ejercicios</h2>
            <div className="overflow-hidden w-11/12 mx-auto max-w-[1920px]">
                <InfiniteSlider />
            </div>
        </>
    );
}