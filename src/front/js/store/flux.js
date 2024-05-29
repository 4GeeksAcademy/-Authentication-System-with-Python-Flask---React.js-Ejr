const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: "",
      user: "",
      error: "",
      msg: "",
      course: "",
      currentRole: "",
      spinner: false,
      media: "",
      loading: false,
      mediaType: "",
      courseFavorite: "",
      category: ""
    },
    actions: {
      createUser: async (newUser, userRole) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const respCreateUser = await fetch(
            process.env.BACKEND_URL + `/api/signup/` + userRole,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );

          if (!respCreateUser.ok) {
            const errorData = await respCreateUser.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error al crear el usuario");
          }
          const dataCreateUser = await respCreateUser.json();
          setStore({ ...store, msg: dataCreateUser.message });
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      loginIn: async (userToLogin, userRole) => {
        const store = getStore();
        localStorage.setItem("userToLogin", JSON.stringify(userToLogin));
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const respLoginIn = await fetch(
            process.env.BACKEND_URL + `/api/login/` + userRole,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userToLogin),
            }
          );

          if (!respLoginIn.ok) {
            const errorData = await respLoginIn.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error al iniciar sesión");
          }

          const dataLoginIn = await respLoginIn.json();
          localStorage.setItem("jwt-token", dataLoginIn.access_token);
          localStorage.setItem("currentRole", userRole);
          setStore({ ...store, currentRole: userRole });
          setStore({ ...store, msg: dataLoginIn.message });
          await getActions().getUser();
        } catch (err) {
          console.error(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getUser: async (userRol) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const respGetUsers = await fetch(
            process.env.BACKEND_URL +
            `/api/view/` +
            (store.currentRole || userRol),
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (!respGetUsers.ok) {
            const errorData = await respGetUsers.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(
              errorData.Error || "Error al obtener los datos del usuario"
            );
          }

          const dataGetUser = await respGetUsers.json();
          setStore({ ...store, user: dataGetUser });
          setStore({ ...store, msg: dataGetUser.message });
        } catch (err) {
        } finally {
          getActions().spinner(false);
        }
      },

      checkUserSession: async () => {
        const store = getStore();
        try {
          const token = localStorage.getItem("jwt-token");
          const userRole = localStorage.getItem("currentRole");
          const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));
          if (token && userRole && userToLogin) {
            setStore({ currentRole: userRole });
            await getActions().getUser(userRole);
            await getActions().getCourse()
            await getActions().getTrolleyToOrder()
            await getActions().getCategory()

          }
        } catch (err) {
          setStore({ ...store, error: "Error checking user session" });
          console.error("Error checking user session: ", err);
        }
      },

      resetPassword: async (email, userPassword) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        console.log(email, userPassword);
        try {
          console.log(
            process.env.BACKEND_URL + `/api/forgot-password/` + userPassword
          );
          const respResetPassword = await fetch(
            process.env.BACKEND_URL + `/api/forgot-password/` + userPassword,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(email),
            }
          );

          if (!respResetPassword.ok) {
            const errorData = await respResetPassword.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error in Reset");
          }

          const dataResetPassword = await respResetPassword.json();
          localStorage.setItem(
            "jwt-token-reset",
            dataResetPassword.access_token
          );
          setStore({ ...store, msg: dataResetPassword.message });
        } catch (err) {
        } finally {
          getActions().spinner(false);
        }
      },

      resetPasswordNewChange: async (password, userRol) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          console.log(
            process.env.BACKEND_URL + `/api/forgot-password/` + tokenPassword
          );
          const tokenPassword = localStorage.getItem("jwt-token-reset");
          if (!tokenPassword) throw new Error("No token found");

          const url = process.env.BACKEND_URL + `/api/reset-password/` + userRol + "/" + tokenPassword
          const respResetPassword = await fetch(
            url,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(password),
            }
          );

          if (!respResetPassword.ok) {
            const errorData = await respResetPassword.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error in Reset");
          }

          const dataResetPassword = await respResetPassword.json();
          setStore({ ...store, msg: dataResetPassword.message });
        } catch (err) {
        } finally {
          getActions().spinner(false);
        }
      },

      updateMsgError: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, error: changesMsg });
      },

      updateMsg: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, msg: changesMsg });
      },

      spinner: (changesSpinner) => {
        const store = getStore();
        setStore({ ...store, spinner: changesSpinner });
      },

      createCourseNew: async (dataCourse) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        console.log(dataCourse)
        try {
          const url = process.env.BACKEND_URL + "/api/create/courses";
          const respCreateCourse = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataCourse),
          });
          if (!respCreateCourse.ok) {
            const errorData = await respCreateCourse.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al añadir el curso al carrito"
            );
          }
          const dataCreateCourse = await respCreateCourse.json();
          setStore({ ...store, msg: dataCreateCourse.message });
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getCourse: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/view/courses";
          const respGetCourse = await fetch(url);

          if (!respGetCourse.ok) {
            const errorData = await respGetCourse.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error al Obtener el Curso");
          }

          const dataGetCourse = await respGetCourse.json();
          setStore({
            ...store,
            msg: dataGetCourse.message,
            course: dataGetCourse,
          });
          console.log(dataGetCourse);
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      addCourseToTrolley: async (titleCourse, courseId, price) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        console.log(titleCourse, courseId, price)
        try {
          const url = process.env.BACKEND_URL + "/api/trolley/courses";
          const respAddTrolley = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              titleCourse: titleCourse,
              courseId: courseId,
              price: price,
              userId: store.userId  
            }),
          });

          if (!respAddTrolley.ok) {
            const errorData = await respAddTrolley.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });

            await getActions().getTrolleyToOrder()

            throw new Error(
              errorData.error || "Error al añadir el curso al carrito"
            );
          }

          const dataAddTrolley = await respAddTrolley.json();
          setStore({ ...store, msg: dataAddTrolley.message});
          console.log(dataAddTrolley);

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getTrolleyToOrder: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/trolley/courses";
          const respGetOrder = await fetch(url);

          if (!respGetOrder.ok) {
            const errorData = await respGetOrder.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error al Obtener el Curso");
          }

          const dataGetOrder = await respGetOrder.json();
          setStore({
            ...store,
            msg: dataGetOrder.message,
            courseFavorite: dataGetOrder,
          });
          console.log(dataGetOrder);
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deleteTrolley: async (trolleyId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {

          const url = process.env.BACKEND_URL + "/api/view/trolley/" + trolleyId;
          const respDelTrolley = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })


          if (!respDelTrolley.ok) {
            const errorData = await respDelTrolley.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al añadir el curso al carrito"
            );
          }


          const dataDelTrolley = await respDelTrolley.json();
          setStore({ ...store, msg: dataDelTrolley.message });

          await getActions().getTrolleyToOrder();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      newQuizz: async (dataQuizz) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const respNewQuizz = await fetch(
            process.env.BACKEND_URL + "/api/module/quizzes",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataQuizz),
            }
          );

          if (!respNewQuizz.ok) {
            const errorData = await respNewQuizz.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error creating quizz");
          }
          const dataNewQuizz = await respNewQuizz.json();
          setStore({ ...store, msg: dataNewQuizz.message });
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      uploadCertificate: async (file) => {
        try {
          const responseUploadData = await fetch(process.env.BACKEND_URL + `/api/upload`, {
            method: 'POST',
            body: JSON.stringify(file),
          });

          if (!responseUploadData.ok) {
            const errorUploadData = await responseUploadData();
            console.log(errorUploadData)
            setStore({ ...store, error: errorUploadData.Error })
            throw new Error(errorUploadData.Error || "Error posting certificate")
          } else {
            const uploadData = await response.json();
            alert('File uploaded successfully: ' + JSON.stringify(uploadData));
          }
          const dataNewCertificate = await respNewCertificate.json()
          setStore({ ...store, msg: dataNewCertificate.message })
        } catch (error) {
          console.error('Error during file upload:', error);
          setError('An error occurred while uploading the file');
          alert('An error occurred while uploading the file');
        } finally {
          getActions().spinner(false);
        }
      },

      /* STORE-object states & ACTIONS-arrow function OF CLOUDINARYCOMPONENT*/
      uploadCloudinaryMedia: async (fileList) => {
        const preset_name = "jptixrge";
        const cloud_name = "dfoegvmld";

        const file = fileList[0]; // Asegurarse de tomar solo el primer archivo

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name);

        setStore({ loading: true });

        const fileType = file.type.split('/')[0];
        setStore({ mediaType: fileType });

        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
            method: 'POST',
            body: data
          });

          if (!response.ok) {
            throw new Error('Error uploading media');
          }

          const uploadedMedia = await response.json();
          setStore({ media: uploadedMedia.secure_url, loading: false });
          console.log(uploadedMedia);
        } catch (error) {
          console.error('Error uploading media:', error);
          setStore({ loading: false });
        }
      },

      updateUser: async (dataUpdate, userRol, userId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {

          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/manager/" + userRol + "/" + userId;
          const respUpdateUser = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(dataUpdate),
          })

          if (!respUpdateUser.ok) {
            const errorData = await respUpdateUser.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al añadir el curso al carrito"
            )
          }

          const dataUpdateUser = await respUpdateUser.json()
          setStore({ ...store, msg: dataUpdateUser.message })

          await getActions().getUser(userRole);

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deleteUser: async (userId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/manager/user/" + userId;
          const respDelUser = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          })


          if (!respDelUser.ok) {
            const errorData = await respDelUser.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al añadir el curso al carrito"
            );
          }


          const dataDelUser = await respDelUser.json();
          setStore({ ...store, msg: dataDelUser.message });

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      updateCourse: async (dataUpdate, courseId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {

          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/courses/" + courseId;
          const respUpdateCourse = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(dataUpdate),
          })

          if (!respUpdateCourse.ok) {
            const errorData = await respUpdateCourse.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al Update"
            )
          }

          const dataUpdateCourse = await respUpdateCourse.json()
          setStore({ ...store, msg: dataUpdateCourse.message })

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deleteCourse: async (courseId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/courses/" + courseId;
          const respDelCourse = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          })


          if (!respDelCourse.ok) {
            const errorData = await respDelCourse.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al Delete"
            );
          }


          const dataDelCourse = await respDelCourse.json();
          setStore({ ...store, msg: dataDelCourse.message });

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      postModule: async (formData) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/module/course`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(errorData.error || "Error al crear el módulo");
          }

          return await response.json();
        } catch (error) {

          throw error;
        }
      },

      createCategory: async (dataCategory) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        console.log(dataCategory)
        try {
          const url = process.env.BACKEND_URL + "/api/courses/categories";
          const respAddCategory = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataCategory),
          });

          if (!respAddCategory.ok) {
            const errorData = await respAddCategory.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });

            await getActions().getTrolleyToOrder()
            
            throw new Error(
              errorData.error || "Error al añadir la Category"
            );
          }

          const dataAddCategory = await respAddCategory.json();
          setStore({ ...store, msg: dataAddCategory.message});
          console.log(dataAddCategory);

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },
      
      getCategory: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/courses/categories";
          const respGetCategory = await fetch(url);

          if (!respGetCategory.ok) {
            const errorData = await respGetCategory.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error al Obtener la Category");
          }

          const dataGetCategory = await respGetCategory.json();
          setStore({
            ...store,
            msg: dataGetCategory.message,
            category: dataGetCategory.Category,
          });
          console.log(dataGetCategory);
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      // postQuizzes: async (formData) => {
      //   try {
      //     const response = await fetch(`${process.env.BACKEND_URL}/api/module/quizzes`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(formData)
      //     });

      //     if (!response.ok) {
      //       const errorData = await response.json();
      //       console.log("Error de servidor:", errorData);
      //       throw new Error(errorData.error || "Error al crear la Evaluación");
      //     }

      //     return await response.json();
      //   } catch (error) {
      //     console.error("Error en la solicitud:", error);
      //     throw error;
      //   }
      // }





    }
  };
}


export default getState;
