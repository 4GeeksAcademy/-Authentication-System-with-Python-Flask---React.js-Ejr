import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const getInfoCompanyByUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/company/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error to create service", err);
  }
};

export const listCompanies = async () => {
  try {
    const res = await fetch(`${URL}/company/all`, {
      method: "GET",
      headers: HEADERS,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error To List Companies", err);
  }
};
