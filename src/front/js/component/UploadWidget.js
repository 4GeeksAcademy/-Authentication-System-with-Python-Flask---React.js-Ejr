import React, { useEffect, useRef } from "react";


const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dflvts35y',
            uploadPreset: 'holaquetal22'
        }, function (error, result) {
            console.log(result);
        })

    }, [])
    return (
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    )
}


export default UploadWidget