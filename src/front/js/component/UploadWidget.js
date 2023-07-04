import React, { useEffect, useRef, useContext } from "react";
import { Context } from "../store/appContext";

const UploadWidget = ({ handleUpload }) => {
    const { store, actions } = useContext(Context);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;
        script.onload = () => {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget(
                {
                    cloudName: 'dflvts35y',
                    uploadPreset: 'holaquetal22',
                    api_key: '317487659578581',
                    api_secret: 'JAk-xu9uz7bxAsa4r5dzIrauv4g'
                },
                function (error, result) {
                    if (!error && result && result.event === "success") {
                        console.log('Done! Here is the image info: ', result.info.secure_url);
                        handleUpload(result.info.secure_url); // Call the handleUpload function with the image URL
                    }
                }
            );
        };
        document.body.appendChild(script);
    }, []);

    return (
        <button className='fa fa-camera btn' onClick={() => widgetRef.current.open()}></button>
    );
};

export default UploadWidget;
