import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createService = async (companyID, data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/services/${companyID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.log("Error to create service", err);
  }
};
