import React, { useState } from 'react';

 export const CloudinaryComponent = () => {
  const preset_name = "jptixrge";
  const cloud_name = "dfoegvmld";

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);

    setLoading(true);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: data
      });

      const file = await response.json();
      setImage(file.secure_url); 
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" name="file" placeholder="Upload an image" onChange={(e)=>uploadImage(e)} />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        image && <img src={image} style={{ width: '400px' }} alt="Uploaded" />  
      )}
    </div>
  );
};

