const apiUrl = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            rooms: [],
            games: [],
            loadingRooms: false,
            user: null // Guardar la información del usuario autenticado
        },

        actions: {
            submitLogInForm: async (logInData) => {
                try {
                    let response = await fetch(`${apiUrl}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(logInData)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to log in');
                    }

                    let data = await response.json();
                    localStorage.setItem("jwt-token", data.token);
                    localStorage.setItem("userId", data.user_id); // Guardar userId en localStorage
                    setStore({ user: data });

                    return true;
                } catch (error) {
                    console.error('Error logging user in:', error);
                    return false;
                }
            },

            submitSignUpForm: async (signUpData) => {
                try {
                    let response = await fetch(`${apiUrl}/api/signup`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(signUpData)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create user');
                    }

                    return true;
                } catch (error) {
                    console.error('Error creating user:', error);
                    return false;
                }
            },

            fetchRooms: async () => {
                const store = getStore();
                setStore({ loadingRooms: true });

                try {
                    let response = await fetch(`${apiUrl}/api/home`);
                    if (!response.ok) throw new Error("Couldn't fetch current rooms");
                    let roomsData = await response.json();
                    setStore({ 
                        rooms: roomsData,
                        loadingRooms: false 
                    });
                    console.log(store.rooms);
                    return true; 
                } catch (error) {
                    console.error(error);
                    setStore({ loadingRooms: false });
                    return false; 
                }
            },

            searchRooms: (searchTerm, roomType) => {
                const store = getStore();
                return store.rooms.filter(room => {
                    const matchesSearchTerm = room.room_name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesRoomType = roomType === 'All' || room.room_type === roomType;
                    return matchesSearchTerm && matchesRoomType;
                });
            },

            logout: () => {
                localStorage.removeItem('jwt-token');
                localStorage.removeItem('userId'); // Eliminar userId de localStorage
                setStore({ user: null });
            },

            getProfile: async () => {
                const store = getStore();
                const token = localStorage.getItem('jwt-token');
                const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
                if (!token || !userId) return null;

                try {
                    const response = await fetch(`${apiUrl}/api/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) throw new Error('Failed to fetch profile data');
                    const data = await response.json();
                    setStore({ user: data });
                    return data;
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                    return null;
                }
            },

            updateProfile: async (profileData) => {
                const token = localStorage.getItem('jwt-token');
                const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
                if (!token || !userId) return false;

                try {
                    const response = await fetch(`${apiUrl}/api/user/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(profileData)
                    });
                    if (!response.ok) throw new Error('Failed to update profile');
                    const data = await response.json();
                    setStore({ user: data });
                    return true;
                } catch (error) {
                    console.error('Error updating profile:', error);
                    return false;
                }
            },

            deleteProfile: async () => {
                const token = localStorage.getItem('jwt-token');
                const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
                if (!token || !userId) return false;

                try {
                    const response = await fetch(`${apiUrl}/api/user/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) throw new Error('Failed to delete profile');
                    localStorage.removeItem('jwt-token');
                    localStorage.removeItem('userId'); // Eliminar userId de localStorage
                    setStore({ user: null });
                    return true;
                } catch (error) {
                    console.error('Error deleting profile:', error);
                    return false;
                }
            },

            createRoom: async (roomData) => {
                const token = localStorage.getItem('jwt-token');
                if (!token) return false;

                try {
                    const response = await fetch(`${apiUrl}/api/create_room`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(roomData)
                    });
                    if (!response.ok) throw new Error('Failed to create room');
                    const data = await response.json();
                    const store = getStore();
                    setStore({ rooms: [...store.rooms, data.room] });
                    return true;
                } catch (error) {
                    console.error('Error creating room:', error);
                    return false;
                }
            },

            deleteRoom: async (roomId) => {
                const token = localStorage.getItem('jwt-token');
                if (!token) return false;

                try {
                    const response = await fetch(`${apiUrl}/api/room/${roomId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) throw new Error('Failed to delete room');
                    const store = getStore();
                    setStore({ rooms: store.rooms.filter(room => room.id !== roomId) });
                    return true;
                } catch (error) {
                    console.error('Error deleting room:', error);
                    return false;
                }
            },

            updateRoom: async (roomId, roomData) => {
                const token = localStorage.getItem('jwt-token');
                if (!token) return false;

                try {
                    const response = await fetch(`${apiUrl}/api/room/${roomId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(roomData)
                    });
                    if (!response.ok) throw new Error('Failed to update room');
                    const data = await response.json();
                    const store = getStore();
                    setStore({ rooms: store.rooms.map(room => room.id === roomId ? data.room : room) });
                    return true;
                } catch (error) {
                    console.error('Error updating room:', error);
                    return false;
                }
            },

            fetchGames: async () => {
                try {
                    const store = getStore()
                    let response = await fetch(`${apiUrl}api/games`);
                    if (!response.ok) throw new Error("Couldn't fetch games");
                    let gamesData = await response.json();
                    setStore({ games: gamesData });
                    console.log(store.games)
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            },
            initializeData: async () => {
                const store = setStore()
                setStore({ loading: true });
                try {
                    await Promise.all([getActions().fetchGames(), getActions().fetchRooms()]);
                    setStore({ loading: false });
                } catch (error) {
                    console.error('Error initializing data:', error);
                    setStore({ loading: false });
                    console.log(store)
                }
            },
        }
    };
};

export default getState;
