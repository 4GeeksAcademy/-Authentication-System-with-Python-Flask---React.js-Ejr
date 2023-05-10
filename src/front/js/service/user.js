import { URL } from '.';


const HEADERS = {
    "Content-Type": "application/json",
};


export const registerUser = async (user) => {
    try {
        const res = await fetch(`${URL}/users/register`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(user)
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error Register User", err)
    }
};

export const loginUser = async (user) => {
    try {
        const res = await fetch(`${URL}/users/login`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(user)
        });
        const data = await res.json();
        localStorage.setItem("token", data.token)
    } catch (err) {
        console.log("Error Login User", err)
    }
};

export const getInfoUser = async () => {
    try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${URL}/users/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                ...HEADERS
            },
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error Get User", err)
    }
};


