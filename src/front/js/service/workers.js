import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createWorker = async (companyID, new_worker) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/workers/${companyID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(new_worker),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error to Create Worker", err);
  }
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

export const getSingleWorker = async (worker_id) => {
  try {
    const res = await fetch(`${URL}/workers/${worker_id}`, {
      method: "GET",
      headers: HEADERS,
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log("Error to Get Worker", err);
  }
};

export const deleteWorker = async (worker_id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/workers/${worker_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log("Error to Delete User", err);
  }
};
