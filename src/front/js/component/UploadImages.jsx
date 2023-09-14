import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const UploadImages = () => {
    const { store, actions } = useContext(Context)
    const [files, setFiles] = useState(null);
    const [images, setImages] = useState([])

    const getImages = async () => {
        try {
            const data = await fetch(process.env.BACKEND_URL + "/houses/images/2")
            const response = await data.json();
            console.log(response.results);
            setImages(response.results);
        } catch (error) {
            console.log(error);
        }
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

        try {
            const saveImage = async () => {
                await fetch(process.env.BACKEND_URL + "/upload/2", options);
                await getImages();
            }
            saveImage();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getImages();
    }, [])

    return (
        <div>
            <form onSubmit={uploadImage}>
                <input type="file" onChange={(e) => setFiles(e.target.files)} />
                <button>Upload</button>
            </form>
            <div>
                {images.map(image => <img src={image.url} key={image.id} />)}
            </div>

        </div>
    );
}