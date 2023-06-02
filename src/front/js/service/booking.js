import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createBooking = async (company_id, booking) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/booking/${company_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(booking),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error to Create Booking by User", err);
  }
};

export const adminCreateBooking = async (company_id, booking) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/booking/admin/${company_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(booking),
    });
    const data = await res.json();
    console.log("admin create booking", data);
    return data;
  } catch (err) {
    console.log("Error to Create Booking by Company", err);
  }
};

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

export const deleteBooking = async (bookingID) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/booking/${bookingID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error to Delete Booking", err);
  }
};

export const updateBooking = async (bookingID, body) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/booking/${bookingID}`, {
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
    console.log("Error to update this service", err);
  }
};
