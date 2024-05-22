import React from 'react';

export const PostCourse = () => {

    const postNewCourse = async (url, data) => {
        try {
            const formData = new FormData();

            formData.append('img', data.img);
            formData.append('video', data.video);  // rutas de video y de img para que quede guardada y ya
            formData.append('text', data.text);
            const url = 'https://supreme-invention-5gqx7gw9xwv6cxw-3001.app.github.dev/'

            const options = {
                method: 'POST',
                body: formData // form data como cuerpo de la solicitud
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            const receivedData = await response.json();
            // manejar los datos recibidos
            console.log('Datos recibidos:', receivedData);
            // agregar más código acá para manipular datos 
        } catch (error) {
            //se caturan errores de la solicitud
            console.error('Error:', error);
            
        }
    };

    return (
        <div>
            <input></input>
        </div>
    );
};


