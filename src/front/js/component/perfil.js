//UploadImage.js
import React, { useState } from 'react';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const handleFileChange = (e) => setImage(e.target.files[0]);
  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setImageUrl(data.filePath);
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={`http://localhost:3001${imageUrl}`} alt="Uploaded" />}
    </div>
  );
}
export default UploadImage;
