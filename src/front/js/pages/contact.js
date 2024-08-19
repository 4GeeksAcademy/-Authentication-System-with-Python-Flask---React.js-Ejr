import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Contact = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <section className= "Contact">
                <h1>Contact</h1>
            </section>
            
        </div>
    );
};