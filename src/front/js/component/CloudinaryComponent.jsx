import React, { useState, useContext } from 'react';

export const CloudinaryComponent = () => { 
  const preset_name = "jptixrge";
  const cloud_name = "dfoegvmld";

  console.log('CloudinaryComponent rendered');
  
  const [media, setMedia] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadMedia = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);

    setLoading(true);

    const fileType = files[0].type.split('/')[0]; 
    setMediaType(fileType);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
        method: 'POST',
        body: data
      });

      const file = await response.json();
      setMedia(file.secure_url); 
      setLoading(false);
    } catch (error) {
      console.error('Error uploading media:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Upload Media to Cloudinary</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input type="file" className="form-control" onChange={uploadMedia} />
        </div>
      </div>
      <div className="row justify-content-center my-4">
        <div className="col-md-8">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            media && (
              mediaType === 'image' ? (
                <img src={media} className="img-fluid" alt="Uploaded" />
              ) : (
                <video controls className="img-fluid">
                  <source src={media} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};