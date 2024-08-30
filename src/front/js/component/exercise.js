import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Exercise = ({ exercise }) => {
    const { store, actions } = useContext(Context);

    return (
        <article className="flex">
            <div className="flex flex-col w-[200px]">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    className="h-64 w-full object-cover sm:h-80 lg:h-96"
                />
                <h1 className="text-neutral-50 text-center">Nombre: {exercise.name}</h1>
                <h1 className="text-neutral-50 text-center">Categoría: {exercise.category}</h1>
                <p
                    id="exercise-description"
                    className="text-neutral-50 text-center"
                    dangerouslySetInnerHTML={{ __html: exercise.description }}
                />
            </div>
        </article>
    );
};
