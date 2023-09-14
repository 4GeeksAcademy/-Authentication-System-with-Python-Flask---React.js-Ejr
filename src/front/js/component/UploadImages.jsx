import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const UploadImages = () => {
    const { store, actions } = useContext(Context)
    const [files, setFiles] = useState(null);

    const getImages = () => {
        fetch(process.env.BACKEND_URL)
    }

    const uploadImage = evt => {
        evt.preventDefault();
        console.log("This are the files", files)

        let body = new FormData();
        body.append("image", files[0])

        const options = {
            body,
            method: "POST",

        }

        fetch(process.env.BACKEND_URL + "/upload/1", options)
            .then(res => res.json())
            .then(data => console.log("Success!!!!"))
            .then(error => console.error("ERROR!!!", error))
    }

    return (
        <div>
            <form onSubmit={uploadImage}>
                <input type="file" onChange={(e) => setFiles(e.target.files)} />
                <button>Upload</button>
            </form>

        </div>
    );
}