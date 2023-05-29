import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createCompany = async (company) => {
  try {
    const res = await fetch(`${URL}/company/register`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(company),
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log("Error to Create Company", err);
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

export const getInfoCompanyById = async (company_id) => {
  try {
    const res = await fetch(`${URL}/company/${company_id}`, {
      method: "GET",
      headers: HEADERS,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error to Get Info Company by ID", err);
  }
};

export const getInfoCompanyByUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/company/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error to Get Info Company by User ID", err);
  }
};

export const updateCompany = async (company_id, body) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/company/${company_id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error Update Company", err);
  }
};

export const deleteCompany = async (company_id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/booking/delete/${company_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log("Error to Delete Company", err);
  }
};
