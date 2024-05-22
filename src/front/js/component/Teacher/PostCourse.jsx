import React, { useState } from 'react';

export const PostCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        categoryTitle: '',
        modulesLength: '',
        certificate: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const postNewCourse = async () => {
        const url = process.env.BACKEND_URL + '/api/view/courses';
        const data = {
            title: courseData.title,
            categoryTitle: courseData.categoryTitle,
            modulesLength: courseData.modulesLength,
            certificate: courseData.certificate,
            price: courseData.price
        };

        // Imprimir valores clave para depuración
        console.log('URL del Backend:', url);
        console.log('Datos enviados:', data);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Request error: ${response.status}`);
            }

            const receivedData = await response.json();
            console.log('Datos recibidos:', receivedData);
        } catch (e) {
            console.error('Error:', e);
        }
    };

    return (
        <div>
            <h2>Post New Course</h2>
            <form onSubmit={(e) => { e.preventDefault(); postNewCourse(); }}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={courseData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Category Title:</label>
                    <input type="text" name="categoryTitle" value={courseData.categoryTitle} onChange={handleChange} />
                </div>
                <div>
                    <label>Modules Length:</label>
                    <input type="number" name="modulesLength" value={courseData.modulesLength} onChange={handleChange} />
                </div>
                <div>
                    <label>Certificate:</label>
                    <input type="text" name="certificate" value={courseData.certificate} onChange={handleChange} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={courseData.price} onChange={handleChange} />
                </div>
                <button type='submit'>Upload Course</button>
            </form>
        </div>
    );
};


