import { URL } from ".";

const HEADERS = {
    "Content-Type": "application/json",
};

export const listWorkers = async (company_id) => {
    try {
        const res = await fetch(`${URL}/workers/company/${company_id}`, {
            method: "GET",
            headers: HEADERS,
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log("Error to List Workers", err);
    }
};

