
import React, { useState, useContext } from 'react';
import { Context } from '../../store/appContext';

export const PostCertificate = () => {
  const { store, actions } = useContext(Context); 
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first');
      return;  // Salida temprana si no hay archivo seleccionado
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(process.env.BACKEND_URL + `/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('File uploaded successfully: ' + JSON.stringify(data));
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        alert('File upload failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      setError('An error occurred while uploading the file');
      alert('An error occurred while uploading the file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>Upload</button>
      </form>
      <span>
        {loading && <p>Uploading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </span>
    </div>
  );
};
