import React, { useState } from "react";
import UploadWidget from "../component/UploadWidget";

function ForTesting() {
    const [picture, setPicture] = useState("");

    const handlePictureUpload = (uploadedPicture) => {
        setPicture(uploadedPicture);
    };

    return (
        <>
            <div> HOLAaaaaaaaaaaaaa</div>
            <div>
                <div> HOLAaaaaaaaaaaaaa</div>
                <UploadWidget handleUpload={handlePictureUpload} />
                {picture && <img src={picture} alt="Uploaded Picture" />}
            </div>
        </>
    );
}

export default ForTesting;
