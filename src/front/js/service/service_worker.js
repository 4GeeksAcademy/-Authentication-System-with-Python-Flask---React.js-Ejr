import { URL } from ".";

const HEADERS = {
    "Content-Type": "application/json",
};

export const createServiceWorker = async (company_id, service_worker) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/service_worker/${company_id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                ...HEADERS,
            },
            body: JSON.stringify(service_worker),
        });
        const data = await res.json();
        console.log("esta es mi funcion del fetch", data)
        return data;
    } catch (err) {
        console.log("Error to create service worker", err);
    }
};