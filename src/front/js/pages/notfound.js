import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../img/urlnotfound.png";

const NotFound = () => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate("/home");
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <img
                src={notFoundImage}
                alt="Not Found"
                className="img-fluid"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
            />
        </div>
    );
};

export default NotFound;
