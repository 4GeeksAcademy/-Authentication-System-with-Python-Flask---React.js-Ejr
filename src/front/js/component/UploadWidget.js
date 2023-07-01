import React, { useEffect, useRef } from "react";

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;
        script.onload = () => {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: 'dflvts35y',
                uploadPreset: 'holaquetal22'
            }, function (error, result) {
                console.log(result, "result");
                console.log(error, "error");
            })
        };
        document.body.appendChild(script);
    }, []);
    return (
        <button className='fa fa-camera btn' onClick={() => widgetRef.current.open()}>
        </button>
    );
};

export default UploadWidget;

