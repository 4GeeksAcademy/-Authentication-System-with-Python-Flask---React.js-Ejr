import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const registerUser = async (user) => {
  try {
    const res = await fetch(`${URL}/users/register`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log("Error Register User", err);
  }
};

export const getInfoUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.log("Error to get user id");
  }
};

export const deleteUser = async (user_id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/users/delete/${user_id}`, {
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

export const loginUser = async (user) => {
  try {
    const res = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    const data = await res.json();
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("token/role/company_id", JSON.stringify(data.data));
    return data.data;
  } catch (err) {
    console.log("Error Login User", err);
  }
};

export const updateUserProfile = async (body) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/users/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error Update User", err);
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.log("Error to get user id");
  }
};
