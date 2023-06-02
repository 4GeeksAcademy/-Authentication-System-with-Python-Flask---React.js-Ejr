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
        return data;
    } catch (err) {
        console.log("Error to create service worker", err);
    }
};

export const getAllServiceWorkers = async () => {
    try {
        const res = await fetch(`${URL}/service_worker/all`, {
            method: "GET",
            headers: HEADERS,
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log('Error to get all Service Workers', err)
    }
};

export const getWorkersbyService = async (service_id) => {
    try {
        const res = await fetch(`${URL}/service_worker/service/${service_id}`, {
            method: "GET",
            headers: HEADERS,
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log('Error to get all workers by service', err)
    }
};

export const getServicesbyWorker = async (worker_id) => {
    try {
        const res = await fetch(`${URL}/service_worker/worker/${worker_id}`, {
            method: "GET",
            headers: HEADERS,
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log('Error to get all services by worker', err)
    }
};

