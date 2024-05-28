import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";

export const ModulesCourses = () => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    courseId: '',
    descriptionContent: '',
    typeFile: '',
    title: '',
    videoId: '',
    typeVideo: '',
    textId: '',
    typeText: '',
    imageId: '',
    typeImage: '',
    totalVideo: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await actions.postModule(formData);
      console.log(response);  
      
      
      navigate('/success'); // Navegar a una página de éxito o alguna otra acción
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div className="container">
      <h2>Create Course Module</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course ID</label>
          <input 
            type="text" 
            name="courseId" 
            value={formData.courseId} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description Content</label>
          <input 
            type="text" 
            name="descriptionContent" 
            value={formData.descriptionContent} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Type of File</label>
          <input 
            type="text" 
            name="typeFile" 
            value={formData.typeFile} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Video ID</label>
          <input 
            type="text" 
            name="videoId" 
            value={formData.videoId} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Type of Video</label>
          <input 
            type="text" 
            name="typeVideo" 
            value={formData.typeVideo} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Text ID</label>
          <input 
            type="text" 
            name="textId" 
            value={formData.textId} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Type of Text</label>
          <input 
            type="text" 
            name="typeText" 
            value={formData.typeText} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Image ID</label>
          <input 
            type="text" 
            name="imageId" 
            value={formData.imageId} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Type of Image</label>
          <input 
            type="text" 
            name="typeImage" 
            value={formData.typeImage} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Total Video</label>
          <input 
            type="text" 
            name="totalVideo" 
            value={formData.totalVideo} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Module</button>
      </form>
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        <GoArrowLeft /> Back
      </button>
    </div>
  );
};
