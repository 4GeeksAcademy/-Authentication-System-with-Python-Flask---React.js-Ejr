const corsOrigin = process.env.CORS_ORIGIN;
const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      userId: null,
      roleId: null,
      setting: null,
      totalClients: null,
      totalAppointments: null,
      totalServices: null,
      totalCars: null,
      corsEnabled: { "Access-Control-Allow-Origin": "*" }, // Comentado para deshabilitar en producción
    },
    actions: {
      loadSession: async () => {
        try {
          const storageToken = localStorage.getItem("token");
          const storageUserId = localStorage.getItem("user_id");
          const storageRoleId = localStorage.getItem("role_id");

          if (!storageToken || !storageUserId || !storageRoleId) {
            localStorage.clear();
            setStore({ token: null, userId: null, roleId: null });
            return false;
          }

          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + storageToken,
          };

          if (corsOrigin && corsOrigin !== "DISABLED") {
            headers["Access-Control-Allow-Origin"] = corsOrigin;
          }

          let resp = await fetch(apiUrl + "/pinguser", {
            headers: headers,
          });

          if (!resp.ok) {
            localStorage.clear();
            setStore({ token: null, userId: null, roleId: null });
            return false;
          }

          const data = await resp.json();
          const updateTokenAndState = (token, userId, roleId) => {
            setStore({ token, userId, roleId });
            localStorage.setItem("token", token);
            localStorage.setItem("user_id", userId);
            localStorage.setItem("role_id", roleId);
          };

          updateTokenAndState(data.access_token, data.user_id, data.role_id);

          return true;
        } catch (error) {
          console.error("Error al cargar la sesión:", error);
          localStorage.clear();
          setStore({ token: null, userId: null, roleId: null });
          return false;
        }
      },

      login: async (email, password) => {
        let headers = {
          "Content-Type": "application/json",
        };
    
        if (corsOrigin && corsOrigin !== "DISABLED") {
          headers["Access-Control-Allow-Origin"] = corsOrigin;
        }
    
        try {
          let resp = await fetch(apiUrl + "/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: headers,
          });
    
          if (!resp.ok) {
            setStore({ token: null });
            const errorData = await resp.json();
            console.error("Error al hacer login:", errorData);
            return {
              success: false,
              message: errorData.error || "Error desconocido",
            };
          }
    
          let data = await resp.json();
          setStore({ token: data.access_token });
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("role_id", data.role_id);
          localStorage.setItem("user_id", data.user_id);
          return { success: true };
        } catch (error) {
          console.error("Error en la solicitud de login:", error);
          return { success: false, message: "Error en la red o en el servidor" };
        }
      },
    

      signup: async (email, password, name, phone_number) => {
        let headers = {
          "Content-Type": "application/json",
        };

        if (corsOrigin && corsOrigin !== "DISABLED") {
          headers["Access-Control-Allow-Origin"] = corsOrigin;
        }

        let resp = await fetch(apiUrl + "/signupuser", {
          method: "POST",
          body: JSON.stringify({ email, password, name, phone_number }),
          headers: headers,
        });
        if (!resp.ok) {
          const errorData = await resp.json();
          return false;
        }
        let data = await resp.json();
        return true;
      },
      logout: async () => {
        try {
          let { token } = getStore();
          if (!token) {
            console.warn("No hay token disponible para hacer logout");
            return false;
          }

          let resp = await fetch(`${apiUrl}/logout`, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          if (!resp.ok) {
            console.error("Error en la solicitud de logout:", resp.statusText);
            return false;
          }

          localStorage.clear();
          setStore({ token: null, userId: null, roleId: null });
          return true;
        } catch (error) {
          console.error("Error en logout:", error); // Añadido para mejor depuración
          localStorage.clear();
          setStore({ token: null, userId: null, roleId: null });
          return false;
        }
      },

      saveProfile: async (updatedProfile) => {
        let { token } = getStore();
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };

        if (corsOrigin && corsOrigin !== "DISABLED") {
          headers["Access-Control-Allow-Origin"] = corsOrigin;
        }

        let resp = await fetch(apiUrl + "/update_profile", {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(updatedProfile),
        });
        if (!resp.ok) {
          const errorData = await resp.json();
          return { success: false, error: errorData };
        }
        const data = await resp.json();
        return { success: true };
      },
      saveCarDetails: async (carId, updatedCar) => {
        let { token } = getStore();
        try {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          };

          if (corsOrigin && corsOrigin !== "DISABLED") {
            headers["Access-Control-Allow-Origin"] = corsOrigin;
          }

          let resp = await fetch(`${apiUrl}/cars/${carId}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updatedCar),
          });

          if (!resp.ok) {
            const errorData = await resp.json();
            return { success: false, error: errorData };
          }

          const data = await resp.json();
          return { success: true, data: data };
        } catch (error) {
          console.error("Error updating car details:", error);
          return { success: false, error: error.message };
        }
      },

      //////////////////////////////////////////////////////////////////////////////////////////////////////// manejo envio mails
      SendMail: async (data) => {
        try {
          const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              accept: "application/json",
              "api-key": process.env.MYKEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            //mail enviado con exito
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////// manejo envio SMS
      SMSSender: async (SMSInfo) => {
        try {
          const response = await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
            method: "POST",
            headers: {
              accept: "application/json",
              "api-key": process.env.MYKEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(SMSInfo),
          });
          if (response.ok) {
            console.log("sms enviado con exito")
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
      GetUser: async () => {
        try {
          const storageUserId = localStorage.getItem("user_id");
          const response = await fetch(`${apiUrl}/users/${storageUserId}`);

          if (!response.ok) throw new Error("Network response failed");

          const data = await response.json();

          const { result } = data;
          const email = result.email;
          const name = result.name;
          const phoneNumber = result.phone_number

          return { email, name, phoneNumber };
        } catch (error) {
          console.error("Error:", error);
        }
      },
      getMaxAppointmentsHour: async () => {
        const response = await fetch(`${apiUrl}/settings`);
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        return data.max_appointments_per_hour;  
    }

    },
  };
};

export default getState;
