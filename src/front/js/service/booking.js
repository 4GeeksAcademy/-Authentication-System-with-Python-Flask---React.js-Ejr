import { URL } from ".";

const HEADERS = {
    "Content-Type": "application/json",
};


export const getInfoBooking = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/booking/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                ...HEADERS,
            },
        });
        const data = await res.json();
        console.log(data);
        return data.data;
    } catch (err) {
        console.log("Error Get Booking", err);
    }
};

export const deleteBooking = async (booking_id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/booking/${booking_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                ...HEADERS,
            },
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log("Error Delete Booking", err);
    }
};

