import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
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
    console.log("Error Register Company", err);
  }
};
