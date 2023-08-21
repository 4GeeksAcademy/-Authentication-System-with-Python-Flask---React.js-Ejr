import React from "react";


export const Spinner = () => {

    return (
        <div class="d-flex justify-content-center text-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}