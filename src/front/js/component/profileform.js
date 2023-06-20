import React, { useState, useEffect } from "react";
import imageholder from "../../img/imageholder.jpg";

export const ProfileForm = () => {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
 

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("miTokenJWT");

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserName(data.user_name);
        setDescription(data.description);
        setProfileImg(data.profile_img); // Update profile image state
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <form
        className="bg-white"
        style={{
          height: "auto",
          width: "100%",
          maxWidth: "600px",
          margin: "20px",
          padding: "20px",
          boxShadow: "0 5px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <img
              src={imageholder}
              className="img-fluid rounded-circle" 
              style={{ width:300, height:300 , borderRadius:200 }} 
              alt="Profile"
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <h2 className="me-2" style={{ fontSize: "40px" }}>
              {userName}
            </h2>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 d-flex align-items-center">
            <h4 style={{ marginRight: "10px" }}>Sobre tí</h4>
          </div>
          <div className="col-md-12">
            <p
              className="form-control"
              placeholder="Describete"
              id="floatingTextarea2"
              style={{ height: 100 }}
              defaultValue={description}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <h4>¿Qué haces?</h4>
          </div>
          <div className="col-md-12 d-flex ">
            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {/* Add your list items here */}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};
