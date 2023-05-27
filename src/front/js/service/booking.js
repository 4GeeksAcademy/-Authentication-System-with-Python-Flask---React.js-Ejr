import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createBooking = async (company_id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/booking/${company_id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                ...HEADERS,
            },
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error to Create Booking by User", err);
    }
}

export const adminCreateBooking = async (company_id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/booking/admin/${company_id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                ...HEADERS,
            },
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error to Create Booking by Company", err);
    }
}

export const getBookingByCompany = async (company_id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/booking/company/${company_id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                ...HEADERS,
            },
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log("Error to Get Booking by Company", err);
    }
};

export const getBookingByUser = async () => {
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
        return data.data;
    } catch (err) {
        console.log("Error to Get Booking by User", err);
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
        console.log("Error to Delete Booking", err);
    }
};
