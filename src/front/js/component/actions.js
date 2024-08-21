export const loginUser = async ({ email, password }) => {
    try {
        const response = await fetch('https://verbose-space-waffle-57v9gw9477gfv4xv-3001.app.github.dev/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
            // Asegúrate de que `data` contenga `user` y `token`
            return {
                success: true,
                user: data.user, // Asegúrate de que el `user` esté en la respuesta
                data: {
                    token: data.token // Asegúrate de que el `token` esté en la respuesta
                },
                message: 'Conexión exitosa con el servidor'
            };
        } else {
            return {
                success: false,
                message: data.message || 'Error desconocido'
            };

        }
    } catch (error) {
        console.error('Error en loginUser:', error);
        return {
            success: false,
            message: 'Error de conexión o servidor no disponible'
        };
    }
};


///


export const createContact = async ({ name, email, password }) => {
    try {
        const response = await fetch('https://verbose-space-waffle-57v9gw9477gfv4xv-3001.app.github.dev/api/signup', { // 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name,  email: email, password: password })
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
            // Asegúrate de que `data` contenga información relevante para el registro
            return {
                success: true,
                message: 'Registro exitoso. Puedes iniciar sesión ahora.'
            };
        } else {
            return {
                success: false,
                message: data.message || 'Error desconocido durante el registro'
            };
        }
    } catch (error) {
        console.error('Error en registerUser:', error);
        return {
            success: false,
            message: 'Error de conexión o servidor no disponible'
        };
    }
};
