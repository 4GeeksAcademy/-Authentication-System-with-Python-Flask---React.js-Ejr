import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const GeneralFiles = () => {
    const [files, setFiles] = useState([]);
    const pdfUrl = process.env.BACKEND_URL +'/api/uploads';

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(pdfUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch files');
                }
                const data = await response.json();
                setFiles(data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, [pdfUrl]); 

    return (
        <div>
            <h5>Files:</h5>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <a href={process.env.BACKEND_URL +`/api/uploads/${file}`} rel="noopener noreferrer">{file}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}



